const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, "A Username is required"],
		trim: true,
	},
	email: {
		type: String,
		required: [true, "A email is required"],
	},
	password: {
		type: String,
		required: [true, "A password is required"],
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
