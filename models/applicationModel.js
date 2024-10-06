const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Job"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    resume: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
