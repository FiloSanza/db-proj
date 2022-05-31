const mysql = require('mysql');
const creds = require('../creds')
const queryStr = require('./query-strings')

var pool = mysql.createPool({
  connectionLimit: 10,
  password: creds.password,
  user: creds.user,
  database: 'agenzia',
  host: 'localhost',
  port: 3306
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

module.exports = agenziadb;