const express = require('express');
const { 
    getAllApplications, 
    getApplicationById, 
    addApplication, 
    updateApplication, 
    deleteApplication
 } = require('../controllers/applicationController');
const { 
    uploadResume
 } = require('../midlleware/handlUpload');
const { checkLogin } = require('../midlleware/checkLogin');

const router = express.Router();

router.get('/', checkLogin, checkLogin, getAllApplications);
router.get('/:id', checkLogin, getApplicationById);
router.post('/', checkLogin, uploadResume.single('resume'), addApplication);  // Multer middleware added here
router.patch('/:id', checkLogin, uploadResume.single('resume'), updateApplication); // For updating with resume
router.delete('/:id', checkLogin, deleteApplication);

module.exports = router
