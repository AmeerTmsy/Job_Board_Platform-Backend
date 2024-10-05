const express = require('express');
const { getAllJobs, getJobById, addJob, updateJob, deleteJob } = require('../controllers/jobController');
const router = express.Router();

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', addJob);
router.patch('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router