import { config } from "dotenv";

export let Product

switch(config.persistance) {
    case 'MONGO':
        const { default: ProductDao} = await import('../product.mongo.dao')
        Product = ProductDao
        break;
    case 'FILE':
        const { default: ProductFileDAO } = await import('../')
        Product = ProductFileDAO
        break   
    default:
        break;
}


