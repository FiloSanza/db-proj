const mysql = require('mysql');
const queryStr = require('./query-strings');
const config = require('../config');

var pool = mysql.createPool({
  connectionLimit: 10,
  database: 'agenzia',
  host: 'localhost',
  ...config
});

let agenziadb = {};

const identity = (results) => results;
const getLastInsertedId = (results) => { 
  return {id: results.insertId} 
};

const genericQueryWithConnection = (conn, query, resultMap, params = []) => {
  return new Promise((resolve, reject) => {
    conn.query(query, params, (err, results) => {
      return err ? reject(new Error(err)) : resolve(resultMap(results));
    })
  })
};

const genericQuery = (query, resultMap, params = []) => {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (err, results) => {
      return err ? reject(new Error(err)) : resolve(resultMap(results));
    })
  })
};

const getConnectionFromPool = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      return err ? reject(new Error(err)) : resolve(connection);
    })
  })
};

const beginTransaction = (conn) => {
  return new Promise((resolve, reject) => {
    conn.beginTransaction((err) => {
      if (err) {
        conn.rollback(() => conn.release());
        return reject(new Error(err));
      } else {
        return resolve();
      }
    });
  })
};

agenziadb.allTags = () => genericQuery(
  queryStr.selectAllTag,
  identity
);

agenziadb.insertTag = (desc) => genericQuery(
  queryStr.insertTag,
  getLastInsertedId,
  [desc]
);

agenziadb.allCitta = () => genericQuery(
  queryStr.selectAllCitta, 
  identity
);

agenziadb.insertCitta = (nome) => genericQuery(
  queryStr.insertCitta,
  getLastInsertedId,
  [nome]
);

agenziadb.allClienti = () => genericQuery(
  queryStr.selectAllClienti,
  identity
);

agenziadb.insertCliente = (nome, cognome, email, data_nascita) => genericQuery(
  queryStr.insertCliente,
  getLastInsertedId,
  [nome, cognome, email, data_nascita]
);

agenziadb.allGuide = () => genericQuery(
  queryStr.selectAllGuide,
  identity
);

agenziadb.insertGuida = (nome, cognome, email, data_nascita) => genericQuery(
  queryStr.insertGuide,
  getLastInsertedId,
  [nome, cognome, email, data_nascita]
);
  
agenziadb.tagViaggio = (idViaggio) => genericQuery(
  queryStr.selectTagViaggio,
  identity,
  [idViaggio]
);

agenziadb.allAttivita = () => genericQuery(
  queryStr.selectAllAttivita,
  identity
);

agenziadb.insertAttivita = (descrizione, durata, idCitta, idTags) => {
  return new Promise(async (resolve, reject) => {
    let conn = await getConnectionFromPool();
    await beginTransaction(conn);
    try {
      let idAttivita = (await genericQueryWithConnection(
        conn, 
        queryStr.insertAttivita, 
        getLastInsertedId, 
        [descrizione, durata, idCitta]
      )).id;
  
      let dbCittaIds = (await agenziadb.allCitta()).map(citta => citta.IdCitta);
      if (!dbCittaIds.includes(idCitta)) {
        conn.rollback(() => {
          conn.release();
          reject(new Error("Invalid cittaId"));
        });
        return;
      }
  
      let dbTagIds = (await agenziadb.allTags()).map(tag => tag.IdTag);
      const isValid = idTags.every(id => {
        return dbTagIds.includes(id);
      });
      
      if (!isValid) {
        conn.rollback(() => {
          conn.release();
          reject(new Error("Invalid tagIds"));
        });
        return;
      }
  
      await Promise.all(idTags.map(id => genericQueryWithConnection(
        conn,
        queryStr.insertDescrittore,
        getLastInsertedId,
        [idAttivita, id]))
      );
  
      conn.commit((err) => {
        if (err) {
          conn.rollback(() => conn.release());
          reject(new Error("Error on commit."));
        } else {
          conn.release();
          resolve(idAttivita);
        }
      });
    }
    catch(e) {
      conn.rollback(() => {
        conn.release();
        reject(e);
      });
    }
  })
}

agenziadb.insertViaggio = (viaggio, giornate, visite) => {
  return new Promise(async (resolve, reject) => {
    let conn = await getConnectionFromPool();
    await beginTransaction(conn);
    try {
      //1) Inserisci il viaggio
      let idViaggio = (await genericQueryWithConnection(
        conn, 
        queryStr.insertViaggio, 
        getLastInsertedId,
        [viaggio.descrizione, viaggio.dataInizio, viaggio.dataFine]
      )).id;

      //2) Inserisci le giornate
      await Promise.all(giornate.map(giornata => genericQueryWithConnection(
        conn, 
        queryStr.insertGiornata,
        getLastInsertedId,
        [giornata.numero, idViaggio, giornata.descrizione]
      )));
      
      //3) Inserisci le visite
      let dbAttivita = (await agenziadb.allAttivita())
        .map(attivita => attivita.IdAttivita);
      const isValid = visite.every(visita => {
        return dbAttivita.includes(visita.idAttivita);
      });

      if (!isValid) {
        conn.rollback(() => {
          conn.release();
          reject(new Error("Invalid attivitaIds"));
        });
        return;
      }

      await Promise.all(visite.map(visita => genericQueryWithConnection(
        conn, 
        queryStr.insertVisita,
        getLastInsertedId,
        [visita.idAttivita, visita.ora, idViaggio, visita.numeroGiornata]
      )));

      conn.commit((err) => {
        if (err) {
          conn.rollback(() => conn.release());
          reject(new Error("Error on commit."));
        } else {
          conn.release();
          resolve(idViaggio);
        }
      });
    } catch (e) {
      conn.rollback(() => {
        conn.release();
        reject(e);
      });
    }
  })
}

module.exports = agenziadb;