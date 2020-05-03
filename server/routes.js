const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;
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

  query = 
  `SELECT id, name, host_name, price, latitude, longitude FROM AIRBNB_NYC
  WHERE neighbourhood_group = '${req.body.borough}'
  AND
  neighbourhood = '${req.body.neighborhood}' AND 
  room_type = '${req.body.room_type}' AND
  price BETWEEN '${req.body.min_price}' AND '${req.body.max_price}'
  ORDER BY name`

  result = await connection.execute(query);

  res.send(result);

  await connection.close();
}

async function fewbars(req, res) {
  let connection;

  connection = await oracledb.getConnection(dbConfig);

  reset = `UPDATE AIRBNB_NYC SET bar_count = NULL, party_count = NULL`

  await connection.execute(reset);

  update = `UPDATE AIRBNB_NYC
  SET bar_count = (
  SELECT COUNT(*) FROM BARS B, AIRBNB_NYC A
  WHERE A.id = AIRBNB_NYC.id 
  AND B.latitude BETWEEN A.latitude - (${req.body.radius} / 69.2) AND A.latitude +  (${req.body.radius} / 69.2)
  AND B.longitude BETWEEN A.longitude - (${req.body.radius} / 68.99) AND A.longitude + (${req.body.radius} / 68.99))
  WHERE id IN 
  (SELECT id FROM AIRBNB_NYC
  WHERE neighbourhood_group = '${req.body.borough}' AND
  neighbourhood = '${req.body.neighborhood}' AND 
  room_type = '${req.body.room_type}' AND
  price BETWEEN ${req.body.min_price} AND ${req.body.max_price})`

  await connection.execute(update);
  
  query = 
    `WITH A AS
    (SELECT id, name, host_name, neighbourhood_group, room_type, price, latitude, longitude, bar_count FROM AIRBNB_NYC
    WHERE neighbourhood_group = '${req.body.borough}' AND
    neighbourhood = '${req.body.neighborhood}' AND 
    room_type = '${req.body.room_type}' AND
    price BETWEEN ${req.body.min_price} AND ${req.body.max_price})
    SELECT * FROM A
    WHERE bar_count <= (SELECT PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY bar_count DESC) FROM A)
    AND ROWNUM <= 5
    ORDER BY bar_count, price`
  
  result = await connection.execute(query);

  res.send(result);

  await connection.close();
}

async function manybars(req, res) {
  let connection;

  connection = await oracledb.getConnection(dbConfig);

  reset = `UPDATE AIRBNB_NYC SET bar_count = NULL, party_count = NULL`

  await connection.execute(reset);

  update = `UPDATE AIRBNB_NYC
  SET bar_count = (
  SELECT COUNT(*) FROM BARS B, AIRBNB_NYC A
  WHERE A.id = AIRBNB_NYC.id 
  AND B.latitude BETWEEN A.latitude - (${req.body.radius} / 69.2) AND A.latitude +  (${req.body.radius} / 69.2)
  AND B.longitude BETWEEN A.longitude - (${req.body.radius} / 68.99) AND A.longitude + (${req.body.radius} / 68.99) )
  WHERE id IN 
  (SELECT id FROM AIRBNB_NYC
  WHERE neighbourhood_group = '${req.body.borough}' AND
  neighbourhood = '${req.body.neighborhood}' AND 
  room_type = '${req.body.room_type}' AND
  price BETWEEN ${req.body.min_price} AND ${req.body.max_price})`

  await connection.execute(update);

  query =
  `WITH A AS
  (SELECT id, name, host_name, neighbourhood_group, room_type, price, latitude, longitude, bar_count FROM AIRBNB_NYC
  WHERE neighbourhood_group = '${req.body.borough}' AND
  neighbourhood = '${req.body.neighborhood}' AND 
  room_type = '${req.body.room_type}' AND
  price BETWEEN ${req.body.min_price} AND ${req.body.max_price})
  SELECT * FROM A
  WHERE bar_count >= (SELECT PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY bar_count DESC) FROM A)
  AND ROWNUM <= 5
  ORDER BY bar_count DESC, price`
  
  result = await connection.execute(query);

  res.send(result);

  await connection.close();
}


// The exported functions, which can be accessed in index.js.
module.exports = {
    testConnection: testConnection,
    signup: signup,
    login: login,
    bnb: bnb,
    fewbars: fewbars,
    manybars: manybars
}