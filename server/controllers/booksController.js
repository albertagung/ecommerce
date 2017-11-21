let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongoose_crud', {
  useMongoClient: true
});
let Book = require('../models/booksModel.js')

// Insert new document into books library
let insertDataBooks = function(req,res){
  let newBook = Book(
    {
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: req.body.stock
    }
  )
  newBook.save().then(function(dataBooks){
    res.send(dataBooks)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

// Find all documents in books library
let findAllBooks = function(req,res){
  Book.find().then(function(dataBooks){
    res.send(dataBooks)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

// Update a document by id
let updateBookById = function(req,res){
  Book.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: req.body.stock
    }
  ).then(function(dataBooks){
    res.send(dataBooks)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

// Delete a document by id
let removeBookById = function(req,res){
  Book.findOneAndRemove(
    {
      _id: req.params.id
    }
  ).then(function(dataBooks){
    res.send(dataBooks)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

module.exports = {
  insertDataBooks,
  findAllBooks,
  updateBookById,
  removeBookById
}
