// Initialize express router
let router = require('express').Router();
let middleware = require('./utils/middleware');

// Set default API response
router.get('/', function (req, res) {
    res.json({
       status: 'API Its Working',
       message: 'Welcome to RESTHub crafted with love!',
    });
});

// Import auth controller
var auth = require('./controllers/auth');
// Import vehicle controller
var vehicle = require('./controllers/vehicle');
// Import user controller
var user = require('./controllers/user');

// Auth routes
router.route('/auth').post(auth.login);
router.route('/auth/register').post(auth.register);

// Vehicle routes
router.route('/vehicles')
    .get(middleware.checkToken, vehicle.index)
    .post(middleware.checkToken, vehicle.new);
router.route('/vehicles/:vehicle_id')
    .get(middleware.checkToken, vehicle.view)
    .put(middleware.checkToken, vehicle.update)
    .delete(middleware.checkToken, vehicle.delete);
    
// User routes
router.route('/users')
    .get(middleware.checkToken, user.index)
    .post(middleware.checkToken, user.new);
router.route('/users/:user_id')
    .get(middleware.checkToken, user.view)
    .put(middleware.checkToken, user.update)
    .delete(middleware.checkToken, user.delete);

// Export API routes
module.exports = router;