const { handleHttpError } = require("../utils/handleError");
/**
 * Array con los roles permitidos
 * @param {*} rol 
 * @returns 
 */
const checkRol = (roles) => (req, res, next) => {
    try {
        const { user } = req; /// TODO: ME TRAE LA DATA USER
        const rolesByUser = user.role;/// TODO: ME AYUDARÀ A IDENTIFICAR QUE ROL TRAE
        //TODO:["admin","user"]
        const checkValueRol=roles.some((rolSingle)=>rolesByUser.includes(rolSingle))//TODO: me va a traer true o false
    if(!checkValueRol){
        handleHttpError(res, "USER_NOT_PERMISIONS", 403);
        return
    }
        next();
    } catch (e) {

        handleHttpError(res, "ERROR_PERMISIONS", 403)
    }
}
module.exports = checkRol