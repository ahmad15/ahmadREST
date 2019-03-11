// Import vehicle model
Vehicle = require('../models/vehicle');

exports.getCached = function (redis, callback) {
    redis.get(function (err, reply) {
        if (err) callback(null);
        else if (reply) //Vehicle exists in cache
        callback(JSON.parse(reply));
        else {
            //Vehicle doesn't exist in cache - we need to query the main database
            Vehicle.get(function (err, vehicles) {
                if (err || !vehicles) callback(null);
                else {//Book found in database, save to cache and return to client
                    redis.set(JSON.stringify(vehicles), function () {
                        callback(vehicles);
                    });
                }
            });
        }
    });
};