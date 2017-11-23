let express = require('express');
let router = express.Router();
let loginController = require('../controllers/loginController.js')

router.post('/',loginController.getLogin,loginController.verifyLogin)

module.exports = router
