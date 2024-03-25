const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");
const dotenv = require("dotenv");
const registerRoute = require("./router/user.route");
const movieRoute = require("./router/movie.route");
const ratingRoute = require("./router/rating.route");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/users/", registerRoute);
app.use("/api/movies", movieRoute);
app.use("/api/movies", ratingRoute);

db();

app.listen(process.env.PORT, () => {
	console.log(`App is connected at port ${process.env.PORT}`);
});
