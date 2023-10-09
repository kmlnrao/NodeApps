
// /*  this api for get the data  getmethod*/
// app.get("/getmethod", (req, res) => {
//     console.log("res", req.query.mahesh)
//     if (req.query.firstparam && req.query.firstparam == 'first1') {
//         res.status(200).send(req.query)
//     }
//     else {
//         res.status(404).send("invalid parameters")
//     }
// })

// /*  this api for post the data  postmethod*/
// app.post("/postmethod", (req, res) => {
//     console.log("req", req.body);
//     res.status(200).send(req.body);
// })
// /*  this api for posting the data */

// app.post("/postdata", function(req, res) {
//     var num1 = Number(req.body.num1);
//     var num2 = Number(req.body.num2);
//     var result = num1 + num2 ;
//     res.send("Addition - " + result);
//   });

//   //console.log("__dirname",__dirname);

// /*  this api for get html */
//   app.get("/gethtml", function(req, res) {
//     res.sendFile(__dirname + "/index.html");
//   });  


// function filereaddata() {
//    return fs.readFile("test.txt", "utf-8", (err, data) => {
//     })
// }



// app.post("/postdata",(req,res)=>{
//     console.log("req", req.body);
//     res.send(req.body);

// })


/* assigning the data to wrieline file*/
// function datechange(data) {
//     if(data)
//     return `${data}date:${new Date().toISOString()} \ncotent:existing file the data is appended`
//     else
//     return `date:${new Date().toISOString()} \ncotent: new file is created`
// }

// // // let contaxt = datechange();

// function writefile() {
//     fs.writeFile("test.txt", datechange(), (err, data) => {
//     })
// }
// function readfn() {
//     fs.readFile("test.txt", "utf8", (err, data) => {
//         // console.log("err", err);
//        // console.log("readFile", data.length);
//         if (data.length == 0) {
//              writefile();
//         }
//         else {
//              apendfn();
//         }
//     })
// }
// readfn()


// function apendfn() {
//     fs.appendFile("test.txt", datechange('\n'), (err, data) => {
//     })
// }
//setInterval(() => apendfn(), 1000)

// console.log("start now");
// const data=fs.readFileSync('test.txt','utf-8')
// console.log("data:",data);
// console.log("end now")

// let datasync = `This is a file containing a collection of branches\n 1.Suvarna Technosoft\n 2.Softhealth Private limited`
// console.log("before data",datasync)
// fs.writeFileSync("testsync.txt", datasync);
// const data1=fs.readFileSync('testsync.txt','utf-8')
// console.log("after Readfile",data1)
// console.log("after data")
// fs.appendFileSync('testsync.txt',data1)
// console.log("after data apend")
// const dataapend=fs.readFileSync('testsync.txt','utf-8')
// console.log("after Readfile apend",data1)
// console.log("after Readfile ended")

/*  this api for get html */
// app.get("/gethtml", function(req, res) {
//     res.sendFile(__dirname + "/indexupload.html");
//   });  


//   app.get("/gethtml", function(req, res) {
//     res.sendFile(__dirname + "/index.html");
//   });  
