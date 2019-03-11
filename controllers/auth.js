require('dotenv').config()
// Import user model
User = require('../models/user');
// Import validator package
let validator = require('validator');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

// Handle register user actions
exports.register = function (req, res) {
    const data = Object.assign(req.body, { user: req.user }) || {};

    // validation email value
    if (data.email && !validator.isEmail(data.email)) {
		return res.status(422).josn({
            message : 'Invalid email address.'
        });
    }

    var hashedPassword = bcrypt.hashSync(data.password, 8);
    data.password = hashedPassword;

    // save the user and check for errors
    User.create(data)
		.then(user => {
			res.json({
                message: 'Register successfully',
                data: user
            });
		})
		.catch(err => {
			res.status(500).json({
                message: err.errors
            });
		});
};

// Handle register user actions
exports.login = function (req, res) {
    const data = Object.assign(req.body, { user: req.user }) || {};

    // save the user and check for errors
    User.findOne({ email: data.email })
		.then(user => {
            if(!user){
                return res.status(404).json({
                    message: "Email or Password is not valid"
                });
            }

            var passwordIsValid = bcrypt.compareSync(data.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).json({
                    message: 'Email or Password is not valid'
                });
            }

            // create a token
            var token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: parseInt(process.env.JWT_EXPIRED)
            });
            
			res.json({
                message: 'Login successfully',
                data: user,
                token: token
            });
		})
		.catch(err => {
			res.status(500).json({
                message: err
            });
		});
};