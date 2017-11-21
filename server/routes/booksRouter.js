let express = require('express')
let router = express.Router()
let booksController = require('../controllers/booksController.js')

// Insert new document to books library
router.post('/',booksController.insertDataBooks)

// Find all documents in books library
router.get('/',booksController.findAllBooks)

// Update a document in books library
router.put('/:id',booksController.updateBookById)

// Delete a document in books library
router.delete('/:id',booksController.removeBookById)

module.exports = router
