// Import vehicle model
Vehicle = require('../models/vehicle');
let redis = require('../redis/connect');

// get vehicle by ID
exports.getByIDCached = function (id, callback) {
    redis.get(id, function (err, reply) {
        if (err) callback(500, err, null);
        else if (reply) {//Vehicle exists in cache
            console.log("Cache Redis Vehicle key : " + id);
            callback(null, null, JSON.parse(reply));
        } else {
            //Vehicle doesn't exist in cache - we need to query the main database
            Vehicle.findById(id)
            .then(vehicle => {
                if (!vehicle) {
                    callback(404, "Vehicle not found", null);
                }
                else {
                    console.log("Get Vehicle from DB key : " + id);
                    redis.set(id, JSON.stringify(vehicle), function () {
                        callback(null, null, vehicle);
                    });
                }
            })
            .catch(err => {
                callback(422, err, null);
            });
        }
    });
};

// update vehicle by ID
exports.updateByIDCached = function (id, data, callback) {
    Vehicle.findOneAndUpdate({ _id: id }, data, {new: true})
		.then(vehicle => {
			if (!vehicle) {
				callback(404, "Vehicle not found", null);
            }
            else {
                //Save new vehicle version to cache
                redis.set(id, JSON.stringify(vehicle), function (err) {
                    if (err) callback(500, err, null);
                    else {
                        console.log("Redis Vehicle key : " + id + " updated");
                        callback(null, null, vehicle);
                    }
                });
            }
		})
		.catch(err => {
            callback(422, err, null);
        });
};

// delete vehicle by ID
exports.deleteByIDCached = function (id, callback) {
    Vehicle.findOneAndDelete(
		{ _id: id }
	)
    .then(vehicle => {
        if (!vehicle) {
            callback(404, "Vehicle not found", false);
        }
        else {
            //Delete vehicle from cache
            redis.del(id, function (err) {
                if (err) callback(500, err, false);
                else {
                    console.log("Redis Vehicle key : " + id + " deleted");
                    callback(null, null, true);
                }
            });
        }
    })
    .catch(err => {
        callback(422, err, false);
    });
};