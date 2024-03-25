const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRegister = async (req, res) => {
	const { username, email, password } = req.body;

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});

		const userCreated = await newUser.save();

		// console.log("userCreated ", userCreated);

		if (!userCreated) {
			// console.log("User not created!!");
			return res.status(500).send("User cannot be created");
		} else {
			// console.log("User created");
			return res.status(200).send("User has been created into database");
		}
	} catch (error) {
		console.log(error);
	}
};

const userLogin = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		// console.log(username);
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).send("Invalid username or password 1");
		}

		// console.log(hashed);

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		// console.log("isPasswordCorrect ", isPasswordCorrect);

		// console.log(user);
		// console.log(user.password);
		// console.log(password);

		if (!isPasswordCorrect) {
			return res.status(401).send("Invalid username or password 2");
		}

		const mySecretKey = process.env.SECRET_CODE;

		const payload = {
			username: user.username,
			email: user.email,
			password: user.password,
		};

		const token = jwt.sign(payload, mySecretKey, { expiresIn: "5d" });

		// console.log("token ", token);

		res.status(200).json({
			msg: "User is Logged In",
			token: token,
		});
	} catch (error) {
		console.log(error);
	}
};

const authenticateToken = async (req, res, next) => {
	const authHeader = `Bearer ${req.headers["authorization"]}`;
	const token = authHeader && authHeader.split(" ")[1];
	// console.log("authHeader ", authHeader);

	if (!token) {
		return res.sendStatus(401);
	}

	const mySecretKey = process.env.SECRET_CODE;

	jwt.verify(token, mySecretKey, (err, user) => {
		if (err) {
			return res.sendStatus(403);
		}

		res.user = user;
		next();
	});
};

module.exports = {
	userRegister,
	userLogin,
	authenticateToken,
};
