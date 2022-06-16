const { storageModel } = require("../models");
/**
 * Obtener lista 
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {

    const data = await storageModel.find({})
    res.send({ data })
}
/**
 * Obtener un detalle 
 * @param {*} req 
 * @param {*} res 
 */
const getItem = (req, res) => { }
/**
 * Insertar un registro 
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    const { body, file } = req;
    console.log(file);
    //const data= await storageModel.create(body)
    res.send(file)

}
/**
 * Actualizar registro 
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = (req, res) => { }
/**
 * Eliminar registro 
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = (req, res) => { }



module.exports = { getItems, getItem, createItem, updateItem, deleteItem };