var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp')

// Setup schema
var userSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        bcrypt: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    }
},{ collection: 'users' });

userSchema.plugin(timestamps);

// Export user model
var user = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    user.find(callback).limit(limit);
}