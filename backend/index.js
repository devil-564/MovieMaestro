let express = require('express')
let connectToMongo = require('./db')
let cors = require('cors')

connectToMongo();

const app = express(); 
app.use(cors());
app.use(express.json());
const port = 3000;

app.get('/', (_, res)=>{
    res.send("Helloooo Irfan"); 
})

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movie', require('./routes/movie'));
app.use('/api/seat', require('./routes/seat'))
app.use('/api/admin', require("./routes/adminAuth"))  
app.use('/api/stripe', require("./routes/stripe"))


app.listen(port, () => {
    console.log(`EverYthing.io backend listening at http://localhost:${port}`) 
})