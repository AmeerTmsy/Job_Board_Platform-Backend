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

const router = express.Router();

router.get('/', getAllApplications);
router.get('/:id', getApplicationById);
router.post('/', uploadResume.single('resume'), addApplication);  // Multer middleware added here
router.patch('/:id', uploadResume.single('resume'), updateApplication); // For updating with resume
router.delete('/:id', deleteApplication);

module.exports = router