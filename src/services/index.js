import CartDao from "../dao/cart.mongo.dao.js"
import MessageDao from "../dao/message.mongo.dao.js"
import ProductDao from "../dao/product.mongo.dao.js"
import CartRepository from "../repositories/cart.repository.js"
import MessageRepository from "../repositories/message.repository.js"
import ProductRepository from "../repositories/product.repository.js"
import { Product } from "../dao/factory/product.factory.js"
import UserRepository from "../repositories/user.repository.js"
import UserDAO from "../dao/user.mongo.dao.js"

// export const ProductService = new ProductRepository(new Product())
export const ProductService = new ProductRepository(new ProductDao())
export const CartService = new CartRepository(new CartDao())
export const MessageService = new MessageRepository(new MessageDao())
export const UserService = new UserRepository(new UserDAO())


