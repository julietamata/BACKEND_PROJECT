import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            {
            _id: false,
            product: {
                ref: 'products',
                type: mongoose.Schema.Types.ObjectId
            },
            quantity: Number
        }
    ],
        default: []
    }
})

cartsSchema.pre("find", function() {
    this.populate("products.product")
})

cartsSchema.pre("findById", function() {
    this.populate("products.product")
})

mongoose.set('strictQuery', false)

const cartsModel = mongoose.model('carts', cartsSchema)

export default cartsModel

