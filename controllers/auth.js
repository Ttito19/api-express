const { matchedData } = require("express-validator");
const { tokenSing } = require("../utils/handleJwt");
const { encrypt, compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError")
const { usersModel } = require("../models");

/**
 * Este controlador es el encargado de registrar un usuario
 * @param {*} req 
 * @param {*} res 
 */

const RegisterCtrol = async (req, res) => {
    try {
        req = matchedData(req);
        const password = await encrypt(req.password);
        //...req duplica en un objeto 
        const body = { ...req, password };//cambiara el password sin encriptar por el encriptado
        const dataUser = await usersModel.create(body);
        dataUser.set("password", undefined, { strict: false });

        const data = {
            token: await tokenSing(dataUser),
            user: dataUser
        }
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_REGISTER_USER")
    }

}
/**
 * Este contralador es el encargado de loguear al usuario
 * @param {*} req 
 * @param {*} res 
 */
const LoginCtrol = async (req, res) => {
    try {
        req = matchedData(req);
        //debemos traer el password para que haga una comparaciòn con el hash
        const user = await usersModel.findOne({ email: req.email }).select("password name role email");
        if (!user) {
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }
        const hashPassword = user.get("password");
        const check = await compare(req.password, hashPassword);
        if (!check) {
            //401= NO TIENES AUTORIZACIÒN
            handleHttpError(res, "PASSWORD_INVALID", 401);
        }
        //no muestrar el password en la respuesta
        user.set("password",undefined,{strict:false});
        const data = {
            token: await tokenSing(user),
            user
        }
        res.send(data);

    } catch (e) {
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

module.exports = { RegisterCtrol, LoginCtrol }