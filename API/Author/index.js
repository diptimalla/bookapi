const Router = require("express").Router();

const AuthorModel = require("../../database/author");

/*to get all authors
Route           |  /author
Description     |  get all authors
Access          |  public
Parameters      |  none
Method          |  GET
*/
Router.get("/",async(req, res) => {
    const getAllAuthors =await AuthorModel.find();
return res.json({authors: getAllAuthors});
});

/*to get list of author based on book's isbn
Route           |  /author
Description     |  get list of author based on book's isbn
Access          |  public
Parameters      |  isbn
Method          |  GET
*/
Router.get("/:isbn" ,(req , res) =>{
    const getSpecificAuthors = database.authors.filter((author)=>
    author.books.includes(req.params.isbn));
    if(getSpecificAuthors.length ===0){
        return res.json({
            error :`No author found for the book ${req.params.isbn}`,
        });
    }
    return res.json({ authors: getSpecificAuthors});
});

/*to add new author
Route           |  /author/new
Description     |  add new author
Access          |  public
Parameters      |  none
Method          |  POST
*/
Router.post("/new" ,(req,res )=> {
    const {newAuthor } =req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json ({ authors: addNewAuthor, message: "author was added!"});
});

module.exports = Router;