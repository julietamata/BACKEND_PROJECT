import { faker } from "@faker-js/faker";
import CustomError from "./errors/custom_error.js";
import { generateProductErrorInfo } from "./errors/info.js";
import { EErrors } from "./errors/enum.js";
// import { fakerES } from "@faker-js/faker/locale";



export const generateProduct = async () => {
    return {
      _id: faker.database.mongodbObjectId(),
      title: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price({ min: 300, max: 1500, symbol: "$" }),
      code: faker.string.numeric(4),
      status: faker.datatype.boolean({ probability: 0.9 }),
      stock: faker.number.int({ max: 100 }),
      category: faker.commerce.department(),
      thumbnails: [faker.image.urlLoremFlickr({ category: 'fashion' })]      
    };
  };
  

  export const createProduct = async (req) => {
    const product = req.body;
    if (!product.title || !product.price) {
      return CustomError.createError({
        name: "Product creation error",
        cause: generateProductErrorInfo(product),
        message: "Error typing to create a product",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }}



  