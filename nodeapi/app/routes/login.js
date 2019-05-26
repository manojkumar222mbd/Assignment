var AM = require('../modules/login-manager');

exports.attachRoutes = function(app) {
    app.post('/login', function(req, res) {
        AM.companyLogin(req.body,function(err, result) {
            if (err) {
                res.send(err, 401);
            } else {
                res.send(result, 200);
            }
        });
    });
	
	 app.post('/admin/login', function(req, res) {
        AM.adminLogin(req.body,function(err, result) {
            if (err) {
                res.send(err, 401);
            } else {
                res.send(result, 200);
            }
        });
    });
};