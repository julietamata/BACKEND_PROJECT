import productModel from "./models/products.model.js";

export default class ProductDao {
    getAll = async() => await productModel.find().lean().exec()
    getById = async(id) => await productModel.findById(id).lean().exec()
    getAllPaginate = async (filter, options) => await productModel.paginate(filter, options)
    create = async(data) => await productModel.create(data)
    update = async(id, data) => await productModel.findByIdAndUpdate(id, data, {returnDocument: 'after'})
    delete = async(id) => await productModel.findByIdAndDelete(id)
}