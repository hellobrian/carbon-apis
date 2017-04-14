const express = require('express');
const bodyParser = require('body-parser');
const dbDocs = require('./lib');
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/carbon-icons', (req, res) => {
  dbDocs.getAll(res);
});

app.get('/api/carbon-icons/:docId', (req, res) => {
  dbDocs.get(req.params.docId, res);
});

app.post('/api/carbon-icons', (req, res) => {
  dbDocs.insert(req.body);
  res.json(req.body);
});

app.delete('/api/carbon-icons/:docId', (req, res) => {
  dbDocs.destroy(req.params.docId, res);
});

app.put('/api/carbon-icons/:name_or_rev', (req, res) => {
  res.send('TODO');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${process.env.NODE_ENV}`);
});
