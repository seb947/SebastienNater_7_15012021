var passwordValidator = require('password-validator');

module.exports = (req, res, next) => {
    try {
        var schema = new passwordValidator();

        schema
        .is().min(8)                                    // Minimum length 8
        .is().max(50)                                   // Maximum length 50
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(1)                                // Must have at least 1 digits

        result = schema.validate(req.body.password)
        //console.log(result);                            //frontend dont show if the password validation succeeded
      if (result == false) {
        throw 'Le mot de passe ne correspond pas aux criteres';
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
  };