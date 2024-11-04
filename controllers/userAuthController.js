const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const { tokenCreat, cookieSafetyMeasures } = require("../midlleware/tokenCookie")

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email });
        // console.log(user);
        
        
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "login failed, looks like it is not your email"
            })
        }

        const passMatch = bcrypt.compareSync(password, user.password);
        if (!passMatch) {
            return res.status(400).json({
                success: false,
                message: "login failed, password is incourrect"
            })
        }

        const token = await tokenCreat(user)
        res.cookie('token', token, cookieSafetyMeasures)
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                id: user._id, 
                name: user.name, 
                email: user.email, 
                userType: user.userType,
                profileImage: user.profileImage
            }
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "login failed"
        })
    }
}

const userVerify = async (req, res) => {
    let data;
    if(req.user) data = req.user
    if(req.employer) data = req.employer
    if(req.admin) data = req.admin
    console.log(data)
    res.status(200).json({
        success: true,
        message: "autherised access",
        data : data
    })
}

const userlogout = async (req, res) => {
    console.log("userlogout")
    res.clearCookie('token', { path: '/' });
    res.clearCookie('refreshToken', { path: '/' });
    res.status(200).send({ 
        success: true,
        message: 'Logout successful'
     });
}

module.exports = {
    userLogin,
    userVerify,
    userlogout
}