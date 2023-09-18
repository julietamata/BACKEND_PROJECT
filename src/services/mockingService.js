import { faker } from "@faker-js/faker";
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
  
  