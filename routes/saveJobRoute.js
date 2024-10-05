const express = require('express');
const { getSavedJobs, getSavedJobById, saveJob, removeSavedJob } = require('../controllers/saveJobController');
const router = express.Router();

router.get('/', getSavedJobs);
router.get('/:id', getSavedJobById);
router.post('/', saveJob);
router.delete('/:id', removeSavedJob);

module.exports = router