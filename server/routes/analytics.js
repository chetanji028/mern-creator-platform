const express = require('express');
const fs = require('fs');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.get('/data', authenticate, (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data/mockAnalytics.json'));
  res.json(data);
});

router.post('/upload', authenticate, (req, res) => {
  // Simulate JSON upload (in real app, use multer for file uploads)
  const newData = req.body;
  fs.writeFileSync('./data/mockAnalytics.json', JSON.stringify(newData, null, 2));
  res.json({ message: 'Analytics data updated' });
});

module.exports = router;