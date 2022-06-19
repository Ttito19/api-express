const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");


const validatorLoginItem = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),
    (req, res, next) => {
        return validateResults(req, res, next);
    }

]

const validatorRegisterItem = [
    check("name").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("age").exists().notEmpty().isNumeric(),
    check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),
    check("email").exists().notEmpty().isEmail(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }

]

module.exports = { validatorRegisterItem, validatorLoginItem };