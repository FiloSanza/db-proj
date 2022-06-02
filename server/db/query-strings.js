queries = {
  selectAllTag: `SELECT * FROM TAG`, 
  insertTag: `INSERT INTO TAG (Descrizione) VALUES (?)`,
  selectAllCitta: `SELECT * FROM CITTA`, 
  insertCitta: `INSERT INTO CITTA (Nome) VALUES (?)`,
  selectAllClienti: `SELECT * FROM CLIENTE`,
  insertCliente: `INSERT INTO CLIENTE (Nome, Cognome, Email, DataNascita) VALUES (?, ?, ?, ?)`,
  selectAllGuide: `SELECT * FROM GUIDA`,
  insertGuida: `INSERT INTO GUIDA (Nome, Cognome, Email, DataNascita) VALUES (?, ?, ?, ?)`,
  selectTagViaggio: `
    SELECT TAG.Descrizione 
      FROM VIAGGIO 
      JOIN GIORNATA 
      JOIN VISITA 
      JOIN ATTIVITA 
      JOIN TAG 
    WHERE VIAGGIO.IdViaggio = ?`,
  insertDescrittore: `INSERT INTO DESCRITTORE (IdAttivita, IdTag) VALUES (?, ?)`,
  insertAttivita: `INSERT INTO ATTIVITA (Descrizione, Durata, IdCitta) VALUES (?, ?, ?)`,
  insertViaggio: `
    INSERT INTO VIAGGIO (Descrizione, DataInizio, DataFine)
    VALUES (?, ?, ?)`,
  insertGiornata: `
    INSERT INTO GIORNATA (Numero, IdViaggio, Descrizione)
    VALUES (?, ?, ?)`,
  insertVisita: `
    INSERT INTO VISITA (IdAttivita, Ora, IdGiornata)
    VALUES (?, ?, (SELECT G.IdGiornata 
                    FROM GIORNATA G 
                    WHERE G.IdViaggio = ? AND G.Numero = ?))`,
  selectAllAttivita: `SELECT * FROM ATTIVITA`
};

module.exports = queries;