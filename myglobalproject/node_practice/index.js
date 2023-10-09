const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 9002;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var api = require("./routes/api");
/* For route path*/
app.use("/api/post/", api);

/* middleware function for validate the incoming request*/
function validate(req, res, next) {
    var _bool = true;
    if (_bool) {
        next()
    }
    else {
        return res.status(400).send({
            status: 400,
            des: "invalid token"
        })
    }
}
/* for validate the incoming request from the client*/
app.use('/', validate, (req, res, next) => {
    next();
})



/* for creating the server*/
app.listen(port, function () {
    console.log(`Running at ${port}`);
})
























