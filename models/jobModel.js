const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 25,
    },
    headline: {
        type: String,
        required: true,
        maxLength: 50,
    },
    description: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
        min: 0,
    },
    location: {
        type: String,
        required: true, 
    },
    jobType: {
        type: String,
        enum: ['Part-Time', 'Full-Time'], // Capitalized and hyphenated for clarity
        default: 'Full-Time',
    },
    hiring: {
        type: Boolean,
        default: true,
    },
    jobCreatedBy:{
        type: mongoose.Types.ObjectId,
        ref: "Job Creater"
    },
    verifiedJob:{
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
