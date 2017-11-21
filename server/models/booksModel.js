let mongoose = require('mongoose')
let Schema = mongoose.Schema

let booksSchema = new Schema(
  {
    isbn: String,
    title: String,
    author: String,
    category: String,
    stock: Number
  }
)

let Book = mongoose.model('Book',booksSchema)
module.exports = Book
