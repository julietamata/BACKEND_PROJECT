import ProductManager from "../dao/fsManagers/ProductManager.js";
import productModel from "../dao/models/products.model.js";
import CustomError from "../services/errors/custom_error.js";
import { EErrors } from "../services/errors/enum.js";
import { generateProductErrorInfo } from "../services/errors/info.js";
import { ProductService } from "../services/index.js";
import logger from "../utils/logger.js";

const product = new ProductManager();


// // endpoint para leer products

// router.get('/', async (req, res) => {
// 	res.send (await product.getProducts())


// })

// // endpoint para leer productos con limit 


// // endpoint para leer un solo producto por su id

// router.get('/:id', async (req, res) => {
// 	let id = req.params.id
	
// 	res.send (await product.getProductById(id))


// })


// // endpoint para crear un nuevo product

// router.post ('/', async (req, res) => {
//     let newProduct = req.body
// 	res.status(201).json(await product.addProducts(newProduct))
// })


// // endpoint para actualizar un product

// router.put('/:id', async (req, res) => {
// 	let id = req.params.id
// 	let updateProduct = req.body;
// 	res.send(await product.updateProduct(id, updateProduct))
// })


// // endpoint para eliminar un producto
//  router.delete('/:id', async (req, res) => {
// 	let id = req.params.id
	
// 	res.send(await product.deleteProduct(id))
//  })









//endpoints mongoose data onwire

export const getProductsController = async (req, res) => {
    try{
		const limit = req.query.limit || 10
		// const result = await productModel.find().limit(limit).lean().exec()
		const result = await ProductService.getAll()
		res.status(201).json({status: 'success', payload:result})
		
	} catch(err) {
		res.status(500).json({status: 'error', error: 'No hay products'})
	}
}

// endpoint para ver carrito por Id

export const getProductByIdController = async (req, res) => {
    try{
		const id = req.params.pid
		// const result = await productModel.findById(id).lean().exec()
		const result = await ProductService.getById(id)
		if (result === null) { 
		res.status(500).json({status: 'error', error: err.message})
		}
		res.status(201).json({status: 'success', payload:result})
		
	} catch(err) {
		res.status(500).json({status: 'error', error: err.message})
		logger.error("Error");
	}
}

// endpoint para agregar un producto

export const createProductController = async (req, res) => {
    const product = req.body
    try{
        // const result = await productModel.create(product)
		const result = await ProductService.create(product)
		// const products = await productModel.find().lean().exec()
		const products = await ProductService.getAll()
		req.io.emit('updatedProducts', products)
    res.status(201).json({status: 'success', payload: result})

    }catch(err){
		CustomError.createError({
			name: "Failure product creation error",
			cause: generateProductErrorInfo({title, description, price, code, stock, category}),
			message: "Error al crear un usuario",
			code: EErrors.INVALID_TYPES_ERROR
		})
		

        res.status(500).json({status:'error', error: err.message})
		logger.error("Error");
    }
}

// endpoint para actualizar un producto 

export const updateProductController = async (req, res) => {
    try{
		const id = req.params.pid
		const data = req.body
		// const result = await productModel.findByIdAndUpdate(id, data, {returnDocument: 'after'})
		const result = await ProductService.update(id, data)	
		if (result === null){
			res.status(500).json({status:'error', error: err.message})
		}
		// const products = await productModel.find().lean().exec()
		const products = await ProductService.getAll()
		req.io.emit('updatedProducts', products)
		res.status(201).json({status: 'success', payload: result})
	} catch(err){
		res.status(500).json({status:'error', error: err.message})
		logger.error("Error");
	}
}

// endpoint para borrar un producto

export const deleteProductController = async (req, res) => {
    try{
		const id = req.params.pid
		// const result = await productModel.findByIdAndDelete(id)
		const result = await ProductService.delete(id)
		if (result === null){
			res.status(500).json({status:'error', error: err.message})
		}
		// const products = await productModel.find().lean().exec()
		const products = await ProductService.getAll()
		req.io.emit('updatedProducts', products)
		res.status(201).json({status: 'success', payload: products})

	}catch(err) {
		res.status(500).json({status:'error', error: err.message})
		logger.error("Error");
	}
}
