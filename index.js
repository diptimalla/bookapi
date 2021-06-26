//framework
const express =require("express");

//database
const database=require("./database/index");

//initializing express
const shapeAI = express();

//configurations
shapeAI.use(express.json());

//to get all book api
shapeAI.get("/" , (req , res) =>{
    return res.json({books: database.books });
});

shapeAI.get("/is/:isbn", (req,res)=>{
    const getSpecificBook= database.books.filter((book) => book.ISBN === req.params.isbn);
    if(getSpecificBook.length ===0){
        return res.json({
            error: `No book found for the ISBN of ${req.params.isbn}`,
        });
    }
    return res.json({book: getSpecificBook});
});

//get specific books based on category
shapeAI.get("/c/:category" , (req, res) =>{
    const getSpecificBooks= database.books.filter((book) => book.category.includes(req.params.category)
    );
    if(getSpecificBooks.length ===0){
        return res.json({
            error: `No book found for the category of ${req.params.category}`,
        });
    }
    return res.json({book: getSpecificBooks});
});

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

//to get all authors
shapeAI.get("/author", (req, res) => {
return res.json({authors: database.authors});
});

// to get list of authors based on a books isbn
shapeAI.get("/author/:isbn" ,(req , res) =>{
    const getSpecificAuthors = database.authors.filter((author)=>
    author.books.includes(req.params.isbn));
    if(getSpecificAuthors.length ===0){
        return res.json({
            error :`No author found for the book ${req.params.isbn}`,
        });
    }
    return res.json({ authors: getSpecificAuthors});
});

//all publications
shapeAI.get("/publications", (req, res) =>{
    return res.json({publications: database.publications});
});

shapeAI.listen(3000 , () =>console.log("server running"));