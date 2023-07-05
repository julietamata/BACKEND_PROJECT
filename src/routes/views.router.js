import { Router } from "express";
import messageModel from "../dao/models/message.model.js";
import productsModel from "../dao/models/products.model.js";
import cartsModel from "../dao/models/carts.model.js";

const router = Router()

router.get("/", async (req, res) => {
    try {
      const products = await productsModel.find().lean().exec()
      res.render('home', { products })
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', error: error.message });
    }
  })
  
  router.get("/realtimeproducts", async (req, res) => {
    try {
      const products = await productsModel.find().lean().exec()
      res.render('realTimeProducts', { products })
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', error: error.message })
    }
  })

router.get("/chat", async (req, res) => {
    try {
      const messages = await messageModel.find().lean().exec();
      res.render("chat", { messages });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  });

  export default router