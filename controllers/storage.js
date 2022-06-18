const fs = require("fs");
const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;
/**
 * Obtener lista 
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {


    try {
        const data = await storageModel.find({})
        res.send({ data })
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ITEMS")
    }


}
/**
 * Obtener un detalle 
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req)

        const data = await storageModel.findById(id)
        res.send({ data })
    } catch (error) {
        handleHttpError(res, "ERROR_DETAILS_ITEMS")
    }

}
/**
 * Insertar un registro 
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    const { body, file } = req;
    console.log(file);
    const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`
    }
    const data = await storageModel.create(fileData)
    res.send({ data })
}

/**
 * Actualizar registro 
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => { }
/**
 * Eliminar registro 
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {

    try {
        const { id } = matchedData(req);
        const datafile = await storageModel.findById(id);

        //.delete.delete({_id:id}) eliminacion recuperable->softdelete
        await storageModel.delete({_id:id});

        //.deleteOne(id) eliminacion no recuperable
       // await storageModel.deleteOne(id);
       
        //destructuraciòn, sabemos que filename està dentro de datafile 
        const { filename } = datafile;
        const filePath = `${MEDIA_PATH}/${filename}` //TODO C://MIRPOYECTO/FILE.PNG
        //fs.unlinkSync(filePath) eliminarà el archivo

        //fs.unlinkSync(filePath) elimina  el archivo  
       // fs.unlinkSync(filePath);
        const data = {
            filePath,
            deleted: 1
        }
        res.send({ data })
    } catch (e) {
        console.log(e);
        handleHttpError(res, "ERROR_DELETE_ITEMS")
    }

}



module.exports = { getItems, getItem, createItem, updateItem, deleteItem };