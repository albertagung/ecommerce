let mongoose = require('mongoose');

let Customer = require('../models/customersModel.js')
let crypt = require('../helper/crypt.js')

// Insert new document into customers collection
let insertDataCustomers = function(req,res){
  crypt(req.body.password).then(function(dataPassword){
    console.log(dataPassword);
    let newCustomer = Customer (
      {
        name: req.body.name,
        address: req.body.address,
        zipcode: req.body.zipcode,
        phone: req.body.phone,
        username: req.body.username,
        password: dataPassword,
        role: req.body.role
      }
    )
    newCustomer.validate(function(err){
      if(err){
        res.status(406).send(String(err))
      }
      else{
        newCustomer.save().then(function(dataCustomers){
          res.send(dataCustomers)
        }).catch(function(err){
          res.status(500).send(err)
        })
      }
    })
  })
}

// Find all documents in customers collection
let findAllCustomers = function(req,res){
  Customer.find().then(function(dataCustomers){
    res.send(dataCustomers)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

// Update a document by id
let updateCustomerById = function(req,res){
  Customer.findById(
    {
      _id: req.params.id
    }
  ).then(function(dataCustomers){
    dataCustomers.name = req.body.name;
    dataCustomers.memberid = req.body.memberid;
    dataCustomers.address = req.body.address;
    dataCustomers.zipcode = req.body.zipcode;
    dataCustomers.phone = req.body.phone;
    dataCustomers.validate(function(err){
      if(err){
        res.status(406).send(String(err))
      }
      else{
        dataCustomers.save().then(function(dataCustomers){
          res.send(dataCustomers)
        }).catch(function(err){
          res.status(500).send(err)
        })
      }
    })
  })
}

// Delete a document by id
let removeCustomerById = function(req,res){
  Customer.findOneAndRemove(
    {
      _id: req.params.id
    }
  ).then(function(dataCustomers){
    res.send(dataCustomers)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

module.exports = {
  insertDataCustomers,
  findAllCustomers,
  updateCustomerById,
  removeCustomerById
}
