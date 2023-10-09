const express = require("express");
const cors = require("cors");

const app = express();

// var corsOptions = {
//   origin: "http://localhost:999"
// };

const allowedOrigins = ['http://localhost:8081'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models/index.js");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });

 require("./app/routes/tutorial.routes")(app);

  // set port, listen for requests
const PORT = process.env.PORT || 999;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});