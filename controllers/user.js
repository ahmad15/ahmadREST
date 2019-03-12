// Import user model
User = require('../models/user');
// Import validator package
let validator = require('validator');

// Handle index actions
exports.index = function (_req, res) {
    User.get(function (err, users) {
        if (err) {
            res.status(500).json({
                message: err,
            });
        }
        res.json({
            message: "users retrieved successfully",
            data: users
        });
    });
};
// Handle create user actions
exports.new = function (req, res) {
    const data = Object.assign(req.body, { user: req.user }) || {};
    // validation email value
    if (data.email && !validator.isEmail(data.email)) {
		return res.status(422).josn({
            message : 'Invalid email address.'
        });
    }

    // save the user and check for errors
    User.create(data)
		.then(user => {
			res.json({
                message: 'New user created!',
                data: user
            });
		})
		.catch(err => {
			res.status(500).json({
                message: err.errors
            });
		});
};
// Handle view user info
exports.view = function (req, res) {
    User.findById(req.params.user_id)
		.then(user => {
            if (!user) {
				return res.status(404).json({
                    message: "User not found"
                });
            }

			res.json({
                message: "users retrieved successfully",
                data: user
            });
		})
		.catch(err => {
			res.status(422).json({
                message: err
            });
		});
};
// Handle update user info
exports.update = function (req, res) {
    const data = req.body || {};

    // validation email value
    if (data.email && !validator.isEmail(data.email)) {
		return res.status(422).josn({
            message : 'Invalid email address.'
        });
    }
    
    User.findOneAndUpdate({ _id: req.params.user_id }, data, {new: true})
		.then(user => {
			if (!user) {
				return res.status(404).json({
                    message: "User not found"
                });
            }
            
			res.json({
                message: 'User Info updated',
                data: user
            });
		})
		.catch(err => {
            res.status(422).json({
                message: err
            });
		});
};
// Handle delete user
exports.delete = function (req, res) {
    User.findOneAndDelete(
		{ _id: req.params.user_id }
	)
    .then(user => {
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(302).json({
            message: "User deleted"
        });
    })
    .catch(err => {
        res.status(422).json({
            message: err
        });
    });
};