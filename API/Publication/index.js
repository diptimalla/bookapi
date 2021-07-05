const Router = require("express").Router();

const PublicationModel = require("../../database/publication");

/*to get all publications
Route           |  /publications
Description     |  getall publications
Access          |  public
Parameters      |  none
Method          |  GET
*/
Router.get("/", (req, res) =>{
    return res.json({publications: database.publications});
});

/*to add new publication
Route           |  /publication/new
Description     |  add new publication
Access          |  public
Parameters      |  none
Method          |  POST
*/
Router.post("/new" , (req,res) =>{
    const {newPublication } =req.body;
    const addNewPublication = PublicationModel.create(newPublication);
    return res.json ({ publications: addNewPublication, message: "publication was added!"});
});

/*to update/add new book to a publication 
Route           |  /publication/update/book
Description     |  update/add new book to a publication
Access          |  public
Parameters      |  isbn
Method          |  PUT
*/
Router.put("/update/book/:isbn" , (req, res)=> {
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


/*to delete a book from publication
Route           |  /publication/delete/book
Description     |  delete a book from publication
Access          |  public
Parameters      |  isbn , publication id
Method          |  DELETE
*/
Router.delete("/delete/book/:isbn/:pubId", (req,res)=>{
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

module.exports = Router;