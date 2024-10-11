
const SavedJob = require('../models/saveJobModel');
const Job = require('../models/jobModel');

// Controller methods
const getSavedJobs = async (req, res) => {
    try {
        const { id } = req.user

        revomeUnavailableJobsFromSave(id)

        const savedJobs = await SavedJob.find({ userId: id }).populate("jobs.jobId");

        if (!savedJobs) return res.status(400).json({
            success: false,
            message: 'Nothing found as saved jobs'
        });

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

// const getSavedJobById = async (req, res) => {
//     try {
//         const savedJob = await SavedJob.findById(req.params.id);
//         if (!savedJob) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Job not found' 
//             });
//         }
//         res.status(200).json({
//             success: true,
//             data: savedJob
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: 'Unable to fetch your saved jobs list' 
//         });
//     }
// }

const saveJob = async (req, res) => {
    // console.log(req.body)
    const { jobId, jobTitle } = req.body
    const userId = req.user.id

    try {
        const jobActive = await Job.findOne({ _id: jobId });

        if (!jobActive) {
            return res.status(400).json({
                success: false,
                message: "Job doesn't exist",
            });
        }

        let savedJob = await SavedJob.findOne({ userId })
        if (!savedJob) savedJob = new SavedJob({ userId, jobs: [] });

        const alreadySaved = savedJob.jobs.some(item => item.jobId.equals(jobId))
        if (alreadySaved) return res.status(400).json({ success: false, message: "Job already saved" })

        // console.log('jobId - ',jobId,' jobTitle - ', jobTitle);
        savedJob.jobs.push({ jobId, jobTitle })
        savedJob.TotalJobSaved();
        await savedJob.save()

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
    const savedJobId = req.params.id
    const userId = req.user.id

    try {
        const savedJobExist = await SavedJob.findOne({ userId });
        if (!savedJobExist) {
            return res.status(400).json({
                success: false,
                message: 'Not saved any jobs'
            });
        }

        savedJobExist.jobs = savedJobExist.jobs.filter(item => !item.jobId.equals(savedJobId))

        savedJobExist.TotalJobSaved()
        await savedJobExist.save()

        console.log(savedJobExist);
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
    saveJob,
    removeSavedJob,
    // getSavedJobById,
}

const revomeUnavailableJobsFromSave = async (id) => {
    let savedJob = await SavedJob.findOne({ userId: id });
    if (savedJob) {
        const jobs = await Promise.all(savedJob.jobs.map(async (item) => {
            const jobActive = await Job.findOne({ _id: item.jobId });
            if (jobActive) return item;
            return null;
        }));

        savedJob.jobs = jobs.filter(item => item !== null);
        await savedJob.save();
    }
}