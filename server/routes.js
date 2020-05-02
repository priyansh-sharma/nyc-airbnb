const oracledb = require('oracledb');
const dbConfig = require('./db-config.js');
const { User } = require('./models/user')


/* -------------------------------------------------- */
/* ------------------- Authentication --------------- */
/* -------------------------------------------------- */

function signup(req, res){
  const user = new User({
    username: req.body.username,
    password: req.body.password
  }).save((err, response)=>{
    if (err) res.status(400).send(err)
    res.status(200).send(response)
  })
}

function login(req, res){
  User.findOne({'username': req.body.username}, (err, user) => {
    if (!user) res.json({message: 'this user does not exist'})
    if(req.body.password = user.password){
      res.status(200).send('logged in!')
    }
  })
}


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

async function bnb(req, res) {
  let connection;

  connection = await oracledb.getConnection(dbConfig);

  
}

async function bnbTest(req, res) {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        // stmt0 = `CREATE TABLE AirBNB_NYC (id NUMBER(38), name VARCHAR2(128), host_id NUMBER(38), host_name VARCHAR2(26), neighborhood_group VARCHAR2(26), neighborhood VARCHAR2(26), latitude NUMBER(38, 5), longitude NUMBER(38, 5), room_type VARCHAR2(26), price NUMBER(38), minimum_nights NUMBER(38), number_of_reviews NUMBER(38), last_review VARCHAR2(26), reviews_per_month NUMBER(38, 2), calculated_host_listings_count NUMBER(38), availability_365 NUMBER(38), PRIMARY KEY (id))`
        // stmt0 = `CREATE TABLE test (id NUMBER(38), name VARCHAR2(128))`
        
        stmt1 = `SELECT id, name FROM AirBNB_NYC`

        result = await connection.execute(stmt1);

        res.send(result)

        console.log(result)

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
    bnbTest: bnbTest,
    signup: signup,
    login: login
    //noiseTest: noiseTest,
    //barsTest: barsTest
}