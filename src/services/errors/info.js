export const generateProductErrorInfo = product => {
    return `
    Uno o mas parametros estan incompletos o no son validos.
    Lista de properties obligatorios: 
    - title: Must be a string (${product.title}})
    - description: Must be a string (${product.description}})
    - price: Must be a Number. (${product.price})
    - code: Must be a Number. (${product.code})
    - stock: Must be a Number. (${product.stock})
    - category: Must be a string (${product.category}})
    ` 
}

export const generateProductAddCartErrorInfo = (product) => {
    return `El producto: ${product._id} no ha sido añadido`;
  };
  
 export const generateCartErrorInfo = (cart) => {
    return `El carrito ${cart._id} no ha sido encontrado`;
  };

export const generateDatabaseErrorInfo = (cart) => {
    return `Info does not exist`;
  };