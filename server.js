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

app.delete('/api/carbon-icons/:name_or_rev', (req, res) => {
  // db.destroy(
  //   'carbon-icons_test',
  //   'sup boo',
  //   '1-a664ec460205629b2b6a1bd6e647d197'
  // );
  // res.send(req.params.name_or_rev);
  res.send('TODO');
});

app.put('/api/carbon-icons/:name_or_rev', (req, res) => {
  res.send('TODO');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${process.env.NODE_ENV}`);
});
