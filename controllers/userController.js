const User = require("../models/userModel")
const { tokenCreat, cookieSafetyMeasures } = require("../midlleware/tokenCookie")
const bcrypt = require('bcrypt');
const saltRounds = 10;


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to get users"
        }) 
    }
}
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).exec();
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to the user"
        }) 
    }
}
const addUser = async (req, res) => {

    try {
        const hash = bcrypt.hashSync(req.body.password, saltRounds)

        const userData = {
            ...req.body,
            password: hash
        }
        if (req.file) userData.profileImage = req.file.path; 
        
        console.log(userData)
        const user = new User(userData);
        await user.save();
        
        const token = await tokenCreat(user)
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
const updateUser = async (req, res) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (req.file) req.body.profileImage = req.file.path;

        Object.assign(user, req.body);
        const updatedUser = await user.save();

        return res.status(200).json({
            success: true,
            message: "User's information successfully updated",
            data: updatedUser,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to update the user"
        })
    }
}
const deleteUser = async (req, res) => {
    res.send('delete user')
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
}