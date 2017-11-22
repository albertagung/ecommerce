module.exports = function (password) {
  let bcrypt = require('bcrypt')
  return new Promise(function(resolve,reject){
    bcrypt.hash(password, 10, function(err, hash) {
      if(err){
        reject(err)
      }
      else{
        resolve(hash)
      }
    });
  })
};
