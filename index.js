// Express setup
const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000

// body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// static assets
app.use(express.static("public"))
app.set("view engine", "ejs")

const session = require("express-session")
const threehours = 1000 * 60 * 60 * 3
app.use(
	session({
		name: "mrcoffee_sid",
		secret: process.env.SESSION_SECRET,
		saveUninitialized: false /* Forces a session that is "uninitialized" to be saved to the store.  */,
		cookie: { maxAge: threehours },
		resave: false /* Forces the session to be saved back to the session store, even if the session was never modified during the request. */,
	})
)

const homeRouter = require("./routes/home")
app.use("/", homeRouter)
app.use("/home", homeRouter)

const signupRouter = require("./routes/signup")
app.use("/signup", signupRouter)

const loginRouter = require("./routes/login")
app.use("/login", loginRouter)

const logoutRouter = require("./routes/logout")
app.use("/logout", logoutRouter)

app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}`)
})
