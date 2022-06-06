import { ValidationChain, validationResult } from "express-validator";

export const validator = (validations: ValidationChain[]) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(v => v.run(req)));
    
    const errors = validationResult(req);
    
    if (errors.isEmpty) {
      return next();
    }
    
    res.status(400).json({
      errors: errors.array()
    })
  }
}