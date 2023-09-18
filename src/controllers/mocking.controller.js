import { generateProduct } from "../services/mockingService.js"

const products = []

export const getProductsMockingController = async (req, res) => {
    try {
        for(let i = 0; i < 100; i++ ) {
            products.push(await generateProduct())
        }
        res.status(200).json({status: "success", payload: products })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ status: "error", error: error.message })
    }
}

// let i = 0; i < 100; i++
// let index = 0; index <100; index++