const express = require('express');

const monk = require('monk');

const db = monk(process.env.MONGO_URI);

const student_db = db.get('student');

const Joi = require('@hapi/joi');

const student_schema = Joi.object({

  first_name: Joi.string().trim().required(),

  last_name: Joi.string().optional(),

  gender: Joi.string().required().valid('male', 'female'),

  mobile: Joi.number().required().min(100000000),

  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).trim().required(),

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

    first_name = req.body.first_name;
    last_name = req.body.last_name;
    const nameCheck = await student_db.find({ first_name } && { last_name });
    if (nameCheck.length > 0) {
      console.log(`Duplicate found${nameCheck}`);
      throw new Error('Duplicate name found');
    }
    console.log('Duplicate NOT found');

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
