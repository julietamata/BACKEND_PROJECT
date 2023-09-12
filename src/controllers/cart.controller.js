import CartManager from "../dao/fsManagers/CartManager.js";
import cartsModel from "../dao/models/carts.model.js";
import productModel from "../dao/models/products.model.js";
import { CartService, ProductService } from "../services/index.js";
import config from "../config/config.js";
import Mailgen from "mailgen";
import twilio from 'twilio'
import nodemailer from 'nodemailer'

const nodemailuser = config.nodemailuser
const nodemailpass = config.nodemailpass
const accountSid = config.twiliosid
const authToken = config.twiliotoken
const twiliophone = config.twiliophone    


const carts = new CartManager

// endpoint para leer carritos

// router.get('/', async (req, res) => {
//     res.send(await carts.readCarts())
    
//     // res.status(201).json({message: 'Lista de carritos'})
// })

// //Ruta para obtener la información de un producto por medio de su id

// router.get('/:id', async (req, res) => {
//     let id = req.params.id
//     res.send(await carts.getCartById(id))
    
//     // res.status(201).json({message: 'Lista de carritos'})
// })




// // Ruta para agregar un carrito

// router.post('/', async (req, res) => {
// res.status(201).send( await carts.addCarts() )
// })

// // Ruta para agregar productos dentro de los carritos, usando el id del carrito y el id del producto que se desea agregar

// router.post('/:cid/products/:pid', async (req, res) => {
//     let cartId = req.params.cid 
//     let productId = req.params.pid

//     res.status(201).send(await carts.addProductsToCart(cartId, productId))

// })

export const getCartsController = async(req, res) => {
    try{
		// const result = await cartsModel.find().lean().exec()
		const result = await CartService.getAll()
		res.status(201).json({status: 'success', payload:result})
		console.log(result)
	} catch(err) {
		res.status(500).json({status: 'error', error: 'No hay carritos'})
	}
}
	 
// endpoint para ver carritos con id
export const getCartsByIdController = async(req, res) => {
    try{
		const cartId = req.params.cid
		// const result = await cartsModel.findById(cartId).lean().exec()
		const result = await CartService.getById()

		if (result === null) { 
		res.status(500).json({status: 'error', error: err.message})
		}
		res.status(201).json({status: 'success', payload:result})
		
	} catch(err) {
		res.status(500).json({status: 'error', error: err.message})
	}
}

// Ruta para crear un carrito 
export const createCartController = async (req, res) => {
	try {
		const cart = req.body;
		// const addCart = await cartsModel.create(cart);
		const addCart = await CartService.create()

		res.json({ status: "success", payload: addCart });
	  } catch (error) {
		console.log(error);
		return res.status(500).json({ error: error.message });
	  }
}

// Ruta para agregar productos al carrito
export const addProductsToCartController = async (req, res) => {
	try {
		const productId = req.params.pid
		const cartId = req.params.cid
	
		// const product = await productModel.findById(productId);
		const product = await ProductService.getById(productId)

		
		if (!product) {
		  return res.status(404).json({ error: "El producto no existe" });
		}
		// const cart = await cartsModel.findById(cartId);
		const cart = await CartService.getById(cartId)

		if (!cart) {
		  return res.status(404).json({ error: "El carrito no existe" });
		}
		
		const productExists = cart.products.findIndex(
		  (item) => item.product.toString() === productId
		);
	
	  
		if (productExists !== -1) {
		  cart.products[productExists].quantity += 1;
		} else {
			const newProduct = {
			product: productId,
			quantity: 1,
		  };
		  cart.products.push(newProduct);
		}
		const result = await cart.save();
		res.json({ status: "success", payload: result });
	  } catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Error en el servidor" });
	  }
}

// Ruta para borrar productos del carrito 
export const deleteProductOfCartController = async (req, res) => {
	try {
		const cid = req.params.cid;
		const pid = req.params.pid;
		
		// const result = await cartsModel.findByIdAndUpdate
		const result = await CartService.update(
		  cid,
		  { $pull: { products: { product: pid } } },
		  { new: true }
		);
		if (result === null) {
		  res.status(500).json({ status: 'error', error: 'No se encontró el carrito o el producto' });
		}
		res.status(201).json({ status: 'success', message: "Producto eliminado del carrito" });
	  } catch (err) {
		res.status(500).json({ status: 'error', error: err.message });
	  }
}

// Ruta para borrar el carrito
export const deleteCartController = async (req, res) => {
	try{
		const cid = req.params.cid
		// const result = await cartsModel.findByIdAndDelete(cid).lean().exec()
		const result = await CartService.delete(cid)

		if (result === null){
			res.status(500).json({status:'error', error: err.message})
		}
    res.status(201).json({status: 'success', message: "Carrito eliminado"})
	}catch(err) {
		res.status(500).json({status:'error', error: err.message})
	}
}

// Ruta para actualizar el carrito con un arreglo de productos
export const updateCartController = async (req, res) => {
	try {
		const cid = req.params.cid;
		const productsArray = req.body.products;
	
		// Verifica si el carrito existe
		// const cart = await cartsModel.findById(cid);
		const cart = await CartService.getById(cid)

		if (!cart) {
		  return res.status(404).json({ error: "El carrito no existe" });
		}
	
		// Verifica si los productos en el arreglo son válidos
		const invalidProducts = [];
		for (const productId of productsArray) {
		//   const product = await productModel.findById(productId);
		  const product = await ProductService.getById(productId)

		  if (!product) {
			invalidProducts.push(productId);
		  }
		}
	
		if (invalidProducts.length > 0) {
		  return res.status(404).json({
			error: `Los siguientes productos no existen: ${invalidProducts.join(", ")}`,
		  });
		}
	
		// Actualiza el carrito con el arreglo de productos
		cart.products = productsArray.map((productId) => ({
		  product: productId,
		  quantity: 1, // Puedes ajustar la cantidad según tus necesidades
		}));
	
		const result = await cart.save();
		res.json({ status: "success", payload: result });
	  } catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Error en el servidor" });
	  }
}

// Ruta para actualizar solo la cantidad
export const updateQuantityProductCartController = async (req, res) => {
	try {
		const cid = req.params.cid;
		const pid = req.params.pid;
		const { quantity } = req.body;
	
		// Verifica si el carrito existe
		// const cart = await cartsModel.findById(cid);
		const cart = await CartService.getById(cid)

		if (!cart) {
		  return res.status(404).json({ error: "El carrito no existe" });
		}
	
		// Busca el producto en el carrito
		const productIndex = cart.products.findIndex(
		  (item) => item.product.toString() === pid
		);
	
		if (productIndex === -1) {
		  return res.status(404).json({ error: "El producto no existe en el carrito" });
		}
	
		// Actualiza la cantidad del producto
		cart.products[productIndex].quantity = quantity;
	
		const result = await cart.save();
		res.json({ status: "success", payload: result });
	  } catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Error en el servidor" });
	  }
}

// Ruta para mandar el ticket

export const getbill = (req, res) => {
    let config = {
        service: 'gmail',
        auth: {
            user: nodemailuser,
            pass: nodemailpass
        }
    }
    let transporter = nodemailer.createTransport(config)
    let Mailgenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Ticket de compra',
            link: 'http://localhost'
        }
    })

    let content = {
        body: {
            intro: 'Tu ticket de compra',
            table: {
                data: [
                    {
                        item: 'Zapatos colección love-hate',
                        description: 'Pronto recibirás tu pedido!',
                        price: '$800'
                    }
                ]
            },
            outro: 'Gracias por tu compra'
        }
    }
    let mail = Mailgenerator.generate(content)

    let message = {
        from: nodemailuser,
        to: req.body.useremail,
        subject: 'Gracias por tu compra',
        html: mail
    }
    transporter.sendMail(message)
        .then(() => res.status(201).json({ status: 'success' }))
        .catch(err => res.status(500).json({ err }))
}

export const sendSMS = (req, res) => {
    const client = twilio(accountSid, authToken)
    client.messages
        .create({
            body: 'Buenos días alegría, buenos días señor sol',
            from: twiliophone,
            to: '+523787096987'
        })
        .then(message => res.send(message.sid));
}