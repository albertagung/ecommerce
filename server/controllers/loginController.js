let mongoose = require('mongoose');

let Customer = require('../models/customersModel.js')
let jwt = require('jsonwebtoken')
let compare = require('../helper/compare.js')

// Get token
let getLogin = function(req,res,next){
  Customer.findOne(
    {
      'username': req.body.username
    },
    '_id username password role',
    function(err,dataCustomers){
      if(err){
        res.status(500).send(err)
      }
      else{
        compare(req.body.password,dataCustomers.password).then(function(dataResponse){
          if(dataResponse){
            jwt.sign(
              {
                id: dataCustomers._id,
                username: dataCustomers.username,
                role: dataCustomers.role
              },
              process.env.SECRET_KEY,
              function(err,token){
                if(err){
                  console.log(err);
                  res.status(500).send(err)
                }
                else{
                  req.isLogin = token
                  next()
                }
              }
            )
          }
          else{
            res.status(401).send('Incorrect Username or Password')
          }
        }).catch(function(err){
          res.status(401).send(err)
        })
      }
    }
  )
}

// Get verification
let verifyLogin = function(req,res,next){
  console.log(req.header.token);
  jwt.verify(
    req.isLogin,
    process.env.SECRET_KEY,
    function(err,decoded){
      if(err){
        res.send(err)
      }
      else{
        req.header.decoded = decoded
        res.send(decoded)
      }
    }
  )
}

// Role verification (admin only)
let verifyAdmin = function(req,res,next){
  if(req.isVerified.role === 'admin'){
    next()
  }
  else{
    res.status(401).send('You are not supposed to see what in this page broh!')
  }
}

// Role verification (by id)
let verifyById = function(req,res,next){
  if(req.isVerified.role == 'customer' || req.isVerified.role === 'admin'){
    next()
  }
  else{
    res.status(401).send('You are not supposed to see what in this page broh!')
  }
}

module.exports = {
  getLogin,
  verifyLogin,
  verifyAdmin,
  verifyById
}
