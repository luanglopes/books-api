module.exports = {
  client: process.env.DB_DIALECT,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    filename: process.env.DB_FILE
  },
  useNullAsDefault: process.env.DB_DIALECT !== 'sqlite3'
}
