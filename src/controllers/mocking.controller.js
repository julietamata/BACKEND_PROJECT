import { generateProduct, createProduct } from "../services/mockingService.js"

const products = []


export const getProductsMockingController = async (req, res) => {
    try {
        for(let index = 0; index <100; index++) {
            products.push(await generateProduct())
        }
        res.status(200).json({status: "success", payload: products })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: "error", error: error.message })
    }
}


export const createProductMockingController = async (req, res, next) => {
    try {
        const product = await createProduct(req)
        products.push(product)
        res.status(201).json({ status: "success", payload: products })
    } catch (error) {
        next(error)
    }
}
