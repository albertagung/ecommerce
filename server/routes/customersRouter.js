let express = require('express')
let router = express.Router()
let customersController = require('../controllers/customersController.js')

// Insert new document to customers library
router.post('/',customersController.insertDataCustomers)

// Find all documents in customers library
router.get('/',customersController.findAllCustomers)

// Update a document in customers library
router.put('/:id',customersController.updateCustomerById)

// Delete a document in customers library
router.delete('/:id',customersController.removeCustomerById)

module.exports = router
