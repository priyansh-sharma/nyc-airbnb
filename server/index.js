const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();

const mongourl = 'mongodb+srv://admin:davweq-heRqon-nuphi8@550cluster-p0sye.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongourl)
.then(console.log("mongodb connected"))

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */




/* ---- (oracle connection) ---- */
app.get('/airbnbs', routes.bnbTest);

app.post('/signup', routes.signup);

app.post('/login', routes.login);


app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});