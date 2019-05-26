var config = require('../../config');

exports.companyMiddleware=function(req,res,next){
	if(req.headers && req.headers.authorization && req.headers.authorization==`Bearer ${config.clientapikey}`){
		next();
	}else{
		res.send('Token invalid',401);
	}
}

exports.adminMiddleware=function(req,res,next){
	if(req.headers && req.headers.authorization && req.headers.authorization==`Bearer ${config.admin.adminapikey}`){
		next();
	}else{
		res.send('Token invalid',401);
	}
}