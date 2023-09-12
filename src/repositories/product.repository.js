export default class ProductRepository {
    constructor(dao) {
        this.dao = dao
    }
    getAll = async() => await this.dao.getAll()
    getById = async(id) => await this.dao.getById(id)
    getAllPaginate = async(filter, options) => await this.dao.getAllPaginate(filter, options)
    create = async(data) => await this.dao.create(data)
    update = async(id, data) => await this.dao.update(id, data)
    delete = async(id) => await this.dao.delete(id)

}