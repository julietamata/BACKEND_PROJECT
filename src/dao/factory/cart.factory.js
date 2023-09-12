import config from '../config/config.js'

export let Cart

switch (config.persistence) {
    case 'MONGO': 
        const { default: CartDao } = await import('../cart.mongo.dao.js');
        Cart = CartDao;
        break;
    case 'FILE':
        const { default: CartFileDAO } = await import('../');
        Cart = CartFileDAO;
        break;
    default:
        break;
}