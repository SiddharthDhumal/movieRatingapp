const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const db = async () => {
	await mongoose
		.connect(process.env.DATABASE)
		.then(() => {
			console.log("DB connected Succesfully");
		})
		.catch((err) => console.log(err));
};

module.exports = db;

// {
// 	// useNewUrlParser: true,
// 	// useUnifiedTopology: true,
// }
