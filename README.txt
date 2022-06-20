-- ENVIRONMENT E DIPENDENZE

Per l'esecuzione dell'applicazione è necessario installare node.js: https://nodejs.org/en/
Il DBMS usato per l'applicazione è mysql.

Dopo aver installato node è necessario scaricare le dipendenze eseguendo il comando: "npm install"
Sia nella cartella frontend che backend.

Sarà poi necessario configurare la connessione al database creando un file "backend/.env" in modo simile al seguente:

    DATABASE_URL="mysql://[utente_db]:[password]@[ip]:[porta]/[db]?connection_limit=10"

    sostituendo i dati tra parentesi quadre in modo coerente.

Come ultimo passo preliminare bisogna generare le classi dell'ORM usando il comando "npx prisma generate".

PS: si consiglia di usare gli script di creazione del DB in modo da avere già dei dati per fare prove, nel caso
non si voglia usare il file seed.sql, si consiglia di aggiungere una guida a mano altrimenti non si avranno utenti
da usare per accedere all'applicativo. 
    Per l'aggiunta di una guida: INSERT INTO GUIDA (Nome, Cognome, DataNascita, Email) VALUES (?, ?, ?, ?);

-- UTILIZZO

Inizialmente è necessario fare login prima di visualizzare o aggiungere i dati.
In caso di credenziali corrette verrà mostrato un messaggio simile a "Hai fatto l'accesso come guida: mario@rossi.it".

Ogni pagina permetterà di visualizzare e/o aggiungere istanze relative alla pagina selezionata. A seconda del tipo di 
utente potrebbe non essere disponibili tutte le funzionalità (es: Cliente non può aggiungere viaggi, e Guida non può 
creare recensioni).
Nel caso invece si usi seed.sql, si consiglia di fare login come guida per poter visualizzare tutte le operazioni possibili,
nel caso una mail che si può usare è: mario.rossi@libero.it

In caso di operazioni di aggiunta eseguite con successo si potrà vedere la nuova istanza nella tabella di visualizzazione.

Per l'uso di funzionalità avanzate (es: dettaglio clienti) vedere le note alla base delle tabelle (es: cliccare un una riga
per vederne i dettagli).