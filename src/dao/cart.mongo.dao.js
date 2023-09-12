import cartsModel from "./models/carts.model.js";

export default class CartDao {
    getAll = async() => await cartsModel.find().lean().exec()
    getById = async(id) => await cartsModel.findById(id).lean().exec()
    create = async(data) => await cartsModel.create(data)
    update = async(id, data) => await cartsModel.findByIdAndUpdate(id, data, {returnDocument: 'after'})
    delete = async(id) => await cartsModel.findByIdAndDelete(id)
}

