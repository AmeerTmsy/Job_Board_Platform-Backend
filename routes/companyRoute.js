const express = require('express');
const { getAllCompanies, getCompanyById, addCompany, updateCompany, deleteCompany } = require('../controllers/companyController');
const { uploadIconImage } = require('../midlleware/handlUpload');
const router = express.Router();

router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);
router.post('/', uploadIconImage.single('companyIconImage'), addCompany);
router.patch('/:id', uploadIconImage.single('companyIconImage'), updateCompany);
router.delete('/:id', deleteCompany);

module.exports = router