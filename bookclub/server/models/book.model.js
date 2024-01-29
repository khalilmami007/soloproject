const mongoose=require("mongoose");

const Books=new mongoose.Schema(
    {
        title:{
            type:String,
            require:[true,"title is required"]
        },
        description:{
            type:String,
            require:[true,"description is required"],
            minlength:[5,"description mus be at least 5 characters"],

        }
    },{timestamps:true}
);


const BooksSchema=mongoose.model("BookSchema",Books)
module.exports = BooksSchema;