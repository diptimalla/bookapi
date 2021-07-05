require("dotenv").config();

//framework
const express =require("express");
const mongoose  = require('mongoose');

//database
const database=require("./database/index");


//models
const BookModel=require("./database/book");
const AuthorModel=require("./database/author");
const PublicationModel=require("./database/publication");

//microservices route
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

//initializing express
const shapeAI = express();

//configurations
shapeAI.use(express.json());


mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(()=> console.log("connection established"));

//initializing microservices
shapeAI.use("/book",Books);
shapeAI.use("/author", Authors);
shapeAI.use("/publication",Publications);
/*get specific books based on author
shapeAI.get("/a/:author" , (req, res) =>{
    const getSpecificBookByAuthor= database.books.filter((author) => book.author.includes(req.params.authors)
    );
    if(getSpecificBookByAuthor.length ===0){
        return res.json({
            error: `No book found for the author of ${req.params.authors}`,
        });
    }
    return res.json({author: getSpecificBookByAuthor});
});*/

shapeAI.listen(3000 , () =>console.log("server running"));