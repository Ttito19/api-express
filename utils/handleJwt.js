const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
/**
 * debes pasar el objeto del usuario
 * @param {*} user 
 */
const tokenSing = async (user) => {
    const sign = jwt.sign(
        {
            _id: user._id,
            role: user.role
        },
        JWT_SECRET, {
        expiresIn: "2h",
    }
    )
    return sign;
}
/**
 * Debes de pasar el token de sesion el JWT
 * @param {*} tokenjwt 
 * 
 */
const verifyToken = async (tokenjwt) => {
    try {
        return jwt.verify(tokenjwt, JWT_SECRET);
    } catch (e) {
        return null;
    }
}
module.exports = { tokenSing, verifyToken }