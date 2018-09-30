const Joi = require('joi');

const passwordValidation = Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/);
const emailValidation = Joi.string().email({ minDomainAtoms: 2 })

module.exports = {

  // POST /api/auth/sign_in
  sign_in: {
    body: {
      email: emailValidation.required(),
      password: passwordValidation.required()
    }
  },

  // POST /api/auth/register
  register: {
    body: {
      email: emailValidation.required(),
      password: passwordValidation.required(),
      fullName: Joi.string().required()
    }
  },

  // POST /api/auth/forgot_password
  forgot_password: {
    body: {
      email: emailValidation.required()
    }
  },

  // POST /api/auth/reset_password
  reset_password: {
    body: {
      token: Joi.string().token().required(),
      newPassword: passwordValidation.required(),
      verifyPassword: passwordValidation.required()
    }
  },

};
