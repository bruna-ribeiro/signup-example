// redirect to login page if user is not logged in
const redirectToLogin = (req, res, next) => {
	if (!req.session.userId) {
		console.log("No userId, redirecting to login")
		res.clearCookie("mrcoffee_sid")
		res.redirect("/login")
	} else {
		next()
	}
}

// redirect to home page if user is logged in
const redirectToHome = (req, res, next) => {
	if (req.session.userId) {
		console.log("userId exists, redirecting to home")
		res.redirect("/")
	} else {
		next()
	}
}

module.exports = { redirectToLogin, redirectToHome }
