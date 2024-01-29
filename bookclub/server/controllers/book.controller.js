const BooksSchema=require("../models/book.model");
const verifyToken=require("../middlewares/authMiddleware")



//create new book 

module.exports.CreateNewBook = (req, res) => {
    // Use the verifyToken middleware to protect this route
    verifyToken(req, res, async () => {
      try {
        // Access the user from req.user (provided by verifyToken)
        const user = req.user;
  
        // Create a new book with the user information
        const newBook = new BooksSchema({
          title: req.body.title,
          description: req.body.description,
          addedBy: user ? user.id : null, // Use user.id instead of user._id
          // other book fields...
        });
  
        // Save the new book
        const savedBook = await newBook.save();
  
        console.log(savedBook);
        res.json({ newBook: savedBook });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
  };

//read all 
module.exports.GetAllbooks = (req, res) => {
    BooksSchema.find()
    .then((allbooks)=>{
        console.log(allbooks)
        res.json(allbooks)
    })
    .catch(err=>{
        res.json({message:"wait a min",err})
    })
}


//? Read One

module.exports.FindOneSingleBook = (req, res) => {
    BooksSchema.findOne({ _id: req.params.BookId })
        .then(oneSingleBook => {
            res.json(oneSingleBook)
        })
        .catch((err) => {
            res.json(err)
        })
}


//? DELETE

module.exports.deleteAnExistingBook = (req, res) => {
    BooksSchema.deleteOne({ _id: req.params.BookId })
        .then(result => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        })
}

//? UPDATE

module.exports.updateExistingBook = (req, res) => {
    console.log(req.body);
    BooksSchema.findOneAndUpdate({ _id: req.params.BookId }, req.body, { new: true, runValidators: true })
        .then(result => {
            res.json({ "done": result })
        })
        .catch((err) => {
            res.json(err)
        })

}