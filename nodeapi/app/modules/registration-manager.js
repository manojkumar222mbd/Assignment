var Company = require('../models/company');
var async = require('async');


exports.checkCompanyExist=function(companyname,callback){
	Company.find({isDeleted:0,companyname: {'$regex': companyname,$options:'i'}}, function (err, result) {
		  if (err){
			  return callback(err);
		  }
		  if(result.length > 0){
			  callback({status:0,response:'unauthorized',message:'Company name already exist.'});
		  }else{
			  callback(null,{status:1,response:'Success'});
		  }
    });
}

exports.registerCompany=function(req,callback){
	  async.waterfall([function(callback){
		  exports.checkCompanyExist(req.companyname,function(err,res){
			  if(err){
				  return callback(err);
			  }
			  callback(null);
		  });
	  },function(callback){
		  Company.create(req, function (err, result) {
		  if (err){
			  return callback({status:0,response:err});
		  }
		  callback(null,{status:1,message:'Company registered successfully. Please wait for  approval',response:result});
		});
	  }],function(err,result){
		  if(err){
			  return callback(err);
		  }
		  callback(null,result);
	  });
}

exports.getCompanyDetails=function(id,callback){
	Company.findOne({_id:id}, 'firstname lastname email companyname license_startdate license_enddate', function (err, result) {
	  if (err){
		  return callback(err);
	  }
	  if(result){
		  return callback(null,{status:1,message:"Logged In",response:result});
	  }else{
		  return callback({status:0,message:"Something went wrong",response:'unauthorised'});
	  }
	});
}