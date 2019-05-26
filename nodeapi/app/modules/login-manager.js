var Company = require('../models/company');
var Admin = require('../models/admin');
var config =require('../../config');

var async = require('async');

exports.companyLogin=function(req,callback){
	//Company.deleteMany({ }, function (err) {});
	Company.findOne({ companyname: req.companyname,password:req.password}, 'firstname lastname email companyname license_startdate license_enddate activestatus', function (err, result) {
	  if (err){
		  return callback(err);
	  }
	  if(result){
		  if(result.isDeleted==1){
			  return callback({status:0,message:"Account deleted",response:'unauthorised'});
		  }else if(exports.checDateExpired(result.license_enddate)){
			  return callback({status:0,message:"Account Expired.",response:'unauthorised'});
		  }else if(result.activestatus==false){
			  return callback({status:0,message:"Account Inactive or Pending to approve",response:'unauthorised'});
		  }else{
			  return callback(null,{status:1,message:"Logged In",userId:result._id,clientapikey:config.clientapikey});
		  }
	  }else{
		  return callback({status:0,message:"Incorrect credentials",response:'unauthorised'});
	  }
	});
}

exports.adminLogin=function(req,callback){
	if(req.username==config.admin.username && req.password==config.admin.password ){
		return callback(null,{status:1,message:"Admin Logged In",adminapikey:config.admin.adminapikey});
	}else{
		return callback({status:0,message:"Incorrect credentials",response:'unauthorised'});
	}
}

exports.checDateExpired=function(date){
	 var todayDate = new Date();
	 var todayMonth = todayDate.getMonth() + 1;
	 var todayDay = todayDate.getDate();
	 var todayYear = todayDate.getFullYear();
	 var todayDateText = todayYear+'-'+todayMonth + '-' + todayDay;
	 if(new Date(date) < new Date(todayDateText)){
		 return true;
	 }else{
		 return false;
	 }
}