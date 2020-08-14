const express = require('express');

const emojis = require('./emojis');

const student = require('./student');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/student', student);
// router.use('/student/search', student);

// eslint-disable-next-line eol-last
module.exports = router;