const express = require("express");
const router = express.Router();
const uploadMiddleware= require("../utils/handleStorage");
const {createItem}=require("../controllers/storage");
//TODO http://localhost:3000/api/storage

//uploadMiddleware.single()
//uploadMiddleware.multi()
router.post("/", uploadMiddleware.single("myfile",createItem));

module.exports = router;