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

        },
        addedBy: {
            type: String,  // Change the type to String
    default: null,  // Provide a default value if needed
          },
          addedByUserId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RegisterSchema', // Change this to 'RegisterSchema'
          },
        favorites: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RegisterSchema' }],
            default: [],
          },
    },{timestamps:true}
);


const BooksSchema=mongoose.model("BookSchema",Books)
module.exports = BooksSchema;