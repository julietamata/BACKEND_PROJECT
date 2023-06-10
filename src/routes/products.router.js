import { Router } from "express";
import ProductManager from "../ProductManager.js";


const router = Router()

const product = new ProductManager();


// endpoint para leer products

router.get('/', async (req, res) => {
	res.send (await product.getProducts())
})

// endpoint para leer productos con limit 


// endpoint para leer un solo producto por su id

router.get('/:id', async (req, res) => {
	let id = req.params.id
	
	res.send (await product.getProductById(id))
})

// endpoint para crear un nuevo product

router.post ('/', async (req, res) => {
    let newProduct = req.body
	res.status(201).json(await product.addProducts(newProduct))
})

// endpoint para actualizar un product

router.put('/:id', async (req, res) => {
	let id = req.params.id
	let updateProduct = req.body;
	res.send(await product.updateProduct(id, updateProduct))
})


// endpoint para eliminar un producto
 router.delete('/:id', async (req, res) => {
	let id = req.params.id
	
	res.send(await product.deleteProduct(id))
 })


export default router







// // endpoint para leer products

// router.get('/', (req, res) => {
//     res.status(201).json({products})
// })

// // endpoint para leer productos con limit 

// router.get('/', (req, res) => {
//     const limit = req.query.limit
//     if(!limit) {
//         return res.status(400).json({error: 'limit is invalid'})
//     }
//     res.status(200).json({products: products.slice(0, limit)})

// })

// // app.get("/", async (req, res) =>{
// //     let limit = parseInt(req.query.limit);
// //     if (!limit) return response.send(await getProducts)
// //     let allProducts = await getProducts
// //     let productLimit = allProducts.slice(0, limit)
// //     response.send(productLimit)
// //     // console.log(await getProducts)
// // });


// // endpoint para leer un solo producto por su id

// router.get('/:id', (req, res) => {
//     const id = req.params.id
//     const product = products.find(item => item.id == id)
    
//     res.status(201).json({message: `El producto con el id es ${product}`})
// })


// // app.get("/products/:id", async (request, response) =>{
// //     let id = parseInt(request.params.id);
// //     let allProducts = await getProducts;
// //     let getProductById = allProducts.find(item => item.id === id)
// //     response.send(getProductById)
// // });


// // endpoint para crear un nuevo usuario


// router.post('/', (req, res) =>{
//     const {id, name, age} = req.body
//     if (!id || !name || !age){
//        return res.status(400).json({error: 'Info missing'})
//     }
//     const productCreated = {id: parseInt(id), name, age: parseInt(age)}
//     products.push(productCreated)
//     res.status(201).json({message: 'User created', data: productCreated})
// })


// // endpoint para actualizar un usuario

// router.put('/:id', (req, res) => {
//     const id = req.params.id
//     const newData = req.body
//     const product = products.find(item => item.id == id)
//     const productIndex = products.findIndex(item => item.id == id)
//     products[productIndex] = {
//         ...product, ...newData
//     }
//     res.status(200).json({message: 'usper update!'})
// })


// // endpoint para eliminar un usuario 

// router.delete('/:id', (req, res) =>{
//     const id = req.params.id 
//     products = products.filter(item => item.id != id)
//     res.status(200).json({message: 'product deleted'})
// })

// export default router

// let products  = [
	// {
	// 	"id": 1,
	// 	"title": "Sandalias Marroquí",
	// 	"description": "Sandalias hechas a mano de la colección marroquí",
	// 	"price": 450,
	// 	"thumbnail": "https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/calz2.jpg?alt=media&token=b223f369-5264-4358-af5f-53eab965c6e8",
	// 	"code": 152,
	// 	"stock": 9, 
    //     "status" : true
	// },
	// {
	// 	"id": 2,
	// 	"title": "Bolsa Marroquí",
	// 	"description": "Bolso hecho a mano de la colección marroquí",
	// 	"price": 380,
	// 	"thumbnail": "https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/ace6.jpg?alt=media&token=82adc65b-32f2-48c0-a6e9-7dc1db887432",
	// 	"code": 102,
	// 	"stock": 7,
    //     "status" : true
	// },
	// {
	// 	"id": 3,
	// 	"title": "Lentes",
	// 	"description": "Lentes de metal derretido, edición limitada",
	// 	"price": 550,
	// 	"thumbnail": "https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/ac4.jpg?alt=media&token=3db0aebd-2a5c-4bda-b769-d97150a3e061",
	// 	"code": 145,
	// 	"stock": 6, 
    //     "status" : true
	// },
	// {
	// 	"id": 4,
	// 	"title": "Tacones hate",
	// 	"description": "Tacones de la colección love-hate personalizados",
	// 	"price": 550,
	// 	"thumbnail": "https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/calz1.jpg?alt=media&token=0f175971-e468-44c8-a505-0664d19bf320",
	// 	"code": 145,
	// 	"stock": 4, 
    //     "status" : true
	// },
	// {
	// 	"id": 5,
	// 	"title": "Tacones love",
	// 	"description": "Tacones de la colección love-hate personalizados",
	// 	"price": 750,
	// 	"thumbnail": "https://firebasestorage.googleapis.com/v0/b/saramorchio-ecommerce.appspot.com/o/calz6.png?alt=media&token=f06585f5-cda1-4df5-82f6-89c29521fc37",
	// 	"code": 132,
	// 	"stock": 5, 
    //     "status" : true
	// }
// ]