const oracledb = require('oracledb');
const dbConfig = require('./db-config.js');

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* establish connection with Oracle DB */
async function testConnection(req, res) {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    stmt0 = `CREATE TABLE no_example (id NUMBER, data VARCHAR2(20))`
    stmt1 = `SELECT COUNT(*) FROM no_example`

    await connection.execute(stmt0);
    result = await connection.execute(stmt1);

    await connection.execute(`DROP TABLE no_example`);

    res.send(result)

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};


// The exported functions, which can be accessed in index.js.
module.exports = {
	testConnection: testConnection,
}