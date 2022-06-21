const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { usersModel } = require("../models");
const getProperties=require("../utils/handlePropertiesEngine");
const propertieKey=getProperties();
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

        if(!dataToken){
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
            return;
        }
        const query ={
            [propertieKey.id]:dataToken[propertieKey.id]
        }

        //para saber quien es el usuario
        const user = await usersModel.findOne(query);
        req.user = user
        //si hay token entonces que pase
        next();
    } catch (e) {
        console.log(e);
        handleHttpError(res, "NOT_SESSION", 401);
    }
}

module.exports = authMiddleware;