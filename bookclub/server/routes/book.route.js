const bookcontroller=require("../controllers/book.controller");

module.exports=(app)=>{


    app.get("/api/book",bookcontroller.GetAllbooks)
    app.get("/api/book/:BookId", bookcontroller.FindOneSingleBook)
    app.patch("/api/book/:BookId", bookcontroller.updateExistingBook)
    app.post("/api/book", bookcontroller.CreateNewBook)
    app.delete("/api/book/:BookId", bookcontroller.deleteAnExistingBook)
}
