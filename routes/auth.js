const express = require("express");
const { loginCtrol } = require("../controllers/auth");
const router = express.Router();
const { validatorRegisterItem, validatorLoginItem } = require("../validators/auth");
/**
 * 
 * CREAR ITEM
 * 
 */ 
//TODO http://localhost/auth/login
//TODO http://localhost/auth/register

router.post("/register", validatorRegisterItem, loginCtrol);

router.post("/login", validatorLoginItem, loginCtrol);

module.exports = router
