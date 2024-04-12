const Joi = require('joi');

// Joi schema for user creation with custom error messages
const userSchema = Joi.object({
  full_name: Joi.string().required().pattern(/^[A-Za-z\s]+$/)
    .messages({
      'string.empty': 'Full name is required',
      'string.pattern.base': 'Full name must contain only alphabetic characters',
    }),
  first_name: Joi.string().required().pattern(/^[A-Za-z\s]+$/)
    .messages({
      'string.empty': 'First name is required',
      'string.pattern.base': 'First name must contain only alphabetic characters',
    }),
  last_name: Joi.string().required().pattern(/^[A-Za-z\s]+$/)
    .messages({
      'string.empty': 'Last name is required',
      'string.pattern.base': 'Last name must contain only alphabetic characters',
    }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email address',
    'any.required': 'Email is required',
  }),
  date_of_birth: Joi.date().required().messages({
    'date.base': 'Date of birth must be a valid date',
    'any.required': 'Date of birth is required',
  }),
  phone_number: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'string.pattern.base': 'Phone number must be a ten-digit number',
    'any.required': 'Phone number is required',
  }),
  pan_number: Joi.string().alphanum().length(10).messages({
    'string.alphanum': 'PAN number must be alphanumeric',
    'string.length': 'PAN number must be exactly 10 characters long',
  }),
  adhaar_number: Joi.string().pattern(/^[0-9]{12}$/).required().messages({
    'string.pattern.base': 'Aadhaar number must be a twelve-digit number',
    'any.required': 'Aadhaar number is required',
  }),
  address: Joi.string(),
  name_on_pan: Joi.string().pattern(/^[A-Za-z\s]+$/).messages({
    'string.pattern.base': 'Name on PAN must contain only alphabetic characters',
  }),
  name_on_adhaar: Joi.string().pattern(/^[A-Za-z\s]+$/).messages({
    'string.pattern.base': 'Name on Aadhaar must contain only alphabetic characters',
  }),
});

// Validation middleware
const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false }); // Include all validation errors
  if (error) {
    // Extract error details for each attribute and map them to custom error messages
    const errorMessage = error.details.reduce((acc, curr) => {
      acc[curr.context.key] = curr.message.replace(/"/g, ''); // Remove quotes from error messages
      return acc;
    }, {});
    return res.status(400).json({ message: errorMessage });
  }
  next();
};

module.exports = { validateUser };
