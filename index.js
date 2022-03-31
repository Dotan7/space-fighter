const express = require("express")
const http = require("http")
const app = express()
const path = require("path")
const server = http.createServer(app)

app.use(express.static(path.join(__dirname, "./client")))

const PORT = process.env.PORT || 1002
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
