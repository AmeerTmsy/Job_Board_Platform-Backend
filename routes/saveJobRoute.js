const express = require('express');
const { getSavedJobs, getSavedJobById, saveJob, removeSavedJob } = require('../controllers/saveJobController');
const { checkLogin } = require('../midlleware/checkLogin');
const router = express.Router();

router.get('/',checkLogin, getSavedJobs);
// router.get('/:id', checkLogin, getSavedJobById);
router.post('/', checkLogin, saveJob);
router.delete('/:id', checkLogin, removeSavedJob);

module.exports = router