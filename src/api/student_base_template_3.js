const express = require('express');

const monk = require('monk');

const db = monk(process.env.MONGO_URI);

const student_db = db.get('student');

const Joi = require('@hapi/joi');

const student_schema = Joi.object({
  // First Name - Mandatory - Min - 3 Characters, Max 30 Characters
  first_name: Joi.string().trim().min(3).max(30)
    .required(),

  // Last Name may be optional
  last_name: Joi.string().optional(),

  // Value within List of Values
  gender: Joi.string().required().valid('male', 'female'),

  // Mobile must be a number
  mobile: Joi.number().required().min(100000000),

  // Mandatory Email is Entered
  email: Joi.string().trim().required(),

  // Email Format Check
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).trim().required(),

  // DOB is Mandatory
  // dob: Joi.string().trim().required(),

  // birthday must be a valid ISO-8601 ('YYYY-MM-DD') date and dates before Jan 1, 2010 are not allowed
  dob: Joi.date().max('2010-01-01').iso().required(),

  address: Joi.object().required(),

  // Address - Nested Object Validation
  address: Joi.object()
    .keys({
      building: Joi.string(),
      street: Joi.required(),
      pin: Joi.number().required()
    })

});

const router = express.Router();

// Read All
router.get('/', async (req, res, next) => {
  try {
    const items = await student_db.find({});
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// Read One
router.get('/:id', (req, res, next) => {
  res.json({
    message: 'Hello READ One',
  });
});

// Create One
router.post('/', async (req, res, next) => {
  try {
    const value = await student_schema.validateAsync(req.body);
    // const inserted = await student_db.insert(req.body);

    res.json({
      message: 'Record Created',
    });
  } catch (error) {
    next(error);
  }
});

// Update One
router.put('/:id', (req, res, next) => {
  res.json({
    message: 'Hello Update One',
  });
});

// Delete One
router.delete('/:id', (req, res, next) => {
  res.json({
    message: 'Hello Delete One',
  });
});

module.exports = router;
