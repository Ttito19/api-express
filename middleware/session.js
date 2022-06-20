const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { usersModel } = require("../models");
const authMiddleware = async (req, res, next) => {
    try {
        //validaciòn si no hay cabecera de autorizaciòn
        if (!req.headers.authorization) {
            handleHttpError(res, "NEED_SESSION", 401);
        }
        // obtiene el token sin la palabra bearer 
        const token = req.headers.authorization.split(" ").pop();

        // descifra el token
        const dataToken = await verifyToken(token);
        if (!dataToken._id) {
            handleHttpError(res, "ERROR_ID_TOKEN", 401);
        }
        //para saber quien es el usuario
        const user = await usersModel.findById(dataToken._id);
        req.user = user
        //si hay token entonces que pase
        next();
    } catch (e) {
        console.log(e);
        handleHttpError(res, "NOT_SESSION", 401);
    }
}

module.exports = authMiddleware;