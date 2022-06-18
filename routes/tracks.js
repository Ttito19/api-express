const express=require("express");
const router= express.Router();
const customHeader=require("../middleware/customHeader");
const {validatorCreateItem,validatorGetItem}=require("../validators/tracks")
const {getItems,getItem,createItem,updateItem,deleteItem}=require("../controllers/tracks")

//TODO http://localhost/tracks GET, POST,DELETE, PUT

/**
 * 
 * LISTAR ITEMS
 * 
 */
 router.get("/",getItems)
/**
 * 
 * CREAR ITEM
 * 
 */
 router.post("/",validatorCreateItem,createItem)
/**
 * 
 * OBTENER DETALLE DE ITEM
 * 
 */
 router.get("/:id",validatorGetItem,getItem)

 /**
 * 
 * ACTUALIZAR ITEM
 * 
 */
  router.put("/:id",validatorCreateItem,validatorGetItem,updateItem)
 /**
 * 
 * DELETE ITEM
 * 
 */
  router.delete("/:id",validatorGetItem,deleteItem)





module.exports=router
