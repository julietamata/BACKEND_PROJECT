import { Router } from "express";
import CartManager from "../dao/fsManagers/CartManager.js";
import cartsModel from "../dao/models/carts.model.js";

const router = Router()
const carts = new CartManager

// endpoint para leer carritos

router.get('/', async (req, res) => {
    res.send(await carts.readCarts())
    
    // res.status(201).json({message: 'Lista de carritos'})
})

//Ruta para obtener la información de un producto por medio de su id

router.get('/:id', async (req, res) => {
    let id = req.params.id
    res.send(await carts.getCartById(id))
    
    // res.status(201).json({message: 'Lista de carritos'})
})


// Endpoint con mongoose

router.post("/", async (req, res) => {
    try {
      const cart = req.body;
      const addCart = await cartsModel.create(cart);
      res.json({ status: "success", payload: addCart });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  });



// Ruta para agregar un carrito

router.post('/', async (req, res) => {
res.status(201).send( await carts.addCarts() )
})

// Ruta para agregar productos dentro de los carritos, usando el id del carrito y el id del producto que se desea agregar

router.post('/:cid/products/:pid', async (req, res) => {
    let cartId = req.params.cid 
    let productId = req.params.pid

    res.status(201).send(await carts.addProductsToCart(cartId, productId))

})


export default router