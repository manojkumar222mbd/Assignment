var mongoose = require('mongoose')
var Schema =  mongoose.Schema;

var AdminLoginSchema =  new Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    apikey:{
        type:String
    }
});

var Admin = mongoose.model('admin',AdminLoginSchema);
var row = new Admin({ username: 'admin', password: 'admin',apikey:'xxxx-xxx-xxxx-xxx' });
module.exports = Admin;