const express = require("express")
const cors = require("cors")
const app = express()


app.use(express.json(), express.urlencoded({ extended: true }), cors());
require("dotenv").config()
require("./config/mongoose.config")

const port = process.env.PORT

const Routes = require("./routes/auth.route")
const bookRoutes=require("./routes/book.route")

Routes(app)
bookRoutes(app)

app.listen(port, () => {
    console.log(`>>>>> Server is running on Port ${port} 🎈🎈🎈`)
})