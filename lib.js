require('dotenv').load();
const cloudant = require('cloudant')({
  account: process.env.cloudant_username,
  password: process.env.cloudant_password,
  plugin: 'promises'
});

/////////////////////////////////
// Database
//*******************************
//* listAllDb(): list all databases in account
//* createDb(dbname: String): create a new database in account

// const listAllDb = () => {
//   cloudant.db.list().then(data => console.log(data));
// };

// const createDb = dbname => {
//   cloudant.db
//     .create(dbname)
//     .then(data => {
//       console.log(`Creating database '${dbname}'`);
//       console.log(`Data: ${JSON.stringify(data, null, 2)}`);
//     })
//     .catch(err => console.log(err));
// };

/////////////////////////////////
// Document
//*******************************
//* getDocs(database: String, response: Object): get all docs from database
//* insertDoc(database: String, obj: Object): insert a new document into database

module.exports = {
  get(dbName, response) {
    cloudant.db
      .use(dbName)
      .list({
        include_docs: true,
        conflicts: true
      })
      .then(data => {
        const docs = data.rows.map(row => row.doc);
        response.json(docs);
      })
      .catch(e => console.log(e));
  },
  insert(dbName, obj) {
    cloudant.db
      .use(dbName)
      .insert(obj)
      .then(data => console.log(data))
      .catch(e => console.log(e));
  },
  destroy(dbName, docname, rev) {
    cloudant.db
      .use(dbName)
      .destroy(docname, rev)
      .then(data => console.log(data))
      .catch(e => console.log(e));
  }
};
