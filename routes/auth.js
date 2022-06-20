const express = require("express");
const { LoginCtrol,RegisterCtrol } = require("../controllers/auth");
const router = express.Router();
const { validatorRegisterItem, validatorLoginItem } = require("../validators/auth");
/**
 * 
 * CREAR ITEM
 * 
 */ 
//TODO http://localhost/auth/login
//TODO http://localhost/auth/register

router.post("/register", validatorRegisterItem, RegisterCtrol);

router.post("/login", validatorLoginItem, LoginCtrol);

module.exports = router
