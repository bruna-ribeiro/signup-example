const pgp = require("pg-promise")()

const user = process.env.PG_USER || "postgres"
const password = process.env.PG_PASSWORD || "post1"
const host = process.env.PG_HOST || "localhost"
const pgPort = process.env.PG_PORT || 5432
const database = "mcoffee"

const connection = `postgres://${user}:${password}@${host}:${pgPort}/${database}`

const db = pgp(connection)

module.exports = db
