const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");
const { validatorCreateItem, validatorGetItem } = require("../validators/tracks")
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks")

//TODO http://localhost/tracks GET, POST,DELETE, PUT

/**
 * 
 * LISTAR ITEMS
 * 
 */
router.get("/", authMiddleware, getItems)
/**
 * 
 * CREAR ITEM
 * 
 */
router.post("/", authMiddleware, checkRol(["admin"]), validatorCreateItem, createItem)
/**
 * 
 * OBTENER DETALLE DE ITEM
 * 
 */
router.get("/:id", authMiddleware, validatorGetItem, getItem)

/**
* 
* ACTUALIZAR ITEM
* 
*/
router.put("/:id", authMiddleware, validatorCreateItem, validatorGetItem, updateItem)
/**
* 
* DELETE ITEM
* 
*/
router.delete("/:id", validatorGetItem, deleteItem)





module.exports = router
