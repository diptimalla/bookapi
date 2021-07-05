//prefix --> /book

const Router = require("express").Router();

//database models
const BookModel = require("../../database/book");

/*to get all book api
Route           |  /is
Description     |  get all books
Access          |  public
Parameters      |  none
Method          |  GET
*/

Router.get("/" ,async (req , res) =>{
    const getAllBooks =await BookModel.find();
    return res.json({books: getAllBooks });
});

/*to get specific book
Route           |  /is
Description     |  get specific book based on isbn
Access          |  public
Parameters      |  isbn
Method          |  GET
*/
Router.get("/is/:isbn",async (req,res)=>{
    const getSpecificBook= await BookModel.findOne(({ISBN:req.params.isbn}))
    
    if(!getSpecificBook){
        return res.json({
            error: `No book found for the ISBN of ${req.params.isbn}`,
        });
    }
    return res.json({book: getSpecificBook});
});

/*to get specific book based on category
Route           |  /c
Description     |  get specific book based on a a category
Access          |  public
Parameters      |  category
Method          |  GET
*/

Router.get("/c/:category" ,async (req, res) =>{
    const getSpecificBooks = await BookModel.findOne({
        category: req.params.category,
    });
    if(!getSpecificBooks){
        return res.json({
            error: `No book found for the category of ${req.params.category}`,
        });
    }
    return res.json({book: getSpecificBooks});
});

/*to add new book
Route           |  /book/new
Description     |  add new books
Access          |  public
Parameters      |  none
Method          |  POST
*/

Router.post("/new", async (req ,res)=>{
    try {
        const {newBook } =req.body;
    const addNewBook = await BookModel.create(newBook);
    return res.json ({ message: "book was added!"});

    } catch (error) {
      return res.json({ error : error.message})
    }
});  
/*to update title of book
Route           |  /book/update
Description     |  update title of book
Access          |  public
Parameters      |  isbn
Method          |  PUT
*/

Router.put("/update/:isbn" ,async (req ,res)=> {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn,
        },
        {
            title:req.body.bookTitle,
        },
        {
            new:true,
        }
        
    );
     return res.json ({ books: updatedBook});
});

/*to update author of book
Route           |  /book/author/update
Description     |  update/add new author
Access          |  public
Parameters      |  isbn
Method          |  PUT
*/
Router.put("/author/update/:isbn" ,async (req ,res) =>{
    const updatedBook = await BookModel.findOneAndUpdate(
        {ISBN : req.params.isbn
        },
        {
             $addToSet :{
                 authors :req.body.newAuthor
             }
        },
        {
            new:true
        }
        ); 
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
        id : req.body.newAuthor,
        },
        {
            $addToSet:{
                books :req.params.isbn
            }
        },
        {
            new:true
        }
    );
        return res.json({books: updatedBook , authors: updatedAuthor, message: "new author was added"});
    });

  
/*deleting author from book
Route           |  /book/delete/author
Description     |  delete a author from book
Access          |  public
Parameters      |  isbn , author id
Method          |  DELETE
*/
  Router.delete("/delete/author/:isbn/:authorId",async (req,res)=> {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
        ISBN: req.params.isbn
        },
        {
            $pull:{
                authors:parseInt(req.params.authorId)
            }
        },
        {
            new:true
        }
    );
    
     //   database.books.forEach((book) =>{
      //      if (book.ISBN === req.params.isbn) {
      //          const newAuthorList = book.authors.filter(
      //              (author)=> author !== parseInt(req.params.authorId));
      //          book.authors = newAuthorList;
      //          return;
      //      }
     //   });
      //  database.authors.forEach((author)=> {
       //     if(author.id === parseInt(req.params.authorId)){
        //        const newBooksList = author.books.filter((book)=>book !== req.params.isbn);
       //         author.books = newBooksList;
       //         return;
        //    }
    const updatedAuthor= await AuthorModel.findOneAndUpdate(
        {
            id :parseInt(req.params.authorId)
        },
        {
            $pull :{
                books:req.params.isbn
            }
        },
        {
            new:true
        }
        );
        return res.json({book: updatedBook, author: updatedAuthor, message:"author deleted"});
    });

//delete a book
Router.delete("/book/delete/:isbn" ,async (req,res)=>{
    const updatedBookDatabase = await BookModel.findOneAndDelete({
        ISBN :req.params.isbn,
    });
    
 return res.json({ books: updatedBookDatabase});
    });


module.exports = Router;
