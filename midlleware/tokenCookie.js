const jwt = require('jsonwebtoken');

const tokenCreat = async (user) =>{
    const token = await jwt.sign(
        { id: user._id, name: user.name, email: user.email, userType: user.userType },
        process.env.JWT_TOKEN,
        { expiresIn: '1h' }
    );
    return token;
}

const cookieSafetyMeasures = {
    httpOnly: true, 
    secure: process.env.ENVIRONMENT === "development" ? false : true,
    maxAge: 1 * 60 * 60 * 1000,
    sameSite: process.env.ENVIRONMENT === "development" ? 'Lax': 'None'
}

module.exports = {
    tokenCreat,
    cookieSafetyMeasures
}