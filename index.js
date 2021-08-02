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

const homeRouter = require("./routes/home")
app.use("/home", homeRouter)

const signupRouter = require("./routes/signup")
app.use("/signup", signupRouter)
app.use("/", signupRouter)

app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}`)
})
