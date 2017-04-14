const express = require('express');
const bodyParser = require('body-parser');
const db = require('./lib');
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/carbon-icons', (req, res) => {
  db.get('carbon-icons_test', res);
});

app.post('/api/carbon-icons', (req, res) => {
  db.insert('carbon-icons_test', req.body);
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${process.env.NODE_ENV}`);
});
