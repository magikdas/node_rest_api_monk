const express = require('express');

const monk = require('monk');

const db = monk(process.env.MONGO_URI);

const student_db = db.get(process.env.COLLECTION);

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

// Read Search
router.get('/search', async (req, res, next) => {
  try {
    const key_name = req.body.key_name.toString();
    let key_value = req.body.key_value.toString();
    const { key_type } = req.body;

    switch (key_type) {
      case 1: // Name contains
        var queryCheck = await student_db.find({ [key_name]: { $regex: key_value } });
        break;
      case 2: // Starts with
        key_value = `^${key_value}`;
        var queryCheck = await student_db.find({ [key_name]: { $regex: key_value } });
        break;
      case 3: // Ends with
        key_value += '$';
        var queryCheck = await student_db.find({ [key_name]: { $regex: key_value } });
        break;
      case 4: // Text Contains specific list ( "key_value":"male" )
        var queryCheck = await student_db.find({ [key_name]: { $in: [key_value] } });
        break;
      case 5: // Greater than or equal to - field must be a number
        var queryCheck = await student_db.find({ [key_name]: { $gte: Number(key_value) } });
        break;
      case 6: // Less than or equal to - field must be a number
        var queryCheck = await student_db.find({ [key_name]: { $lte: Number(key_value) } });
        break;
      case 7: // Equal To - field must be a number
        var queryCheck = await student_db.find({ [key_name]: { $eq: Number(key_value) } });
        break;
      case 8: // Less Than - field must be a ISO Date
        var queryCheck = await student_db.find({ [key_name]: { $lte: new Date(key_value) } });
        break;
      case 9: // Less Than - field must be a ISO Date - ("key_value":"2013-12-12T16:00:00.000Z",)
        var queryCheck = await student_db.find({ [key_name]: { $gte: new Date(key_value) } });
        break;
      default:
        console.log('Unkown type');
    }

    // If item not found, throw error
    if (!queryCheck) return next();

    res.json(queryCheck);
  } catch (error) {
    next(error);
  }
});

// Read One
router.get('/:id', async (req, res, next) => {
  try {
    // Get ID from request body
    const { id } = req.params;

    // Find if the ID exists in the database
    const item = await student_db.findOne({
      _id: id,
    });

    // If item not found, throw error
    if (!item) return next();

    // If item is found, sent the item back
    res.json(item);
  } catch (error) {
    next(error);
  }
});

/* collection.find(
  {quantity: {$gt: 0}},
  {sort: {quantity: -1}},
  function(err, docs) {
      // docs is the sorted array of your results, process them here
  }); */

// Create One
router.post('/', async (req, res, next) => {
  try {
    let objectId = '';
    const value = await student_schema.validateAsync(req.body);

    first_name = req.body.first_name;
    last_name = req.body.last_name;
    const nameCheck = await student_db.find({ first_name } && { last_name });

    if (nameCheck.length > 0) {
      console.log(`Duplicate found${nameCheck}`);
      throw new Error('Duplicate name found');
    }
    // console.log('Duplicate NOT found');
    // const inserted = await student_db.insert(req.body);
    const inserted = await student_db.insert(req.body, (err, docsInserted) => {
      if (err) return;
      objectId = docsInserted._id;
      callbackFunction(objectId);
    });

    const callbackFunction = (result) => {
      res.json({
        message: 'Record Created',
        id: result,
      });
    };
  } catch (error) {
    next(error);
  }
});

// Update One
router.put('/:id', async (req, res, next) => {
  try {
    // Get ID from request body
    const { id } = req.params;

    // Validate schema of new inputs
    const value = await student_schema.validateAsync(req.body);

    // Find if the ID exists in the database
    const item = await student_db.findOne({
      _id: id,
    });

    // If item not found, throw error
    if (!item) return next();

    // if item found, update the DB for the specific ID
    const updated = await student_db.update({ _id: id }, { $set: value });

    // On successfull update, sent a message to the response object
    res.json({ message: 'Record Updated' });
  } catch (error) {
    next(error);
  }
});

// Delete One
router.delete('/:id', async (req, res, next) => {
  try {
    // Get ID from request body
    const { id } = req.params;

    // Find if the ID exists in the database
    const item = await student_db.findOne({
      _id: id,
    });

    // If item not found, throw error
    if (!item) return next();

    // if item found, delete the document with the specific ID
    const deleted = await student_db.remove({ _id: id });

    // On successfull delete, sent a message to the response object
    res.json({ message: 'Record Deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
