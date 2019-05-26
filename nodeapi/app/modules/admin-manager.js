var Company = require('../models/company');
var bodyParser=require('body-parser');
var config =require('../../config');
var async = require('async');

exports.getAllCompany=function(callback){
	Company.find({})
     .sort({'timestamp': 'desc'})
     .exec(function(err, result) {
         if (err){
			  return callback(err);
		  }
		  var total_active=0;
		  var total_inactive=0;
		  var total_deleted=0;
		  var res=[];
		  result.map(val=>{
			  if(val.activestatus==true){
				  total_active+=1;
			  }else{
				  total_inactive+=1;
			  }
			  if(val.isDeleted==1){
				  total_deleted+=1;
			  }else{
				  res.push(val);
			  }
		  });
		 callback(null,{status:1,total:result.length,
							total_active:total_active,
							total_inactive:total_inactive,
							total_deleted:total_deleted,
							response:res});
     });
}

exports.editCompany=function(req,callback){
	Company.updateOne({_id:req._id},req,function(err, result) {
         if (err){
			  return callback(err);
		  }
		 callback(null,{status:1,message:"Updated successfully",response:"success"});
     });
}

exports.deleteCompany=function(id,callback){
	Company.updateOne({_id:id},{isDeleted:1},function(err, result) {
         if (err){
			  return callback(err);
		  }
		 callback(null,{status:1,message:"Deleted successfully",response:"success"});
     });
}