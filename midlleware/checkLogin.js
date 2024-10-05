var jwt = require('jsonwebtoken');

const checkLogin = async (req, res, next) => {
    if(req.cookies.token){
        try{
            const userData = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET);
            req.user = userData
            next()
        }
        catch(error) {
            res.status(401).send({
                success: false,
                message: "Unautherised Token access"
            })
        }
    } else {
        res.status(401).send({
            success: false,
            message: "Unautherised Access"
        })
    }
}

module.exports ={
    checkLogin
}