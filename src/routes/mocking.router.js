import { Router } from "express";
import { getProductsMockingController , createProductMockingController} from "../controllers/mocking.controller.js";
import CustomError from '../services/errors/custom_error.js'
import {generateProductErrorInfo} from '../services/errors/info.js'
import { EErrors } from "../services/errors/enum.js";


const router = Router()

router.get("/", getProductsMockingController)

router.post("/", createProductMockingController)

router.post ('/errors', (req, res) => {
    let users = []
    const user = req.body
    if(!user.first_name || !user.last_name || !user.email)
      CustomError.createError({
        name: "User creation error",
        cause: generateProductErrorInfo(user),
        message: 'Error trying to create a user',
        code: EErrors.INVALID_TYPES_ERROR
    
      })
      users.push(user)
      res.send({ status: 'success', payload: user})
  })

export default router