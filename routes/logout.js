const express = require("express")
const router = express.Router()

// Destroy the cookie and redirect to login page
router.get("/", (req, res) => {
	req.session.destroy(function (err) {
		if (err) {
			res.send(err.message)
		} else {
			res.clearCookie("mrcoffee_sid")
			res.redirect("/login")
		}
	})
})

module.exports = router
