const { tokenCreat, cookieSafetyMeasures } = require("../midlleware/tokenCookie")
const bcrypt = require('bcrypt');
const Employer = require("../models/employerModel");
const saltRounds = 10;


const getAllEmployers = async (req, res) => {
    try {
        const employers = await Employer.find({});
        res.status(200).json({
            success: true,
            data: employers
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to get employers"
        }) 
    }
}
const getEmployerById = async (req, res) => {
    try {
        const employer = await Employer.findById(req.params.id).exec();
        return res.status(200).json({
            success: true,
            data: employer
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to the employer"
        }) 
    }
}
const addEmployer = async (req, res) => {

    try {
        const hash = bcrypt.hashSync(req.body.password, saltRounds)

        const userData = {
            ...req.body,
            password: hash
        }
        if (req.file) userData.profileImage = req.file.path; 
        
        // console.log(userData)
        const employer = new Employer(userData);
        await employer.save();
        
        const token = await tokenCreat(employer)
        res.cookie('token', token, cookieSafetyMeasures)

        return res.status(200).json({
            success: true,
            message: "Signup successful",
            data: {
                id: user._id, name: user.name, email: user.email
            }
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message:  error.code === 11000 && error.keyPattern.email ? 
            `${error.keyValue.email} is already in use` : "Unable to create account"
        })
    }
}
const updateEmployer = async (req, res) => {
    try {

        const employer = await Employer.findById(req.params.id);

        if (!employer) {
            return res.status(404).json({
                success: false,
                message: "Employer not found"
            });
        }

        if (req.file) req.body.profileImage = req.file.path;

        Object.assign(employer, req.body);
        const updatedEmployer = await user.save();

        return res.status(200).json({
            success: true,
            data: updatedEmployer,
            message: "Employer's information successfully updated",
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to update the user"
        })
    }
}
const deleteEmployer = async (req, res) => {
    res.send('delete user')
}

module.exports = {
    getAllEmployers,
    getEmployerById,
    addEmployer,
    updateEmployer, 
    deleteEmployer
}