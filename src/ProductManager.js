import fs, { readFile } from 'fs'
import { format } from 'path'
import { nanoid } from 'nanoid'

class ProductManager {
    constructor(){
        this.path = "./src/database/products.json"
        this.format ='utf-8'
        this.error = undefined
        
    }

    readProducts = async () => {
        let products = JSON.parse(await fs.promises.readFile(this.path, this.format))
        return products
    }

    writeProducts = async (product) => {
        await fs.promises.writeFile(this.path, JSON.stringify(product, null, '\t'))
    }

    prodExist = async (id) => {
        let products = await this.readProducts();
        return products.find(item => item.id === id)
    }

    addProducts = async (product) => {
        let existingProducts = await this.readProducts()
        product.id = nanoid()
        let allProducts = [...existingProducts, product]
        await this.writeProducts(allProducts)
        return "Producto agregado";
    };

    getProducts = async () => {
        return await this.readProducts()
    }

    getProductById = async (id) => {
        let products = await this.readProducts()
        let productById = products.find(item => item.id === id)
        if(!productById) return "Producto no encontrado" 
        return productById
    }  

    updateProduct = async(id, updateProduct) => {
    let products = await this.readProducts()
    let existProduct = products.find(item => item.id === id)
    if (!existProduct) return "Producto no encontrado"
    await this.deleteProduct (id)
    let oldProduct = await this.readProducts()
    let newProduct = [{...updateProduct, id : id }, ...oldProduct]
    await this.writeProducts(newProduct)
    return "Producto actualizado"
}

    deleteProduct = async (id) => {
        let products = await this.readProducts()
        let existProduct = products.some(item => item.id === id)
        if (existProduct) {
        let filterProducts = products.filter(item => item.id != id)
        await this.writeProducts(filterProducts)
        return "Producto Eliminado"
         } 
        return "Por favor, ingrese un producto válido"
    
    }

    


}



// updateProduct = async(id, product) => {
//     let products = await this.readProducts()
//     let existProduct = products.find(item => item.id === id)
//     if (!existProduct) return "Producto no encontrado"
//     await this.deleteProduct (id)
//     let oldProduct = await this.readProducts()
//     let newProduct = [{...product, id : id }, ...oldProduct]
//     await this.writeProducts(newProduct)
//     return "Producto actualizado"
// }


// updateProduct = async(id, updateProduct) => {
//     let products = await this.readProducts()
//     const index = products.findIndex((item) => item.id == id);

//     if (!index) return "Producto no encontrado"
       
//     const productos = await this.readProducts()
//     const existingProduct = await productos.find((item => item.id == id))
    
//     existingProduct[index] = {...existingProduct[index], ...updateProduct}

//     // await fs.promises.writeFile(
//     //     this.path, JSON.stringify(productos, null, "\t"), this.format
//     // );
//         return "Producto actualizado"
//     // this.products = existingProduct;
// }



export default ProductManager