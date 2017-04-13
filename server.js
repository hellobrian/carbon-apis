require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
const Cloudant = require('cloudant');
const app = express();
const port = process.env.PORT || 8080;

const username = process.env.cloudant_username;
const password = process.env.cloudant_password;

const cloudant = Cloudant({
  account: username,
  password,
  plugin: 'promises'
});

// const listDbAll = () => {
//   cloudant.db.list().then(data => console.log(data));
// };

async function listDbAll() {
  const data = await cloudant.db.list();
  return data;
}

const createDb = dbname => {
  cloudant.db
    .create(dbname)
    .then(data => {
      console.log(`Creating database '${dbname}'`);
      console.log(`Data: ${JSON.stringify(data, null, 2)}`);
    })
    .catch(err => console.log(err));
};

const createDoc = (database, obj) => {
  cloudant.db
    .use(database)
    .insert(obj)
    .then(data => {
      console.log(data);
    })
    .catch(e => console.log(e));
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/icons', (req, res) => {
  createDoc('carbon-icons_test', req.body);
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${process.env.NODE_ENV}`);
});
