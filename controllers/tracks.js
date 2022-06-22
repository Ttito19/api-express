const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
/**
 * Obtener lista 
 * @param {*} req 
 * @param {*} res 
 */
 const getItems = async (req, res) => {
    try {
        const user=req.user;//esto solo se obtiene si hay un token 
    
        const data = await tracksModel.findAllData({});
        res.send({ data,user });
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEMS");
    }

}
/**
 * Obtener un detalle 
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {

    try {
        req = matchedData(req);
        const { id } = req;
        const data = await tracksModel.findOneData(id)
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEMS_DETAILS")
    }

}
/**
 * Insertar un registro 
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res, next) => {

    try {
        // const body=req.body

        //matchedData me ayuda a validar en caso intenten
        // agregar un parametro que no està en el modelo
        // const bodyClean=matchedData(req)
        // req = matchedData(res);
        // res.send({ body,bodyClean })

        req = matchedData(req);
        console.log(req);
        const data = await tracksModel.create(req);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_CREATE_ITEMS");
    }


}
/**
 * Actualizar registro 
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {

    try {
      // const { body } = matchedData(req);
        const {id, ...body}=matchedData(req);
        const data = await tracksModel.findOneAndUpdate(id,body)
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR_UPDATE_ITEMS");
    }

}
/**
 * Eliminar registro 
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => { 

    try {
        req = matchedData(req);
        const { id } = req;

        // deleteOne elimina el registo
         // delete hace un elimnado logico, no lo elimina de la base de datos
        const data = await tracksModel.delete({_id:id})
        res.send({ data })
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_DELETE_ITEM")
    }

}



module.exports = { getItems, getItem, createItem, updateItem, deleteItem };