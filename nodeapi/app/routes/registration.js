var RM = require('../modules/registration-manager');
var MW = require('../middleware/middleware');
exports.attachRoutes = function(app) {
    app.post('/registercompany', function(req, res) {
        RM.registerCompany(req.body, function(err, result) {
            if (err) {
                res.send(err, 401);
            } else {
                res.send(result, 200);
            }
        });
    });
	
	app.get('/getcompanydetails/:id',MW.companyMiddleware, function(req, res) {
        RM.getCompanyDetails(req.param("id"), function(err, result) {
            if (err) {
                res.send(err, 401);
            } else {
                res.send(result, 200);
            }
        });
    });
};