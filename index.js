const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const app = express()

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));



app.use(cors({
    origin: '*'
}))

app.use(require('./routes'))

app.get('/', (req, res) =>{
    res.status(200).send('Meu backend!')
}) 

app.listen(3030, () => {
    console.log("iniciado")
})