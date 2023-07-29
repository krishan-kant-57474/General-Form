const dotenv = require("dotenv"); //use for hide dat we also have batter ultanative like "require("dotenv").config();" for that we change config.env to .env//
const mongoose = require("mongoose"); //use for database//
const express = require("express"); //use for express//
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config({ path: "./config.env" });
require("./db/conn");
// const User = require("./models/userSchema");  //not use here it use in auth.js
app.use(express.json()); //for understanding form express data of postman//

//we link the router files to make our router easy//
app.use(require("./router/auth"));

if (process.env.NODE_ENV == "production") {
	app.use(express.static("client/build"));
}

app.listen(PORT, () => {
	console.log(`connect server successfuly port no. ${PORT}`);
});
