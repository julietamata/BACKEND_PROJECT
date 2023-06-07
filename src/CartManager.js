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

    readCarts = async () => {
        let carts = JSON.parse(await fs.promises.readFile(this.path, this.format))
        return carts
    }
    
    writeCarts = async (cart) => {
        await fs.promises.writeFile(this.path, JSON.stringify(cart, null, '\t'))
    }

    cartExist = async (id) => {
        let carts = await this.readCarts();
        return carts.find(item => item.id === id)
    }

    addCarts = async () => {
        let existingCarts = await this.readCarts();
        let id = nanoid()
        let cartsChain = [{id :id, products : []}, ...existingCarts]
        await this.writeCarts(cartsChain)
        return "Carrito agregado"
    }

    getCartById = async (id) => {
        let carts = await this.readCarts()
        let cartById = carts.find(item => item.id === id)
        if(!cartById) return "Carrito no encontrado" 
        return cartById
    }  


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

