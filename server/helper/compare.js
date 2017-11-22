module.exports = function(password,hash){
  let bcrypt = require('bcrypt')
  return new Promise(function(resolve,reject){
    bcrypt.compare(password, hash, function(err, res) {
      if(res) {
        resolve(res)
      } else {
        reject(err)
      }
    });
  })
}
