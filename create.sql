DROP DATABASE IF EXISTS agenzia;
CREATE DATABASE agenzia;
USE agenzia;

-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: agenzia
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AGGIUNTA`
--

DROP TABLE IF EXISTS `AGGIUNTA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AGGIUNTA` (
	`IdAggiunta` int NOT NULL AUTO_INCREMENT,
	`Descrizione` varchar(500) NOT NULL,
	`Prezzo` decimal(10,2) NOT NULL,
	`AggiuntaVisita` tinyint(1) NOT NULL DEFAULT (true),
	PRIMARY KEY (`IdAggiunta`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `AGGIUNTA_PRENOTAZIONE`
--

DROP TABLE IF EXISTS `AGGIUNTA_PRENOTAZIONE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AGGIUNTA_PRENOTAZIONE` (
	`IdAggiunta` int NOT NULL,
	`IdPrenotazione` int NOT NULL,
	PRIMARY KEY (`IdPrenotazione`,`IdAggiunta`),
	KEY `FKagg_AGG` (`IdAggiunta`),
	CONSTRAINT `FKagg_AGG` FOREIGN KEY (`IdAggiunta`) REFERENCES `AGGIUNTA` (`IdAggiunta`),
	CONSTRAINT `FKagg_PRE` FOREIGN KEY (`IdPrenotazione`) REFERENCES `PRENOTAZIONE` (`IdPrenotazione`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `AGGIUNTE_POSSIBILI_VIAGGIO`
--

DROP TABLE IF EXISTS `AGGIUNTE_POSSIBILI_VIAGGIO`;
/*!50001 DROP VIEW IF EXISTS `AGGIUNTE_POSSIBILI_VIAGGIO`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `AGGIUNTE_POSSIBILI_VIAGGIO` AS SELECT 
	1 AS `IdViaggio`,
	1 AS `IdAggiunta`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `ATTIVITA`
--

DROP TABLE IF EXISTS `ATTIVITA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ATTIVITA` (
	`IdAttivita` int NOT NULL AUTO_INCREMENT,
	`Descrizione` varchar(500) NOT NULL,
	`Durata` int NOT NULL,
	`IdCitta` int NOT NULL,
	PRIMARY KEY (`IdAttivita`),
	KEY `FKlocazione` (`IdCitta`),
	CONSTRAINT `FKlocazione` FOREIGN KEY (`IdCitta`) REFERENCES `CITTA` (`IdCitta`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CITTA`
--

DROP TABLE IF EXISTS `CITTA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CITTA` (
	`IdCitta` int NOT NULL AUTO_INCREMENT,
	`Nome` varchar(500) NOT NULL,
	PRIMARY KEY (`IdCitta`),
	UNIQUE KEY `IDCITTA_1` (`Nome`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CLIENTE`
--

DROP TABLE IF EXISTS `CLIENTE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CLIENTE` (
	`IdCliente` int NOT NULL AUTO_INCREMENT,
	`Nome` varchar(100) NOT NULL,
	`Cognome` varchar(100) NOT NULL,
	`DataNascita` date NOT NULL,
	`Email` varchar(50) NOT NULL,
	PRIMARY KEY (`IdCliente`),
	UNIQUE KEY `EMAIL_CLIENTE` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DATA_VIAGGIO`
--

DROP TABLE IF EXISTS `DATA_VIAGGIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DATA_VIAGGIO` (
	`IdDataViaggio` int NOT NULL AUTO_INCREMENT,
	`DataPartenza` date NOT NULL,
	`PrezzoBase` decimal(10,2) NOT NULL,
	`IdViaggio` int NOT NULL,
	`Posti` int NOT NULL,
	`IdGuida` int NOT NULL,
	`IdSconto` int DEFAULT NULL,
	PRIMARY KEY (`IdDataViaggio`),
	UNIQUE KEY `IDDATA_VIAGGIO_1` (`IdViaggio`,`DataPartenza`),
	KEY `FKaccompagnatore` (`IdGuida`),
	KEY `FKsconto_applicato` (`IdSconto`),
	KEY `idxDataPartenza` (`DataPartenza`),
	CONSTRAINT `FKaccompagnatore` FOREIGN KEY (`IdGuida`) REFERENCES `GUIDA` (`IdGuida`),
	CONSTRAINT `FKpartenza` FOREIGN KEY (`IdViaggio`) REFERENCES `VIAGGIO` (`IdViaggio`),
	CONSTRAINT `FKsconto_applicato` FOREIGN KEY (`IdSconto`) REFERENCES `SCONTO` (`IdSconto`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DESCRITTORE`
--

DROP TABLE IF EXISTS `DESCRITTORE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DESCRITTORE` (
	`IdAttivita` int NOT NULL,
	`IdTag` int NOT NULL,
	PRIMARY KEY (`IdAttivita`,`IdTag`),
	KEY `FKdes_TAG` (`IdTag`),
	CONSTRAINT `FKdes_ATT` FOREIGN KEY (`IdAttivita`) REFERENCES `ATTIVITA` (`IdAttivita`),
	CONSTRAINT `FKdes_TAG` FOREIGN KEY (`IdTag`) REFERENCES `TAG` (`IdTag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `DETTAGLIO_VIAGGIO`
--

DROP TABLE IF EXISTS `DETTAGLIO_VIAGGIO`;
/*!50001 DROP VIEW IF EXISTS `DETTAGLIO_VIAGGIO`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `DETTAGLIO_VIAGGIO` AS SELECT 
	1 AS `IdViaggio`,
	1 AS `DescrizioneViaggio`,
	1 AS `NumeroGiornata`,
	1 AS `OraVisita`,
	1 AS `DurataAttivita`,
	1 AS `DescrizioneAttivita`,
	1 AS `CittaAttivita`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `GIORNATA`
--

DROP TABLE IF EXISTS `GIORNATA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GIORNATA` (
	`IdGiornata` int NOT NULL AUTO_INCREMENT,
	`Numero` int NOT NULL,
	`IdViaggio` int NOT NULL,
	`Descrizione` varchar(500) NOT NULL,
	PRIMARY KEY (`IdGiornata`),
	UNIQUE KEY `IDGIORNATA_1` (`IdViaggio`,`Numero`),
	CONSTRAINT `FKstruttura` FOREIGN KEY (`IdViaggio`) REFERENCES `VIAGGIO` (`IdViaggio`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `GUIDA`
--

DROP TABLE IF EXISTS `GUIDA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GUIDA` (
	`IdGuida` int NOT NULL AUTO_INCREMENT,
	`Nome` varchar(100) NOT NULL,
	`Cognome` varchar(100) NOT NULL,
	`DataNascita` date NOT NULL,
	`Email` varchar(50) NOT NULL,
	PRIMARY KEY (`IdGuida`),
	UNIQUE KEY `EMAIL_GUIDA` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PERIODO`
--

DROP TABLE IF EXISTS `PERIODO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PERIODO` (
	`IdPeriodo` int NOT NULL AUTO_INCREMENT,
	`GiornoInizio` int NOT NULL,
	`MeseInizio` int NOT NULL,
	`GiornoFine` int NOT NULL,
	`MeseFine` int NOT NULL,
	PRIMARY KEY (`IdPeriodo`),
	UNIQUE KEY `UNIQUE_PERIODO` (`GiornoInizio`,`MeseInizio`,`GiornoFine`,`MeseFine`),
	CONSTRAINT `CHECK_GIORNOFINE` CHECK (((`GiornoFine` >= 1) and (`GiornoFine` <= 31))),
	CONSTRAINT `CHECK_GIORNOINIZIO` CHECK (((`GiornoInizio` >= 1) and (`GiornoInizio` <= 31))),
	CONSTRAINT `CHECK_MESEFINE` CHECK (((`MeseFine` >= 1) and (`MeseFine` <= 12))),
	CONSTRAINT `CHECK_MESEINIZIO` CHECK (((`MeseInizio` >= 1) and (`MeseInizio` <= 12)))
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PRENOTAZIONE`
--

DROP TABLE IF EXISTS `PRENOTAZIONE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PRENOTAZIONE` (
	`IdPrenotazione` int NOT NULL AUTO_INCREMENT,
	`IdCliente` int NOT NULL,
	`IdDataViaggio` int NOT NULL,
	`DataAcquisto` date NOT NULL,
	`PrezzoTotale` decimal(10,2) NOT NULL,
	PRIMARY KEY (`IdPrenotazione`),
	UNIQUE KEY `clienteDataViaggio` (`IdCliente`,`IdDataViaggio`),
	KEY `IdDataViaggio` (`IdDataViaggio`),
	CONSTRAINT `FKprenotazione_cliente` FOREIGN KEY (`IdCliente`) REFERENCES `CLIENTE` (`IdCliente`),
	CONSTRAINT `PRENOTAZIONE_ibfk_1` FOREIGN KEY (`IdDataViaggio`) REFERENCES `DATA_VIAGGIO` (`IdDataViaggio`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RECENSIONE`
--

DROP TABLE IF EXISTS `RECENSIONE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RECENSIONE` (
	`IdRecensione` int NOT NULL AUTO_INCREMENT,
	`IdPrenotazione` int NOT NULL,
	`Valutazione` int NOT NULL,
	`Descrizione` varchar(500) DEFAULT NULL,
	`DataPubblicazione` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`IdRecensione`),
	UNIQUE KEY `FKdescrive_ID` (`IdPrenotazione`),
	CONSTRAINT `FKdescrive_FK` FOREIGN KEY (`IdPrenotazione`) REFERENCES `PRENOTAZIONE` (`IdPrenotazione`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SCONTO`
--

DROP TABLE IF EXISTS `SCONTO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SCONTO` (
	`IdSconto` int NOT NULL AUTO_INCREMENT,
	`Percentuale` float NOT NULL,
	PRIMARY KEY (`IdSconto`),
	UNIQUE KEY `IDSCONTO_1` (`Percentuale`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TAG`
--

DROP TABLE IF EXISTS `TAG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TAG` (
	`IdTag` int NOT NULL AUTO_INCREMENT,
	`Descrizione` varchar(500) NOT NULL,
	PRIMARY KEY (`IdTag`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `UPGRADE_VIAGGIO`
--

DROP TABLE IF EXISTS `UPGRADE_VIAGGIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UPGRADE_VIAGGIO` (
	`IdAggiunta` int NOT NULL,
	`IdViaggio` int NOT NULL,
	PRIMARY KEY (`IdAggiunta`,`IdViaggio`),
	KEY `FKupg_VIA` (`IdViaggio`),
	CONSTRAINT `FKupg_AGG_VIAGGIO` FOREIGN KEY (`IdAggiunta`) REFERENCES `AGGIUNTA` (`IdAggiunta`),
	CONSTRAINT `FKupg_VIA` FOREIGN KEY (`IdViaggio`) REFERENCES `VIAGGIO` (`IdViaggio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `UPGRADE_VISITA`
--

DROP TABLE IF EXISTS `UPGRADE_VISITA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UPGRADE_VISITA` (
	`IdAggiunta` int NOT NULL,
	`IdVisita` int NOT NULL,
	PRIMARY KEY (`IdAggiunta`,`IdVisita`),
	KEY `FKupg_VIS` (`IdVisita`),
	CONSTRAINT `FKupg_AGG_VISITA` FOREIGN KEY (`IdAggiunta`) REFERENCES `AGGIUNTA` (`IdAggiunta`),
	CONSTRAINT `FKupg_VIS` FOREIGN KEY (`IdVisita`) REFERENCES `VISITA` (`IdVisita`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `VIAGGIO`
--

DROP TABLE IF EXISTS `VIAGGIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VIAGGIO` (
	`IdViaggio` int NOT NULL AUTO_INCREMENT,
	`Descrizione` varchar(500) NOT NULL,
	`IdPeriodo` int NOT NULL DEFAULT '0',
	PRIMARY KEY (`IdViaggio`),
	KEY `FK_ViaggioPeriodoID` (`IdPeriodo`),
	CONSTRAINT `FK_ViaggioPeriodoID` FOREIGN KEY (`IdPeriodo`) REFERENCES `PERIODO` (`IdPeriodo`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `VISITA`
--

DROP TABLE IF EXISTS `VISITA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VISITA` (
	`IdVisita` int NOT NULL AUTO_INCREMENT,
	`IdAttivita` int NOT NULL,
	`Ora` int NOT NULL,
	`IdGiornata` int NOT NULL,
	PRIMARY KEY (`IdVisita`),
	KEY `FKR` (`IdGiornata`),
	KEY `VISITA_FK` (`IdAttivita`),
	CONSTRAINT `FKR` FOREIGN KEY (`IdGiornata`) REFERENCES `GIORNATA` (`IdGiornata`),
	CONSTRAINT `VISITA_FK` FOREIGN KEY (`IdAttivita`) REFERENCES `ATTIVITA` (`IdAttivita`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Final view structure for view `AGGIUNTE_POSSIBILI_VIAGGIO`
--

/*!50001 DROP VIEW IF EXISTS `AGGIUNTE_POSSIBILI_VIAGGIO`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `AGGIUNTE_POSSIBILI_VIAGGIO` AS select `v`.`IdViaggio` AS `IdViaggio`,`uv`.`IdAggiunta` AS `IdAggiunta` from (((`VIAGGIO` `v` join `GIORNATA` `g` on((`v`.`IdViaggio` = `g`.`IdViaggio`))) join `VISITA` `vis` on((`vis`.`IdGiornata` = `g`.`IdGiornata`))) join `UPGRADE_VISITA` `uv` on((`uv`.`IdVisita` = `vis`.`IdVisita`))) group by `v`.`IdViaggio`,`uv`.`IdAggiunta` union select `v`.`IdViaggio` AS `IdViaggio`,`uv`.`IdAggiunta` AS `IdAggiunta` from (`VIAGGIO` `v` join `UPGRADE_VIAGGIO` `uv` on((`v`.`IdViaggio` = `uv`.`IdViaggio`))) group by `v`.`IdViaggio`,`uv`.`IdAggiunta` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `DETTAGLIO_VIAGGIO`
--

/*!50001 DROP VIEW IF EXISTS `DETTAGLIO_VIAGGIO`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `DETTAGLIO_VIAGGIO` AS select `v`.`IdViaggio` AS `IdViaggio`,`v`.`Descrizione` AS `DescrizioneViaggio`,`g`.`Numero` AS `NumeroGiornata`,`vis`.`Ora` AS `OraVisita`,`a`.`Durata` AS `DurataAttivita`,`a`.`Descrizione` AS `DescrizioneAttivita`,`c`.`Nome` AS `CittaAttivita` from ((((`VIAGGIO` `v` join `GIORNATA` `g` on((`v`.`IdViaggio` = `g`.`IdViaggio`))) join `VISITA` `vis` on((`vis`.`IdGiornata` = `g`.`IdGiornata`))) join `ATTIVITA` `a` on((`a`.`IdAttivita` = `vis`.`IdAttivita`))) join `CITTA` `c` on((`a`.`IdCitta` = `c`.`IdCitta`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-20 12:29:37


DELIMITER $$

DROP FUNCTION IF EXISTS calcola_prezzo_aggiunte_visite$$

CREATE FUNCTION calcola_prezzo_aggiunte_visite(idPrenotazione INT)
RETURNS DECIMAL(10, 2) 
DETERMINISTIC
BEGIN
	DECLARE prezzo DECIMAL(10, 2);

	SELECT (SUM(a.Prezzo)) INTO prezzo
	FROM PRENOTAZIONE p 
		JOIN AGGIUNTA_PRENOTAZIONE ap ON p.IdPrenotazione = ap.IdPrenotazione 
		JOIN AGGIUNTA a ON a.IdAggiunta = ap.IdAggiunta 
		JOIN DATA_VIAGGIO dv ON dv.IdDataViaggio = p.IdDataViaggio 
		JOIN VIAGGIO via ON via.IdViaggio = dv.IdViaggio 
		JOIN GIORNATA g ON g.IdViaggio = via.IdViaggio 
		JOIN VISITA v ON v.IdGiornata = g.IdGiornata 
		JOIN UPGRADE_VISITA uv ON uv.IdVisita = v.IdVisita AND ap.IdAggiunta = uv.IdAggiunta
		WHERE p.IdPrenotazione = idPrenotazione;
	RETURN (prezzo);
END$$

DROP FUNCTION IF EXISTS calcola_prezzo_nuova_prenotazione$$

CREATE FUNCTION calcola_prezzo_nuova_prenotazione(idPrenotazione INT)
RETURNS DECIMAL(10, 2) 
DETERMINISTIC
BEGIN
	DECLARE prezzo DECIMAL(10, 2);
	DECLARE sconto DECIMAL(10, 2);

	SELECT dv.PrezzoBase INTO prezzo
	FROM PRENOTAZIONE p
	JOIN DATA_VIAGGIO dv ON p.IdDataViaggio = dv.IdDataViaggio
	WHERE p.IdPrenotazione = idPrenotazione;

	SELECT CAST((IFNULL(s.Percentuale, 0) / 100) AS DECIMAL(10, 2)) INTO sconto
	FROM PRENOTAZIONE p 
		JOIN DATA_VIAGGIO dv ON p.IdDataViaggio = dv.IdDataViaggio 
	LEFT JOIN SCONTO s ON dv.IdSconto = s.IdSconto
	WHERE p.IdPrenotazione = idPrenotazione;

	SET prezzo = prezzo * (1 - sconto);

	SELECT (calcola_prezzo_aggiunte_visite(idPrenotazione) + prezzo) INTO prezzo;

	SELECT (SUM(a.Prezzo) + prezzo) INTO prezzo
	FROM PRENOTAZIONE p 
		JOIN AGGIUNTA_PRENOTAZIONE ap ON p.IdPrenotazione = ap.IdPrenotazione 
		JOIN AGGIUNTA a ON a.IdAggiunta = ap.IdAggiunta
	WHERE NOT a.AggiuntaVisita;

	RETURN (prezzo);
END$$

DROP FUNCTION IF EXISTS calcola_prezzo_aggiunte$$

CREATE FUNCTION calcola_prezzo_aggiunte(idPrenotazione INT)
RETURNS DECIMAL(10, 2) 
DETERMINISTIC
BEGIN
	DECLARE prezzo DECIMAL(10, 2);
	DECLARE prezzo_base DECIMAL(10, 2);
	DECLARE sconto DECIMAL(10, 2);

	SELECT p.PrezzoTotale INTO prezzo
	FROM PRENOTAZIONE p 
	WHERE p.IdPrenotazione = idPrenotazione;
	
	SELECT dv.PrezzoBase, IFNULL(s.Percentuale, 0) INTO prezzo_base, sconto
	FROM PRENOTAZIONE p 
		JOIN DATA_VIAGGIO dv ON p.IdDataViaggio = dv.IdDataViaggio
		LEFT JOIN SCONTO s ON s.IdSconto = dv.IdSconto 
	WHERE p.IdPrenotazione = idPrenotazione;
	return (prezzo - (1 - sconto/100) * prezzo_base);
END$$

DELIMITER ;
