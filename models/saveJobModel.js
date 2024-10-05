const mongoose = require('mongoose');

const saveJobSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "SavedJob"
    },
}, { timestamps: true })

const SavedJob = mongoose.model('SavedJob', saveJobSchema);
module.exports = SavedJob;