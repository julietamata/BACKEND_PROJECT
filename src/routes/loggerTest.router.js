import { Router } from "express";
import loggerTest from '../utils/logger.js'
import { loggerController } from "../controllers/logger.controller.js";

const router = Router()

router.get('/', loggerController)


export default router