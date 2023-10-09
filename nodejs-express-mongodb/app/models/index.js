const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

// Assigning Connection String.
db.url = dbConfig.url;

// Your Table or Query ( Schema )
db.tutorials = require("./tutorial.model.js")(mongoose);
module.exports = db;
