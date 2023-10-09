const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World Root!')
})

app.get('/testmethod', (req, res) => {
    console.log("req.query", req.query);
    res.send('Hello World testmethod!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})