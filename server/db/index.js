const mysql = require('mysql');
const config = require('../config')

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

const genericQuery = (query, resultMap, params = []) => {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (err, results) => {
      return err ? reject(err) : resolve(resultMap(results));
    })
  })
};

agenziadb.allTags = () => genericQuery(
  'SELECT * FROM TAG', 
  identity
);

agenziadb.insertTag = (desc) => genericQuery(
  'INSERT INTO TAG (Descrizione) VALUES (?)',
  getLastInsertedId,
  [desc]
);

agenziadb.allCitta = () => genericQuery(
  'SELECT * FROM CITTA', 
  identity
);

agenziadb.insertCitta = (nome) => genericQuery(
  'INSERT INTO CITTA (Nome) VALUES (?)',
  getLastInsertedId,
  [nome]
);

agenziadb.allClienti = () => genericQuery(
  'SELECT * FROM CLIENTE',
  identity
);

agenziadb.insertCliente = (nome, cognome, email, data_nascita) => genericQuery(
  'INSERT INTO CLIENTE (Nome, Cognome, Email, DataNascita) VALUES (?, ?, ?, ?)',
  getLastInsertedId,
  [nome, cognome, email, data_nascita]
);

agenziadb.allGuide = () => genericQuery(
  'SELECT * FROM GUIDA',
  identity
);

agenziadb.insertGuida = (nome, cognome, email, data_nascita) => genericQuery(
  'INSERT INTO GUIDA (Nome, Cognome, Email, DataNascita)',
  getLastInsertedId,
  [nome, cognome, email, data_nascita]
);
  
module.exports = agenziadb;