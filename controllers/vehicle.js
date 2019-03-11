// Import vehicle model
Vehicle = require('../models/vehicle');
// Import redis vehicle
let access = require('../redis/vehicle');
// const redis = require('redis');

// Handle index actions
exports.index = function (_req, res) {
    // Vehicle.get(function (err, vehicles) {
    //     if (err) {
    //         res.status(500).json({
    //             message: err,
    //         });
    //     }
    //     res.json({
    //         message: "vehicles retrieved successfully",
    //         data: vehicles
    //     });
    // });
    access.getCached(redisConnect, function(vehicles){
        if (!vehicles){
            res.status(500).json({
                message: "Empty data"
            });
        }
        else {
            res.json({
                message: "vehicles retrieved successfully",
                data: vehicles
            });
        }
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
    Vehicle.findById(req.params.vehicle_id)
		.then(vehicle => {
            if (!vehicle) {
				return res.status(404).json({
                    message: "Vehicle not found"
                });
            }

			res.json({
                message: "vehicles retrieved successfully",
                data: vehicle
            });
		})
		.catch(err => {
			res.status(422).json({
                message: err
            });
		});
};
// Handle update vehicle info
exports.update = function (req, res) {
    const data = req.body || {};
    Vehicle.findOneAndUpdate({ _id: req.params.vehicle_id }, data)
		.then(vehicle => {
			if (!vehicle) {
				return res.status(404).json({
                    message: "Vehicle not found"
                });
            }
            
			res.json({
                message: 'Vehicle Info updated',
                data: vehicle
            });
		})
		.catch(err => {
            res.status(422).json({
                message: err
            });
		});
};
// Handle delete vehicle
exports.delete = function (req, res) {
    Vehicle.findOneAndDelete(
		{ _id: req.params.vehicle_id }
	)
    .then(vehicle => {
        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        res.status(302).json({
            message: "Vehicle deleted"
        });
    })
    .catch(err => {
        res.status(422).json({
            message: err
        });
    });
};