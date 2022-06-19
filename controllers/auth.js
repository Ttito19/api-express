const { matchedData } = require("express-validator");
const { tokenSing } = require("../utils/handleJwt");
const { encrypt, compare } = require("../utils/handlePassword");
const { usersModel } = require("../models");
const loginCtrol = async (req, res) => {

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
}

module.exports = { loginCtrol }