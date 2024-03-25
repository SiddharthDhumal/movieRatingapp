const router = require("express").Router();
const {
	rateMovie,
	updateMovieRating,
	deleteMovieRating,
	ListofReviews,
	averageRating,
} = require("../controller/ratingandreviews.controller");
const { authenticateToken } = require("../controller/user.controller");

router.post("/:movieId/reviews", authenticateToken, rateMovie);
router.put("/:movieId/reviews/:reviewId", authenticateToken, updateMovieRating);
router.delete(
	"/:movieId/reviews/:reviewId",
	authenticateToken,
	deleteMovieRating
);

router.get("/:movieId/reviews", authenticateToken, ListofReviews);
router.get("/:movieId/averageRating", authenticateToken, averageRating);

module.exports = router;
