let express = require('express')
let router = express.Router()
let transactionsController = require('../controllers/transactionsController.js')

// Insert new document into transactions collection
router.post('/',transactionsController.insertDataTransactions)

// Find all documents in transactions collection
router.get('/',transactionsController.findAllTransactions)

// Update a document by id
router.put('/:id',transactionsController.updateTransactionsById)

// Delete a document by id
router.delete('/:id',transactionsController.removeTransactionsById)

module.exports = router
