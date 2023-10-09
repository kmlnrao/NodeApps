const fs = require("fs");
const express = require("express");
const moment=require("moment");

const bodyParser = require("body-parser");
const { json } = require("body-parser");

module.exports = {
    readfn: function (req, res,resp) {
        fs.readFile("filelog.txt", "utf8", (err, data) => {
            if (data) {
                apendFn(req,resp);
            }
            else {
                writeFile(req,resp);
            }
        })
    }
}
/* for change the data */
function datechange(data,resp,space) {
    if (space)
        return `${space}date:${moment().format('Do-MMMM-YYYY, h:mm a').replace("th","")} \nmethod:${data.url.replace('/', '')}\nHeaders:${JSON.stringify(data.headers)} \nbody:${JSON.stringify(data.body)}\nResponse:${JSON.stringify(resp)}\n`
    else
        return `date:${moment().format('Do MMMM YYYY, h:mm:ss a')} \nmethod:${data.url.replace('/', '')}\nHeaders:${JSON.stringify(data.headers)} \nbody:${JSON.stringify(data.body||data.query)}\nResponse:${JSON.stringify(resp)}\n`
}

function writeFile(data,resp) {
    fs.writeFile("filelog.txt", datechange(data,resp), (err, data) => {
    })
}

function apendFn(data,resp) {
    fs.appendFile("filelog.txt", datechange(data, resp,'\n'), (err, data) => {
    })
}
