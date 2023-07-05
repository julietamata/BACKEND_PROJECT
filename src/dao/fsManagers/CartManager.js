import fs, { readFile } from 'fs'
import { format } from 'path'
import { nanoid } from 'nanoid'
import ProductManager from './ProductManager.js';

const allProducts = new ProductManager

class CartManager {
    constructor() {
        this.path = "./src/database/carts.json";
        this.format ='utf-8'
        this.error = undefined
    }

    // Función para leer los carritos que están en el archivo json de carts

    readCarts = async () => {
        let carts = JSON.parse(await fs.promises.readFile(this.path, this.format))
        return carts
    }
    
    // Función para crear carritos nuevos

    writeCarts = async (cart) => {
        await fs.promises.writeFile(this.path, JSON.stringify(cart, null, '\t'))
    }

    // Función para saber si un carrito existe y poder usarla más adelante 

    cartExist = async (id) => {
        let carts = await this.readCarts();
        return carts.find(item => item.id === id)
    }

    // Funcióon para añadir los carritos, usando la función para leer y crear carritos nuevos

    addCarts = async () => {
        let existingCarts = await this.readCarts();
        let id = nanoid()
        let cartsChain = [{id :id, products : []}, ...existingCarts]
        await this.writeCarts(cartsChain)
        return "Carrito agregado"
    }

    // Función para traer la información de un carrito por su id

    getCartById = async (id) => {
        let carts = await this.readCarts()
        let cartById = carts.find(item => item.id === id)
        if(!cartById) return "Carrito no encontrado" 
        return cartById
    }  

    // Función para añadir productos al carrito, usando una función para saber si un producto existe y en caso de que exista solo agregar la cantidad y en caso de que no exista, agregar un producto nuevo al carrito

    addProductsToCart = async(cartId, productId) => {
        let cartById = await this.cartExist(cartId)
        if(!cartById) return "Carrito no encontrado"

        let productById = await allProducts.prodExist(productId)
        if (!productById) return "Producto no encontrado"


        let allCarts = await this.readCarts()
        
        let cartFilter = allCarts.filter( (item) => item.id != cartId)

        if(cartById.products.some((item) => item.id === productId)){
            let productInCart = cartById.products.find((item) => item.id === productId)

            productInCart.quantity++
            
            // let cartsChain = [productInCart, ...allCarts]
            let cartsChain = [cartById, ...cartFilter]

            await this.writeCarts(cartsChain)
            return "Unidad agregada"
        }


        cartById.products.push({id:productById.id, quantity: 1 })

        let cartsChain = [cartById, ...cartFilter]
    
        await this.writeCarts(cartsChain)
        return "Producto agregado al carrito"
    }


}



export default CartManager

