import messageModel from "./models/message.model.js";

export default class MessageDao {
    getAll = async() => await messageModel.find().lean().exec()
}