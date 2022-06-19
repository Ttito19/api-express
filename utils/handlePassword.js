const bcryptjs = require("bcryptjs");

/**
 * 
 * @param {*} passwordPlain; 
 */
const encrypt = async (passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 12);
    return hash;
}

/**
 * Pasar contraseñas sin encriptar y pasar contraseñas encriptadas
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */
const compare = async (passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword);

}

module.exports = { encrypt, compare };