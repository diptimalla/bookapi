require("dotenv").config();

//framework
const express =require("express");
const mongoose  = require('mongoose');

//database
const database=require("./database/index");


//models
const BookModel=require("./database/book")
const AuthorModel=require("./database/author")
const PublicationModel=require("./database/publication")

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


//to get all book api
shapeAI.get("/" ,async (req , res) =>{
    const getAllBooks =await BookModel.find();
    return res.json({books: getAllBooks });
});

shapeAI.get("/is/:isbn",async (req,res)=>{
    const getSpecificBook= await BookModel.findOne(({ISBN:req.params.isbn}))
    
    if(!getSpecificBook){
        return res.json({
            error: `No book found for the ISBN of ${req.params.isbn}`,
        });
    }
    return res.json({book: getSpecificBook});
});

//get specific books based on category
shapeAI.get("/c/:category" ,async (req, res) =>{
    //const getSpecificBooks= database.books.filter((book) => book.category.includes(req.params.category)
  //  );
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


shapeAI.post("/book/new", (req ,res)=>{
const {newBook } =req.body;
database.books.push(newBook);
return res.json ({ books: database.books, message: "book was added!"});
});


shapeAI.post("/author/new" ,(req,res )=> {
    const {newAuthor } =req.body;
    database.authors.push(newAuthor);
    return res.json ({ authors: database.authors, message: "author was added!"});
});

shapeAI.post("/publication/new" , (req,res) =>{
    const {newPublication } =req.body;
    database.publications.push(newPublication);
    return res.json ({ publications: database.publications, message: "publication was added!"});
});

//UPDATING title of book 
shapeAI.put("/book/update/:isbn" , (req ,res)=> {
     database.books.forEach((book) => {
         if(book.ISBN=== req.params.isbn){
             book.title = req.body.bookTitle;
             return;
         }
     });
     return res.json ({ books: database.books});
});

shapeAI.put("/book/author/update/:isbn" , (req ,res) =>{
database.books.forEach((book) =>{
 if(book.ISBN === req.params.isbn)
 return book.authors.push(req.body.newAuthor);
});
database.authors.forEach((author) =>{
    if(author.id=== req.body.newAuthor)
    return author.books.push(req.params.isbn);
});
return res.json({books: database.books , authors:database.authors ,message:"new author was added!!" });
});


//  update/add new book o publication
shapeAI.put("/publication/update/book/:isbn" , (req, res)=> {
    database.publications.forEach((publication)=>{
        if(publication.id === req.body.pubID){
            return publication.books.push(req.params.isbn);
        }
    });
database.books.forEach((book) =>{
    if (book.ISBN === req.params.isbn) {
        book.publication = req.body.pubID;
        return;
    }
});
return res.json({books:database.books , publications:database.publications, message: "successfully updated publication"});
});

//delete a book
shapeAI.delete("/book/delete/:isbn" ,(req,res)=>{
    const updatedBookDatabase = database.books.filter((book) => book.ISBN !== req.params.isbn);

database.books = updatedBookDatabase;
return res.json({ books: database.books});
});

//deleting author from book
shapeAI.delete("/book/delete/author/:isbn/:authorId", (req,res)=> {
    database.books.forEach((book) =>{
        if (book.ISBN === req.params.isbn) {
            const newAuthorList = book.authors.filter(
                (author)=> author !== parseInt(req.params.authorId));
            book.authors = newAuthorList;
            return;
        }
    });
    database.authors.forEach((author)=> {
        if(author.id === parseInt(req.params.authorId)){
            const newBooksList = author.books.filter((book)=>book !== req.params.isbn);
            author.books = newBooksList;
            return;
        }
    return res.json({book: database.books, author: database.authors, message:"author deleted"});
    });
});

//deleting a book from publication
shapeAI.delete("/publication/delete/book/:isbn/:pubId", (req,res)=>{
    database.publications.forEach((publication) =>{
        if(publication.id === parseInt(req.params.pubId)){
            const newBooksList =publication.books.filter(
                (book)=> book !== req.params.isbn);
                publication.books = newBooksList;
                return;
        }
    });
    database.books.forEach((book)=>{
        if(book.ISBN ===req.params.isbn){
            book.publication=0;
            return;
        }
    });
    return res.json({books:database.books, publication:database.publications, message:"book deleted"})
});


shapeAI.listen(3000 , () =>console.log("server running"));