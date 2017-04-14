require('dotenv').load();
const cloudant = require('cloudant')({
  account: process.env.cloudant_username,
  password: process.env.cloudant_password,
  plugin: 'promises'
});

/////////////////////////////////
// Database
/////////////////////////////////

/***
 *  ListAllDb(): list all databases in account
 */

const listAllDb = () => {
  cloudant.db.list().then(data => console.log(data));
};

/***
 *  createDb(dbname: String): create a new database in account
 */

const createDb = dbname => {
  cloudant.db
    .create(dbname)
    .then(data => {
      console.log(`Creating database '${dbname}'`);
      console.log(`Data: ${JSON.stringify(data, null, 2)}`);
    })
    .catch(err => console.log(err));
};

/////////////////////////////////
// Document
/////////////////////////////////

/***
 * GET REQUEST
 *   getDocs(database: String, response: Object): get all docs from database
 *     - (database: String): name of database
 *     - (obj: Object): response object from express route (res.json)
 */

const getDocs = (dbName, response) => {
  // cloudant.db
  //   .use(database)

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
    .catch(err => console.log(err));
};

/***
 * POST REQUEST
 *   insertDoc(database: String, obj: Object): insert a new document into database
 *     - (database: String): name of database
 *     - (obj: Object): Object data for new document
 */

const insertDoc = (dbName, obj) => {
  // cloudant.db
  //   .use(dbName)
  cloudant.db
    .use(dbName)
    .insert(obj)
    .then(data => console.log(data))
    .catch(e => console.log(e));
};

module.exports = {
  get: getDocs,
  insert: insertDoc
};
