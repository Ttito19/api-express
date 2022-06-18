const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {validatorGetItem}=require("../validators/storage")
const {getItems, createItem,updateItem,getItem,deleteItem } = require("../controllers/storage");
//TODO http://localhost:3000/api/storage



/**
 * 
 * LISTAR ITEMS
 * 
 */
router.get("/", getItems)
/**
 * 
 * CREAR ITEM
 * 
 */

//uploadMiddleware.single()
//uploadMiddleware.multi()
router.post("/", uploadMiddleware.single("myfile"), createItem);
/**
 * 
 * OBTENER DETALLE DE ITEM
 * 
 */
router.get("/:id",validatorGetItem, getItem)

/**
* 
* DELETE ITEM
* 
*/
router.delete("/:id",validatorGetItem, deleteItem)






module.exports = router;