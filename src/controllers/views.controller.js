
import messageModel from "../dao/models/message.model.js";
import productsModel from "../dao/models/products.model.js";
import cartsModel from "../dao/models/carts.model.js";
// import { passportCall } from "../utils.js";
import UserModel from "../dao/models/users.model.js";
import { CartService, MessageService, ProductService } from "../services/index.js";
import logger from "../utils/logger.js";



   // Vistas productos render

export const getViewsProductsController = async(req, res) => {
    try {
        let page = parseInt(req.query.page) || 1
        let limit = parseInt(req.query.limit) || 4
        
        const filterOptions = {}
        
        if (req.query.stock) filterOptions.stock = req.query.stock
    
        if (req.query.category) filterOptions.category = req.query.category
    
        const paginateOptions = {limit, page, lean: true}
    
        if (req.query.sort === 'asc') paginateOptions.sort = { price: 1}
    
        if (req.query.sort === 'desc') paginateOptions.sort = { price: -1}
    
        // const result = await productsModel.paginate(filterOptions, paginateOptions)
        const result = await ProductService.getAllPaginate(filterOptions, paginateOptions)

        // const result = await productsModel.paginate({}, { page, limit, lean: true})
    
        result.prevLink = result.hasPrevPage ? `/mongoose/products?page=${result.prevPage}`
                                                 : ''
        result.nextLink = result.hasNextPage ? `/mongoose/products?page=${result.nextPage}`
                                                : ''
        //  const products = await result.find().lean().exec()
        // console.log(result)
        logger.info(result);        
        logger.info("Visualización de los productos existentes"); ///////////////logger
    
        // const user = await UserModel.findById(req.session?.passport?.user).lean().exec();
    
        res.render('home', {
          
          products: result,
          prevLink: result.prevLink,
          nextLink: result.nextLink,
          hasNextPage: result.hasNextPage,
          hasPrevPage: result.hasPrevPage,
          nextPage: result.nextPage,
          prevPage: result.prevPage
        }
          )
    
      } catch (error) {
        logger.error(error);;
        res.status(500).json({ status: 'error', error: error.message });
      }
}

export const viewsRealTimeProductsController = async(req, res) => {
    try {
        // const products = await productsModel.find().lean().exec()
        const products = await ProductService.getAll()

        res.render('realTimeProducts', { products })
      } catch (error) {
                logger.error(error);; ///////////////logger


        res.status(500).json({ status: 'error', error: error.message })
      }
} 
 
  // Vista del chat
export const viewsChatController = async(req, res) => {
    try {
        // const messages = await messageModel.find().lean().exec();
        const messages = await MessageService.getAll()

        res.render("chat", { messages });
      } catch (error) {
        // console.log(error);
        logger.error(error);
        
        res.status(500).json({ error: error });
      }
  }

  // Vista del carrito
export const viewsCartController = async(req, res) => {
    try{
        const cid = req.params.cid
        // const result = await cartsModel.findById(cid).populate('products.product').lean().exec();
        const result = await CartService.getById(cid).populate('products.product')

        if (result === null) {
          
          return res.status(404).json({status: 'error', error: 'El carrito no existe'})
        }
        res.render('carts', {cid: result._id, products: result.products})
        logger.info(result);
      }catch(err){
        res.status(500).json({status: 'error', error: err.message})
      }
  }
  

