const express = require('express')
const cors=require('cors')
const app = express()
const port = 8080

app.use(express.json());
app.use(cors());

app.use('/',require('./modules/router'));

app.listen(8080, () => {
    console.log(`http://localhost:8080`);
  });