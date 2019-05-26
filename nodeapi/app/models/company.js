var mongoose = require('mongoose')
var Schema =  mongoose.Schema;

var CompanySchema =  new Schema({
    firstname:{
        type:String,required: true
    },
    lastname:{
        type:String,required: true
    },
    email:{
        type:String,required: true
    },
    companyname:{
        type:String,required: true
    },
    license_startdate:{
        type:String,required: true
    },
    license_enddate:{
        type:String,required: true
    },
	password:{
        type:String,required: true
    },
	activestatus:{
        type:Boolean,default: false
    },
	timestamp: {
		type: Date, default: Date.now
	},
	isDeleted: {
		type: Number, default: 0
	}
});

var Company = mongoose.model('company',CompanySchema);
module.exports = Company;