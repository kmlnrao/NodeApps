const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

var filename = '';

const express = require('express');
const { resolve } = require("path");
//const exphbs = require('express-handlebars');
//const path = require('path');
const port = 9000;
const app = express();

var headerdata = [];
var bodydata = [];

var report_template_name = 'reporttemplate.htm';

var params = {
    umrno: 'UMR0108569',
    serviceid: '356,',
    billid: '227710',
    resultno: '174858,',
    sessionid: '1',
    clsid: '2'
};

async function getReportHeaderDatafromDB() {

    return new Promise((resolve, reject) => {
        var sql = require("mssql");

        // config for your database
        var config = {
            user: 'himsdev',
            password: 'suvarna@123',
            server: '103.145.36.189',
            database: 'P_LUCID_LIMS',
            options: {
                encrypt: true, // for azure
                trustServerCertificate: true // change to true for local dev / self-signed certs
            }
        };

        // connect to your database
        sql.connect(config, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            request.input('IP_UMR_NO', sql.VarChar(30), 'UMR0239270');
            request.input('IP_SERVICE_ID', sql.VarChar(200), '356,275,80,244,256,163,278,323,257,');
            request.input('IP_BILL_ID', sql.VarChar(30), '497196');
            request.input('IP_RESULT_NO', sql.VarChar(200), '524734,524815,524830,524830,524830,524830,524902,525170,525301,');
            request.input('IP_PATIENT_CLASS_ID', sql.VarChar(30), '2');
            request.input('IP_SESSION_ID', sql.VarChar(30), '1');
            // query to the database and get the records
            request.execute('PR_GET_PATIENT_HEADER_INFO', function (err, recordset) {
                if (err) console.log(err)
                // send records as a response
                headerdata = recordset.recordsets[0];
                resolve(headerdata);
                //res.send(recordset);

            });
        });
    });
}

async function getReportDatafromDB() {
    return new Promise((resolve, reject) => {
        var sql = require("mssql");

        // config for your database
        var config = {
            user: 'himsdev',
            password: 'suvarna@123',
            server: '103.145.36.189',
            database: 'P_LUCID_LIMS',
            options: {
                encrypt: true, // for azure
                trustServerCertificate: true // change to true for local dev / self-signed certs
            }
        };

        // connect to your database
        sql.connect(config, function (err) {

            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            request.input('IP_UMR_NO', sql.VarChar(30), 'UMR0239270');
            request.input('IP_SERVICE_ID', sql.VarChar(200), '356,275,80,244,256,163,278,323,257,');
            request.input('IP_BILL_ID', sql.VarChar(30), '497196');
            request.input('IP_RESULT_NO', sql.VarChar(200), '524734,524815,524830,524830,524830,524830,524902,525170,525301,');
            request.input('IP_SERVICE_GROUP_ID', sql.VarChar(30), null);
            request.input('IS_COMP_CRET_REQ', sql.VarChar(30), 'N');
            request.input('IS_DOC_CRET_REQ', sql.VarChar(30), 'N');
            request.input('IP_GENDER_ID', sql.VarChar(30), '2');
            request.input('IP_AGE', sql.VarChar(30), '15');
            request.input('IP_PATIENT_CLASS_ID', sql.VarChar(30), '2');
            request.input('IP_SESSION_ID', sql.VarChar(30), '1');

            // query to the database and get the records
            request.execute('PR_GET_PATIENT_PARAMETER_INFO_D_TEST', function (err, recordset) {

                if (err) console.log(err)
                // send records as a response
                bodydata = recordset.recordsets[0];
                resolve(bodydata)
                //res.send(recordset);

            });
        });
    })
}

async function createDBPDF(users) {

    var templateHtml = fs.readFileSync(report_template_name, 'utf8');
   //var templateHtml = fs.readFileSync('reporttemplate.htm', 'utf8');
    var template = handlebars.compile(templateHtml);
    var html = template(bodydata);

    var base64data = Buffer.from(bodydata[0].QR_CODE_BYTES, 'binary').toString('base64');
    const logoSrc = "data:image/jpeg;base64," + base64data;
    headerdata[0].QRCODEIMAGE = logoSrc;

    for ( var i =0; i< bodydata.length; i++)
    {
        var interpretation = bodydata[i].INTERPRETATION;
        interpretation = interpretation.replace("&#", " ");
        interpretation = interpretation.replace("nbsp", " ");
        bodydata[i].INTERPRETATION = interpretation;

        var parameters = bodydata[i].PARAMETERS;
        parameters = parameters.replace("&", " ");
        parameters = parameters.replace("nbsp", " ");
        bodydata[i].PARAMETERS = parameters;

        if (bodydata[i].PARAMETERS.indexOf('Blood Grouping',0)>0)
        { 
            //console.log(bodydata[i].SERVICE_NAME);
            console.log(bodydata[i].PARAMETERS);
        }
    }

    var pdfPath = path.join('pdf', `testme.pdf`);

    var headertemplateHTML = fs.readFileSync("header.htm", "utf8");
    var headertemplate = handlebars.compile(headertemplateHTML);
    var templateHeader = headertemplate(headerdata);
    var templateFooter = fs.readFileSync("footer.htm", "utf8");

    var options = {
        format: "A4",
        orientation: "portrait",
        border: "0mm",

        displayHeaderFooter: true,
        headerTemplate: templateHeader,
        footerTemplate: templateFooter,
        margin: {
            top: '290px',
            bottom: '60px'
        },
        printBackground: true,
        path: pdfPath
    }

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true
    });

    var page = await browser.newPage();

    await page.goto(`data:text/html;charset=UTF-8,${html}`, {
        waitUntil: 'networkidle0'
    });

    await page.pdf(options);
    await browser.close();
}

async function createPDF(data) {

    var templateHtml = fs.readFileSync(path.join(process.cwd(), 'testme.htm'), 'utf8');
    var template = handlebars.compile(templateHtml);
    var html = template(data);

    var header = fs.readFileSync("header.htm", "utf8");
    var footer = fs.readFileSync("footer.htm", "utf8");

    header = header.replace("BILL_DATE", headerdata[0].BILL_DATE);
    header = header.replace("PATIENT_NAME", headerdata[0].PATIENT_NAME);
    header = header.replace("REPORT_DATE", headerdata[0].REPORT_DATE);
    header = header.replace("UMR_NO", headerdata[0].UMR_NO);
    header = header.replace("AGE", headerdata[0].AGE);
    header = header.replace("GENDER", headerdata[0].GENDER);
    header = header.replace("REFERAL", headerdata[0].REFERAL);
    header = header.replace("LOCATION_NAME", headerdata[0].LOCATION_NAME);
    //header = header.replace("QRCODE_PATH","http://103.145.36.189/his/private/doctorsignature/qr.PNG");
    header = header.replace("QRCODE_PATH", logoSrc);

    var sdateTime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    footer = footer.replace("CURRENT_DATE", sdateTime);

    var milis = new Date();
    milis = milis.getTime();

    var pdfPath = path.join('pdf', `testme.pdf`);

    var options = {
        format: "A4",
        orientation: "portrait",
        border: "0mm",
        //width: '1230px',
        //headerTemplate:header,
        //footerTemplate:footer,
        //displayHeaderFooter: false,
        margin: {
            top: "0",
            bottom: "0"
        },
        header: {
            height: "69mm",
            contents: header
        },
        footer: {
            height: "10mm",
            contents: footer

        },
        printBackground: true,
        path: pdfPath
    }

    // const browser = await puppeteer.launch({
    //         args: ['--no-sandbox'],
    //         headless: true
    //     });

    // var page = await browser.newPage();

    // await page.goto(`data:text/html;charset=UTF-8,${html}`, {
    //     waitUntil: 'networkidle0'
    // });

    // await page.pdf(options);
    await browser.close();
}

app.get('/', async (request, response) => {

   var rpttype =  request.query.rpttype;


   if (rpttype == "1"){
     report_template_name = 'reporttemplate.htm';
   }
   else{
    report_template_name = 'svg_reporttemplate.htm';
   }

    let _headerdata = await getReportHeaderDatafromDB();
    let _bodydata = await getReportDatafromDB();
    await createDBPDF(bodydata);
    var pdfPath = path.join('pdf', `testme.pdf`);
    var file = fs.createReadStream(pdfPath);
    var stat = fs.statSync(pdfPath);
    response.setHeader('Content-Length', stat.size);
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', 'inline; filename=' + pdfPath);
    file.pipe(response);
});

app.get('/gen-pdf', async (req, res) => {
    try {

        let _headerdata = await getReportHeaderDatafromDB();
        let _bodydata = await getReportDatafromDB();
        await createDBPDF(bodydata);
        var pdfPath = path.join('pdf', `testme.pdf`);
        var file = fs.createReadStream(pdfPath);
        var stat = fs.statSync(pdfPath);
        response.setHeader('Content-Length', stat.size);
        response.setHeader('Content-Type', 'application/pdf');
        response.setHeader('Content-Disposition', 'inline; filename=' + pdfPath);
        file.pipe(response);

    } catch (error) {

    }
})

app.post('/pdfgen', async (req, res) => {
    try {

        let _headerdata = await getReportHeaderDatafromDB();
        let _bodydata = await getReportDatafromDB();
        await createDBPDF(bodydata);
        var pdfPath = path.join('pdf', `testme.pdf`);
        var file = fs.createReadStream(pdfPath);
        var stat = fs.statSync(pdfPath);
        response.setHeader('Content-Length', stat.size);
        response.setHeader('Content-Type', 'application/pdf');
        response.setHeader('Content-Disposition', 'inline; filename=' + pdfPath);
        file.pipe(response);

    } catch (error) {

    }
})

app.listen(port, async function () {
    console.log('teest me pdf gen');

});
