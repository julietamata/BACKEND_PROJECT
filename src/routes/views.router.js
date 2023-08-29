import { Router } from "express";
import messageModel from "../dao/models/message.model.js";
import productsModel from "../dao/models/products.model.js";
import cartsModel from "../dao/models/carts.model.js";
// import { passportCall } from "../utils.js";
import UserModel from "../dao/models/users.model.js";
import {getViewsProductsController, 
        viewsRealTimeProductsController, 
        viewsChatController,
        viewsCartController} from "../controllers/views.controller.js"



const router = Router()

router.get("/products", getViewsProductsController)
  
router.get("/realtimeproducts", viewsRealTimeProductsController)

router.get("/chat", viewsChatController);

router.get("/carts/:cid", viewsCartController)

  export default router