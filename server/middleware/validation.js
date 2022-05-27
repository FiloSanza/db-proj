const { body, validationResult } = require('express-validator');

let validator = {};

validator.validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
      return next();
    }
    
    res.status(400).json({
      errors: errors.array()
    });
  }
}

let registrationSchema = {
  nome: {
    isAlpha: true
  },
  cognome: {
    isAlpha: true
  },
  dataNascita: {
    isDate: {
      format: 'DD/MM/YYYY',
      strictMode: false
    }
  },
  email: {
    isEmail: {
      bail: true
    }
  }
}

module.exports = {validator, registrationSchema};