let mongoose = require('mongoose')
let Schema = mongoose.Schema

let transactionsSchema = new Schema(
  {
    member: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    days: Number,
    out_date: {
      type: Date,
      default: Date.now
    },
    due_date: {
      type: Date,
      default: Date.now
    },
    in_date: {
      type: Date,
      default: Date.now
    },
    fine: Number,
    booklist: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book'
      }
    ]
  }
)

let Transaction = mongoose.model('Transaction',transactionsSchema)
module.exports = Transaction
