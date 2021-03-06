const express = require("express")
const server = express();
const booksRouter = require("./src/books")
const commentsRouter = require("./src/comments")
const cors = require("cors")



// var whitelist = ['http://localhost:3000','https://localhost:3000']
// var corsOptions = {
//   origin: function (origin, callback) {
//     console.log(origin)
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

server.use(express.json())
// server.use(cors(corsOptions))
server.use("/books", booksRouter)
server.use("/comments", commentsRouter)

const port = process.env.PORT || 7000
server.listen(port, () => {
    console.log("I'm listening on port " + port)
})