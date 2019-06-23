const express = require('express');

const connect = require('connect');
const serveStatic = require('serve-static');

const csv = require('csv-parser');  
const fs = require('fs');
// Set up the express app
const app = express();
// get all todos
app.get('/api/v1/csv', (req, res) => {
  let rows = [];
  fs.createReadStream(req.query.fileName)  
  .pipe(csv())
  .on('data', (row) => {
    rows.push(row);
  })
  .on('end', () => {
    res.status(200).send({ rows : rows});
  });
});
const PORT = 5000;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});