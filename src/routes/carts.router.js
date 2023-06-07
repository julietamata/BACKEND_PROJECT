import { Router } from "express";
import CartManager from "../CartManager.js";

const router = Router()
const carts = new CartManager

// endpoint para leer carritos

router.get('/', async (req, res) => {
    res.send(await carts.readCarts())
    
    // res.status(201).json({message: 'Lista de carritos'})
})


router.get('/:id', async (req, res) => {
    let id = req.params.id
    res.send(await carts.getCartById(id))
    
    // res.status(201).json({message: 'Lista de carritos'})
})

router.post('/', async (req, res) => {
res.status(201).send( await carts.addCarts() )
})

router.post('/:cid/products/:pid', async (req, res) => {
    let cartId = req.params.cid 
    let productId = req.params.pid

    res.status(201).send(await carts.addProductsToCart(cartId, productId))

})


export default router