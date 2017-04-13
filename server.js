require('dotenv').load();
const express = require('express');
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

const listDbAll = () => {
  cloudant.db
    .list()
    .then(data => console.log(data))
    .catch(err => console.log(err));
};

const createDb = dbname => {
  cloudant.db
    .create(dbname)
    .then(data => {
      console.log(`Creating database '${dbname}'`);
      console.log(`Data: ${JSON.stringify(data, null, 2)}`);
    })
    .catch(err => {
      console.log(err);
    });
};

app.get('*', (req, res) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${process.env.NODE_ENV}`);
});
