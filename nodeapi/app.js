var express =require('express');
var app = express();
var cors = require('cors');
const mongoose=require('mongoose');
var bodyParser=require('body-parser');
var config =require('./config');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

//Routes Start
require('./app/routes/login').attachRoutes(app);
require('./app/routes/registration').attachRoutes(app);
require('./app/routes/admin').attachRoutes(app);

//Database Connect
mongoose.connect('mongodb://localhost/company',{useNewUrlParser:true}).then(()=> {
    console.log('Database connected');
  }).catch((error)=> {
    console.log('Error connecting to database');
});

let port = config.port;
app.get('/', function(req, res) {
    res.send(`Server running on port:${port}...`, 200);
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, OPTIONS, PUT');
    next();
  });
app.listen(port,(err,success)=>{
    if(err){
        console.log('err',err);
    }else{
        console.log(`Server running on port:${port}...`);
    }
});