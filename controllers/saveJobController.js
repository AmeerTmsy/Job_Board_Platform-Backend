
const SavedJob = require('../models/saveJobModel');

// Controller methods
const getSavedJobs = async (req, res) => {
    try {
        const savedJobs = await SavedJob.find({});
        res.status(200).json({
            success: true,
            data: savedJobs
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to fetch your saved jobs list' 
        });
    }
}
const getSavedJobById = async (req, res) => {
    try {
        const savedJob = await SavedJob.findById(req.params.id);
        if (!savedJob) {
            return res.status(400).json({
                success: false,
                message: 'Job not found' 
            });
        }
        res.status(200).json({
            success: true,
            data: savedJob
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to fetch your saved jobs list' 
        });
    }
}
const saveJob = async (req, res) => {
    try {
        const savedJobExist = await SavedJob.findOne({jobId: req.body.jobId});
        if (savedJobExist) {
            return res.status(400).json({
                success: false,
                message: 'Already saved' 
            });
        }
        
        const savedJob = new SavedJob(req.body);
        await savedJob.save();
        res.status(201).json({
            success: true,
            data: savedJob,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to save job'
        });
    }
}

const removeSavedJob = async (req, res) => {
    try {
        const savedJob = await SavedJob.findByIdAndDelete(req.params.id);
        if (!savedJob) {
            return res.status(400).json({
                success: false,
                message: 'Job not found' 
            });
        }
        res.status(200).json({ 
            success: true,
            message: 'Job unsaved successfully' 
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'error while removing job'
        });
    }
}

module.exports = {
    getSavedJobs,
    getSavedJobById,
    saveJob,
    removeSavedJob
}