import { Router } from 'express';
import CartController from '../dao/carts.controller.js';

const router = Router();
const controller = new CartController


// Endpoint GET
router.get('/:cid?', async (req, res) => {
    const { cid }  = req.params;
    const filter = cid ? {_id: cid} : {}
    const process = await controller.get(filter)
    if(process) {
        res.status(200).send({ error: null, data: process });
    } else {
        res.status(404).send({ error: 'Dato invalido', data: "" });
    }
});

// Endpoint POST para crear nuevo cart
router.post('/', async (req, res) => {
    const newCart = await controller.add()
    res.status(200).send({ error: null, data: newCart });
});

// Endpoint POST para cargar productos al cart
router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid} = req.params
    const data = await controller.updateProd(cid, pid)
    res.status(200).send({ error: null, data: data });
});

// Endpoint PUT para actualizar la cantidad de UN producto del carrro
router.put('/:cid/product/:pid', async (req, res) => {
    const { cid, pid} = req.params
    const newQty = req.body.cantidad;
    const data = await controller.updateOne(cid, pid, newQty);
    res.status(200).send({ error: null, data: data });    
});

// Endpoint PUT para actualizar TODOS los productos del carrro
router.put('/:cid', async (req, res) => {
    const { cid } = req.params
    const filter = {_id: cid}
    const updated = {"product": req.body}
    const options = { new: true }
    const data = await controller.updateAll(filter, updated, options);
    res.status(200).send({ error: null, data: data })
});

// Endpoint DELETE para eliminar UN producto del cart
router.delete('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const data = await controller.deleteProd(cid, pid)
    res.status(200).send({ error: null, data: data });
});

// Endpoint DELETE para eliminar TODOS los productos del cart
router.delete('/:cid', async (req, res) => {
    const { cid } = req.params
    const filter = {_id: cid}
    const updated = {"product": []}
    const options = { new: true }
    const data = await controller.updateAll(filter, updated, options);
    res.status(200).send({ error: null, data: data })
});





export default router;
