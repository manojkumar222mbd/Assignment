var AM = require('../modules/admin-manager');
var MW = require('../middleware/middleware');

exports.attachRoutes = function(app) {
    app.get('/admin/getallcompany',MW.adminMiddleware, function(req, res) {
        AM.getAllCompany(function(err, result) {
            if (err) {
                res.send(err, 401);
            } else {
                res.send(result, 200);
            }
        });
    });
	
	 app.put('/admin/editcompany',MW.adminMiddleware, function(req, res) {
        AM.editCompany(req.body,function(err, result) {
            if (err) {
                res.send(err, 401);
            } else {
                res.send(result, 200);
            }
        });
    });
	app.delete('/admin/deletecompany/:id',MW.adminMiddleware, function(req, res) {
        AM.deleteCompany(req.param('id'),function(err, result) {
            if (err) {
                res.send(err, 401);
            } else {
                res.send(result, 200);
            }
        });
    });
};