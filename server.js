const express = require('express')
const caching = require("./caching");
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    const response = await caching(req);
    res.status(200).json(response);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})