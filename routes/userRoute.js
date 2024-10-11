const express = require('express');
const { getAllUsers, getUserById, addUser, updateUser, deleteUser } = require('../controllers/userController');
const { uploadProfileImage } = require('../midlleware/handlUpload');
const { checkLogin } = require('../midlleware/checkLogin');
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', uploadProfileImage.single('profileImage'), addUser);
router.patch('/:id', checkLogin, uploadProfileImage.single('profileImage'), updateUser);
router.delete('/:id', checkLogin, deleteUser);

module.exports = router