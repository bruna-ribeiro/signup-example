const express = require("express")
const router = express.Router()

// Encryption
const bcrypt = require("bcrypt")
const saltRounds = 5

// DB setup
const db = require("../database")

const { redirectToHome } = require("../middleware")

router.get("/", redirectToHome, (req, res) => {
	res.render("pages/login", {
		message: req.query.message,
	})
})

router.post("/", (req, res) => {
	db.oneOrNone("SELECT * from users where email = $1;", [req.body.email])
		.then((result) => {
			// if no result, return to login page
			if (!result) {
				res.redirect("/login?message=Email not found")
			} else {
				// otherwise, we compare the entered password with the password on the db
				const hash = result.password
				bcrypt.compare(req.body.password, hash, function (err, bcryptResult) {
					if (bcryptResult) {
						req.session.firstname = result.firstname
						req.session.userId = result.id
						res.redirect(`/home`)

						/*res.redirect(`/home?firstname=${result.firstname}`)*/
					} else {
						// the password does not match, send back
						res.redirect("/login?message=Incorrect password")
					}
				})
			}
		})
		.catch((err) => {
			res.redirect(`/login?message=${err}`)
		})
})

module.exports = router
