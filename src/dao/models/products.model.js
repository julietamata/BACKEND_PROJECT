import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"


// const products = 'products'

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true}, 
    price: {type: Number, required: true},
    code: {type: String, unique:true, required: true},
    status: {type: Boolean, required: true},
    stock: {type: Number, required: true},
    category: {type: String, required: true},
    thumbnails: {type: [String], default: []}

})

mongoose.set('strictQuery', false)

productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model('products', productSchema)

export default productModel