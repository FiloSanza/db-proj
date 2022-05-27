const express = require("express");
const db = require('../db')
const { body, checkSchema, check } = require('express-validator');
const { validator, registrationSchema } = require('../middleware/validation');

const router = express.Router();

router.get(
  '/tag', 
  async (req, res) => {
    try {
      let results = await db.allTags();
      res.json(results);
    } catch(e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
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
  async (req, res) => {
    try {
      if (req.body.descrizione) {
        let results = await db.insertTag(req.body.descrizione);
        res.json(results);
      } else {
        
      }
    } catch(e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
);

router.get(
  '/citta', 
  async (req, res) => {
    try {
      let results = await db.allCitta();
      res.json(results);
    } catch(e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
);

router.post(
  '/citta', 
  validator.validate([
    body('nome')
      .exists()
      .withMessage("Descrizione mancante")
  ]),
  async (req, res) => {
    try {
      if (req.body.nome) {
        let results = await db.insertCitta(req.body.nome);
        res.json(results);
      }
    } catch(e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
);

router.get(
  '/clienti',
  async (req, res) => {
    try {
      let results = await db.allClienti();
      res.json(results);
    } catch(e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
);

router.post(
  '/clienti',
  validator.validate(checkSchema(registrationSchema)),
  async (req, res) => {
    try {
      if (req.body.nome) {
        let results = await db.insertCliente(
          req.body.nome,
          req.body.cognome,
          req.body.email,
          req.body.dataNascita);
        res.json(results);
      }
    } catch(e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
);

router.get(
  '/guide',
  async (req, res) => {
    try {
      let results = await db.allGuide();
      res.json(results);
    } catch(e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
);

router.post(
  '/guide',
  validator.validate(checkSchema(registrationSchema)),
  async (req, res) => {
    try {
      if (req.body.nome) {
        let results = await db.insertGuida(
          req.body.nome,
          req.body.cognome,
          req.body.email,
          req.body.dataNascita);
        res.json(results);
      }
    } catch(e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
);

module.exports = router;