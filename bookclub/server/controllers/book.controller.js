const BooksSchema=require("../models/book.model");

//create new book 
module.exports.CreateNewBook = (req, res) => {
    BooksSchema.create(req.body)
      .then(CreateBook => {
        console.log(req.body);  // Moved console.log here
        console.log(CreateBook);
        res.json({ newBook: CreateBook });
      })
      .catch(err => {
        res.json({ message: "Wait a minute", err });
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