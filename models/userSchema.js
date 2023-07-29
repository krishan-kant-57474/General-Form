const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		match: /^[A-Za-z]+$/,
	},
	lastName: {
		type: String,
		required: true,
		match: /^[A-Za-z]+$/,
	},
	email: {
		type: String,
		required: true,
		match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
	},
	country: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	dateOfBirth: {
		type: Date,
		required: true,
		validate: {
			validator: function (value) {
				const today = new Date();
				const age = today.getFullYear() - value.getFullYear();
				return age >= 14; // Must be older than 14 years
			},
			message: "Age must be older than 14 years",
		},
	},
});

const Personal = mongoose.model("PERSONAL", userSchema);

module.exports = Personal;
