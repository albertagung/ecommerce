let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongoose_crud', {
  useMongoClient: true
});
let Transaction = require('../models/transactionsModel.js')

// Insert new document into transactions collection
let insertDataTransactions = function(req,res){
  let date = new Date()
  let dueDate = date.setDate(date.getDate() + parseInt(req.body.days))
  let newTransaction = Transaction(
    {
      member: req.body.member,
      days: req.body.days,
      out_date: Date(),
      due_date: dueDate,
      fine: 0,
      booklist: req.body.booklist
    }
  )
  newTransaction.save().then(function(dataTransactions){
    res.send(dataTransactions)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

// Find all documents in transactions collection
let findAllTransactions = function(req,res){
  Transaction.find().populate('member').populate('booklist').exec().then(function(dataTransactions){
    res.send(dataTransactions)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

// Update a document by id
let updateTransactionsById = function(req,res){
  Transaction.findById(
    {
      _id: req.params.id
    }
  ).then(function(dataTransactions){
    let date = new Date(dataTransactions.due_date)
    let returnDate = new Date(req.body.in_date)
    let sumFine = 1000 * (returnDate.getDate() - date.getDate())
    if(sumFine < 0){
      sumFine = 0
    }
    dataTransactions.fine = sumFine;
    dataTransactions.days = req.body.days;
    dataTransactions.in_date = new Date(req.body.in_date);
    dataTransactions.save().then(function(dataTransactions){
      res.send(dataTransactions)
    }).catch(function(err){
      res.status(500).send(err)
    })
  })
}

// Delete a document by id
let removeTransactionsById = function(req,res){
  transactions.findOneAndRemove(
    {
      _id: req.params.id
    }
  ).then(function(dataTransactions){
    res.send(dataTransactions)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

module.exports = {
  insertDataTransactions,
  findAllTransactions,
  updateTransactionsById,
  removeTransactionsById
}
