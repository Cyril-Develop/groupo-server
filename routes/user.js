const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const password = require('../middleware/password-control');
const email = require('../middleware/email-control');
const auth = require('../middleware/auth');
const permission = require('../middleware/permission');
const multer = require('../middleware/multer-profile');

router.post('/signup', password, email, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', auth, userCtrl.userInfos);
router.get('/', auth, userCtrl.getAllUsers);
router.put('/:id', auth, permission, multer, userCtrl.editPicture);
router.delete('/:id', auth, permission, userCtrl.deleteAccount);

module.exports = router;