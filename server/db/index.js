const mysql = require('mysql');
const creds = require('../creds')

var pool = mysql.createPool({
  connectionLimit: 10,
  password: creds.password,
  user: creds.user,
  database: 'agenzia',
  host: 'localhost',
  port: 3306
});

let agenziadb = {};

agenziadb.allTags = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM TAG', (err, results) => {
      return err 
      ? reject(err)
      : resolve(results);
    })
  })
}

agenziadb.insertTag = (desc) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO TAG (Descrizione) VALUES (?)', [desc], (err, results) => {
      return err 
      ? reject(err)
      : resolve({id: results.insertId});
    })
  })
}

agenziadb.allCitta = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM CITTA', (err, results) => {
      return err 
      ? reject(err)
      : resolve(results);
    })
  })
}

agenziadb.insertCitta = (desc) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO CITTA (Nome) VALUES (?)', [desc], (err, results) => {
      return err 
      ? reject(err)
      : resolve({id: results.insertId});
    })
  })
}

agenziadb.allClienti = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM CLIENTE', (err, results) => {
      return err
      ? reject(err)
      : resolve(results);
    })
  })
}

agenziadb.insertCliente = (nome, cognome, email, data_nascita) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO CLIENTE (Nome, Cognome, DataNascita, Email) VALUES (?, ?, ?, ?)', 
    [nome, cognome, data_nascita, email], 
    (err, results) => {
      return err 
      ? reject(err)
      : resolve({id: results.insertId});
    })
  })
}

agenziadb.allGuide = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM GUIDA', (err, results) => {
      return err
      ? reject(err)
      : resolve(results);
    })
  })
}

agenziadb.insertGuida = (nome, cognome, email, data_nascita) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO GUIDA (Nome, Cognome, DataNascita, Email) VALUES (?, ?, ?, ?)', 
    [nome, cognome, data_nascita, email], 
    (err, results) => {
      return err 
      ? reject(err)
      : resolve({id: results.insertId});
    })
  })
}
  
module.exports = agenziadb;