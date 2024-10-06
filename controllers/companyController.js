const Company = require("../models/companyModel")

const getAllCompanies = async (req, res) => {
    try {
        const companys = await Company.find({});
        res.status(200).json({
            success: true,
            data: companys
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to get all the companies"
        }) 
    }
}
const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id).exec();
        return res.status(200).json({
            success: true,
            data: company
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to get the company"
        }) 
    }
}
const addCompany = async (req, res) => {
    try {
        const company = new Company(req.body);
        await company.save();

        res.status(200).json({
            success: true,
            data: company
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to create company"
        })
    }
}
const updateCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }
        Object.assign(company, req.body);
        const updatedCompany = await company.save();

        return res.status(200).json({
            success: true,
            data: updatedCompany,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to update the company information"
        })
    }
}
const deleteCompany = async (req, res) => {
    try {
        const deletedCompany = await Company.findOneAndDelete({ _id: req.params.id });

        if (deleteJob) {
            res.status(200).json({
                success: true,
                data: deletedCompany
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Company not found'
            });
        }
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({
            success: false,
            message: 'Error removing the company'
        });
    }
}

module.exports = {
    getAllCompanies,
    getCompanyById,
    addCompany,
    updateCompany,
    deleteCompany
}