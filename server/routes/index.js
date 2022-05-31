const express = require("express");
const db = require('../db')
const { body, checkSchema } = require('express-validator');
const { validator, registrationSchema } = require('../middleware/validation');

const router = express.Router();

async function handleDbQuery(query, req, res) {
  try {
    let results = await query();
    res.json(results);
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
};

router.get(
  '/tag',
  (req, res) => 
    handleDbQuery(() => db.allTags(), req, res)
);

router.post(
  '/tag', 
  validator.validate([
    body('descrizione')
      .exists()
      .withMessage("Descrizione mancante")
      .isLength({ min: 3 })
      .withMessage("La descrizione deve essere di almeno 3 caratteri.")
  ]),
  (req, res) => 
    handleDbQuery(() => db.insertTag(req.body.descrizione), req, res)
);

router.get(
  '/citta', 
  (req, res) => 
    handleDbQuery(() => db.allCitta(), req, res)
);

router.post(
  '/citta', 
  validator.validate([
    body('nome')
      .exists()
      .withMessage("Descrizione mancante")
  ]),
  (req, res) => 
    handleDbQuery(() => db.insertCitta(req.body.nome), req, res)
);

router.get(
  '/clienti',
  (req, res) => 
    handleDbQuery(() => db.allClienti(), req, res)
);

router.post(
  '/clienti',
  validator.validate(checkSchema(registrationSchema)),
  (req, res) => 
    handleDbQuery(() => db.insertCliente(
        req.body.nome,
        req.body.cognome,
        req.body.email,
        req.body.dataNascita),
      req, res)
);

router.get(
  '/guide',
  (req, res) => 
    handleDbQuery(() => db.allGuide(), req, res)
);

router.post(
  '/guide',
  validator.validate(checkSchema(registrationSchema)),
  (req, res) => 
    handleDbQuery(() => db.insertGuida(
        req.body.nome,
        req.body.cognome,
        req.body.email,
        req.body.dataNascita),
      req, res)
);

module.exports = router;