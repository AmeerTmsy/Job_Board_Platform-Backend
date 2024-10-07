const express = require('express');
const { getAllEmployers, getEmployerById, addEmployer, updateEmployer, deleteEmployer } = require('../controllers/employerController');
const { uploadProfileImage } = require('../midlleware/handlUpload');
const router = express.Router();

router.get('/', getAllEmployers);
router.get('/:id', getEmployerById);
router.post('/', uploadProfileImage.single('profileImage'), addEmployer);
router.patch('/:id', uploadProfileImage.single('profileImage'), updateEmployer);
router.delete('/:id', deleteEmployer);

module.exports = router