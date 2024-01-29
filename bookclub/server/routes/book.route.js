const bookcontroller=require("../controllers/book.controller");
const verifyToken = require("../middlewares/authMiddleware");

module.exports=(app)=>{
    app.use('/api/books', verifyToken);


    app.get("/api/book",bookcontroller.GetAllbooks)
    app.get("/api/book/:BookId", bookcontroller.FindOneSingleBook)
    app.patch("/api/book/:BookId", bookcontroller.updateExistingBook)
    app.post("/api/book", bookcontroller.CreateNewBook)
    app.delete("/api/book/:BookId", bookcontroller.deleteAnExistingBook)
}
