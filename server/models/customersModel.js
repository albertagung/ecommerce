let mongoose = require('mongoose')
let Schema = mongoose.Schema

// Validator min length
let minLength = [6,'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).']

let customersSchema = new Schema(
  {
    name: String,
    memberid: String,
    address: String,
    zipcode: String,
    phone: {
      type: String,
      minlength: minLength
    }
  }
)

let Customer = mongoose.model('Customer',customersSchema)
module.exports = Customer
