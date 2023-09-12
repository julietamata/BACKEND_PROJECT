import UserModel from "./models/users.model.js";


export default class UserDao {
    getAll = async () => await UserModel.find()
    getById = async (id) => await UserModel.findById(id)
    create = async (data) => await UserModel.create(data)
    update = async (id, data) => await UserModel.findByIdAndUpdate(id, data, { returnDocument: "after", new: true })
    delete = async (id) => await UserModel.findByIdAndDelete(id)
}