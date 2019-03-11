var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp')

// Setup schema
var vehicleSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    class: {
        type: String,
        trim: true,
        required: true
    },
    manufacture: {
        type: String,
        trim: true,
        required: true
    },
    production: {
        type: String,
        trim: true,
        required: true
    },
    transmission: {
        type: String,
        trim: true,
        required: true
    },
    color: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    }
},{ collection: 'vehicles' });

vehicleSchema.plugin(timestamps);

// Export vehicle model
var vehicle = module.exports = mongoose.model('vehicle', vehicleSchema);
module.exports.get = function (callback, limit) {
    vehicle.find(callback).limit(limit);
}