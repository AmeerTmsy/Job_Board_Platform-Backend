
const Application = require('../models/applicationModel');

// Controller methods
const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find({});
        res.status(200).json({
            success: true,
            data: applications
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to fetch applications' 
        });
    }
}
const getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(400).json({
                success: false,
                message: 'Application not found' 
            });
        }
        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to fetch application' 
        });
    }
}
const addApplication = async (req, res) => {
    try {
        const { jobId, userId } = req.body;
        const resumeUrl = req.file.path; // This is the Cloudinary URL

        // Create a new application object
        const newApplication = new Application({
            jobId,
            userId,
            resume: resumeUrl, // Save the Cloudinary URL in the database
        });

        // Save the new application to the database
        await newApplication.save();

        res.status(201).json({
            success: true,
            data: newApplication,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to upload application',
            error: error.message,
        });
    }
}
const updateApplication = async (req, res) => {
    try {
        const { jobId, userId } = req.body;
        const updateData = { jobId, userId };

        // Check if a new resume is being uploaded
        if (req.file) updateData.resume = req.file.path;  // If a new file is uploaded, update resume URL

        const updatedApplication = await Application.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedApplication) {
            return res.status(404).json({ 
                success: false,
                message: 'Application not found'
             });
        }

        res.status(200).json({
            success: true,
            data: updatedApplication
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            message: 'Unable to update application'
         });
    }
}
const deleteApplication = async (req, res) => {
    try {
        const deletedApplication = await Application.findByIdAndDelete(req.params.id);
        if (!deletedApplication) {
            return res.status(400).json({
                success: false,
                message: 'Application not found' 
            });
        }
        res.status(200).json({ 
            success: true,
            message: 'Application deleted successfully' 
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to delete application'
        });
    }
}

module.exports = {
    getAllApplications,
    getApplicationById,
    addApplication,
    updateApplication,
    deleteApplication,
}