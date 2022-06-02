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
    isAlphanumeric: true
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

let insertAttivitaSchema = {
  descrizione: {
    isString: true,
    isLength: {
      errorMessage: 'Descrizione di almeno 3 caratteri',
      options: {min: 3}
    }
  },
  durata: {
    isNumeric: true
  },
  idCitta: {
    isNumeric: true
  },
  idTags: {
    isArray: true
  }
}

let insertViaggioSchema = {
  viaggio: {
    required: true
  },
  giornate: {
    isArray: true
  },
  visite: {
    isArray: true
  },
  'viaggio.descrizione': {
    isString: true,
    isLength: {
      errorMessage: 'Descrizione di almeno 3 caratteri',
      options: {min: 3}
    }
  },
  'viaggio.dataInizio': {
    isDate: {
      format: 'DD/MM/YYYY',
      strictMode: false
    }
  },
  'viaggio.dataFine': {
    isDate: {
      format: 'DD/MM/YYYY',
      strictMode: false
    }
  },
  'giornate.*.numero': {
    isNumeric: true
  },
  'giornate.*.descrizione': {
    isString: true,
    isLength: {
      errorMessage: 'Descrizione di almeno 3 caratteri',
      options: {min: 3}
    }
  },
  'visite.*.idAttivita': {
    isNumeric: true
  },
  'visite.*.ora': {
    isNumeric: true
  },
  'visite.*.numeroGiornata': {
    isNumeric: true
  }
};

module.exports = {
  validator, 
  registrationSchema,
  insertAttivitaSchema,
  insertViaggioSchema
};