// Import vehicle model
Vehicle = require('../models/vehicle');
// Import redis vehicle
let access = require('../redis/vehicle');

// Handle index actions
exports.index = function (_req, res) {
    Vehicle.get(function (err, vehicles) {
        if (err) {
            res.status(500).json({
                message: err,
            });
        }
        res.json({
            message: "vehicles retrieved successfully",
            data: vehicles
        });
    });
};
// Handle create vehicle actions
exports.new = function (req, res) {
    const data = Object.assign(req.body, { vehicle: req.vehicle }) || {};

    // save the vehicle and check for errors
    Vehicle.create(data)
		.then(vehicle => {
			res.json({
                message: 'New vehicle created!',
                data: vehicle
            });
		})
		.catch(err => {
			res.status(500).json({
                message: err.errors
            });
		});
};
// Handle view vehicle info
exports.view = function (req, res) {
    if (!req.params.vehicle_id) {
        return res.status(400).json({
            message: "Please send a proper ID"
        });
    }
    
    // get data from redis
    access.getByIDCached(req.params.vehicle_id, function (code, err, vehicle) {
        if (err) {
            return res.status(code).json({
                message: err
            });
        }
        
        res.json({
            message: "vehicles retrieved successfully",
            data: vehicle
        });
    });
};
// Handle update vehicle info
exports.update = function (req, res) {
    const data = req.body || {};

    // update data vehicle on redis
    access.updateByIDCached(req.params.vehicle_id, data, function (code, err, vehicle) {
        if (err) {
            return res.status(code).json({
                message: err
            });
        }
        
        res.json({
            message: "Vehicle Info updated",
            data: vehicle
        });
    });
};
// Handle delete vehicle
exports.delete = function (req, res) {
    // delete data vehicle from redis
    access.deleteByIDCached(req.params.vehicle_id, function (code, err, _vehicle) {
        if (err) {
            return res.status(code).json({
                message: err
            });
        }
        
        res.status(302).json({
            message: "Vehicle successfully deleted"
        });
    });
};