const express = require('express');
const { getAllUsers, getUserById, addUser, updateUser, deleteUser } = require('../controllers/userController');
const { uploadImage } = require('../midlleware/handlUpload');
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', uploadImage.single('profileImage'), addUser);
router.patch('/:id', uploadImage.single('profileImage'), updateUser);
router.delete('/:id', deleteUser);

module.exports = router