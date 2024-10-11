
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
        const userId = req.user.id
        const { jobId } = req.body;
        let resumeUrl;
        if(req.file){
            resumeUrl = req.file.path;
        } else {
            return res.status(400).json({
                success: false,
                message: 'Resume not found',
            });
        }
         // This is the Cloudinary URL

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
            message: 'Failed to add application',
            error: error.message,
        });
    }
}
const updateApplication = async (req, res) => {
    console.log(req.user);
    try {
        let updateData = {};

        if (req.file) {
            console.log('Uploaded File:', req.file); 
            updateData.resume = req.file.path; 
        }

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
            message: 'Unable to update application',
            error: error.message || error
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