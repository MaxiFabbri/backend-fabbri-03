import { Router } from 'express';
// import { users } from '../config.js';
import ProductController from '../dao/products.controller.js';
import CartController from '../dao/carts.controller.js'
const controller = new ProductController
const cartController = new CartController

const router = Router();

router.get('/products/:id?', async (req, res) => {
    const { id }  = req.params;
    var filter = {}
    var sort = {}
    if (id) {
        filter = { _id: id }
    } else if (req.query.category || req.query.stock || req.query.sort) {
        if(req.query.category) {filter.category =  req.query.category};
        if(req.query.stock) {filter.stock = { $gt: parseInt(req.query.stock)}}
        if(req.query.sort){
            if (req.query.sort === 'asc') {
                sort = {price: 1}
            } else if (req.query.sort === 'desc'){
                sort = {price: -1}
            } else {
                sort = {}
            }
        }
    } 
    const limitNumber = req.query.limit || 10; 
    const pg = req.query.page || 1;
    const data = await controller.get(limitNumber, pg, filter, sort)

    if(data) {
        res.status(200).render('products', {products: data});
    } else {
        res.status(404).send({ error: 'Dato invalido', data: "" });
    }
});

router.get('/realtimeproducts', async (req, res) => {
    const data = {};
    res.status(200).render('realTimeProducts', data);
});

router.get('/newproduct', async (req, res) => {
    const data = {};
    res.status(200).render('newproduct', data);
});


router.get('/cart/:cid', async (req, res) => {
    const { cid }  = req.params;
    const filter = {_id: cid}
    const process = await cartController.get(filter)
    const [ data ] = process
    if(process) {
        res.status(200).render('cart', {products: data.product });
    } else {
        res.status(404).send({ error: 'Dato invalido', data: "" });
    }
});

export default router;