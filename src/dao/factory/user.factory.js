import { config } from "dotenv";

export let User

switch (config.persistance) {
    case 'MONGO': 
        const { default: UserDao } = await import('../user.mongo.dao')
        User = UserDao
        break
    case 'FILE':
        const { default: UserFileDAO } = await import('../')
        User = UserFileDAO
        break
        
    default:
        break
}