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
        SELECT tag.descrizione 
        FROM viaggio 
            JOIN giornata 
            JOIN visita 
            JOIN attivita 
            JOIN tag 
        WHERE viaggio.idViaggio = ?`
};


module.exports = queries;