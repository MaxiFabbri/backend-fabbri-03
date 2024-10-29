import { Router } from 'express';
import { uploader } from '../uploader.js';
import ProductController from '../dao/products.controller.js';

const router = Router();
const controller = new ProductController


// funciones
const validateString = value =>{
    if (typeof(value)=='string' ) {
        return true;
    } 
    return false ;
};
const validateNumber = value =>{
    if (typeof(value)=='number' ) {
        return true;
    } 
    return false ;
};
const validateBoolean = value =>{
    if (typeof(value)=='boolean' ) {
        return true;
    } 
    return false ;
};

// Middlewares a utilizar
// chequeo que los productos que se carguen tengan todas las propiedades requeridas y que sean del tipo correcto
const checkProduct = (req,res,next) =>{
    console.log(" body: ",req.body)
    if (!req.body.hasOwnProperty('title') || !validateString(req.body.title || req.body.title == "")) {
        return res.status(404).send({ error: 'Error, title is missing or is not a String', data: [] });
    } else if (!req.body.hasOwnProperty('description') || !validateString(req.body.description || req.body.description == "")) {
       return res.status(404).send({ error: 'Error, description is missing or is not a String', data: [] });    
    } else if (!req.body.hasOwnProperty('code') || !validateString(req.body.code || req.body.code == "")) {
        return res.status(404).send({ error: 'Error, code is missing or is not a String', data: [] });
    } else if (!req.body.hasOwnProperty('price') || !validateNumber(req.body.price || req.body.price < 1)) {
        return res.status(404).send({ error: 'Error, price is missing or is not a Number', data: [] });
    } else if (!req.body.hasOwnProperty('stock') || !validateNumber(req.body.stock || req.body.stock < 1)) {
        return res.status(404).send({ error: 'Error, stock is missing or is not a Number', data: [] });
    } else if (!req.body.hasOwnProperty('category') || !validateString(req.body.category || req.body.category == "")) {
        return res.status(404).send({ error: 'Error, Category is missing or is not a String', data: [] });
    } else if (req.body.hasOwnProperty('status') && !validateBoolean(req.body.status)) {
        return res.status(404).send({ error: 'Error, status is not a Boolean', data: [] });
    };
    next();   
};

// chequeo en los PUT que la propiedad status este correcta y sino la pongo en false
const checkStatus = (req, res, next) =>{
    if (!req.body.hasOwnProperty('status') || !validateBoolean(req.body.status)) {
        req.body.status = false;
    };
    next();
};

// Endpoint POST sin archivos para usar con Postman
router.post('/', checkProduct, async (req, res) => {
    const {title, description, code, price, status, stock, category, thumbnails} = req.body 
    const newProduct = { 
        title, 
        description,
        code,
        price,
        status: status || true,
        stock,
        category,
        thumbnails
    };
    const process = await controller.add(newProduct)

    // Recuperamos la instancia global de socketServer para poder realizar un emit
    const socketServer = req.app.get('socketServer');
    socketServer.emit('products_list', newProduct )

    res.status(200).send({ error: null, data: process });
});

//Endpoint para recibir archivos desde Hanndlebars
router.post('/files', uploader.array('thumbnails', 3), async (req, res) => {
    const {title, description, code, price, status, stock, category} = req.body
    const files = req.files
    const thumbnails = files.map(thumbnail => thumbnail.originalname);   
    const newProduct = { 
        title, 
        description,
        code,
        price,
        status: status || false,
        stock,
        category,
        thumbnails
    };
    const process = await controller.add(newProduct)  
    res.status(200).send({ error: null, data: process });
});

//  Endpoint PUT con param
router.put('/:id', checkProduct, checkStatus, async (req, res) => {
    const { id }  = req.params;
    const {title, description, code, price, status, stock, category} = req.body
    const filter = {_id: id}
    const updated = {title: title, description: description, code: code, price: price, status, stock, category}
    const options = {new: true}
    const process = await controller.update(filter, updated, options);

    if (process) {
        res.status(200).send({ error: null, data: process });
    } else {
        res.status(404).send({ error: 'No se encuentra el producto', data: [] });
    }
});

// Endpoint DELETE con param
router.delete('/:id', async (req, res) => {
    const { id }  = req.params;
    const filter = {_id: id}

    const process = await controller.update(filter);
    if (process) {

        // Recuperamos la instancia global de socketServer para poder realizar un emit
        const socketServer = req.app.get('socketServer');
        socketServer.emit('products_list', process )

        res.status(200).send({ error: null, data: 'Producto borrado' });
    } else {
        res.status(404).send({ error: 'No se encuentra el Producto', data: [] });
    }
});

export default router;
