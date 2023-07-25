const socket = io()

socket.emit('message' , 'Hola, websocket')

const productsTable = document.getElementById('realProductsTable')

document.getElementById('submitProduct').addEventListener('click', () => {

    const body = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        code: document.getElementById('code').value,
        stock: document.getElementById('stock').value,
        status: document.getElementById('status').value,
        thumbnail: document.getElementById('thumbnail').value
    }

    fetch('/api/products', {
        method: 'post', 
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(result => result.json())
    .then(result => {
        if(result.status === 'error') throw new Error (result.error)
        else {
            socket.emit('productList', body)
        } alert('El producto fue añadido')
        document.getElementById('title').value = ''
        document.getElementById('description').value = ''
        document.getElementById('price').value = ''
        document.getElementById('code').value = ''
        document.getElementById('stock').value = ''
        document.getElementById('status').value = ''
        document.getElementById('thumbnail').value = ''
    })
    .catch(err => alert( `Favor de verificar todos los campos ${err}`))
    })

    const deleteProduct = async (id) => {
        try {
          const res = await fetch(`/api/products/${id}`, {
            method: "delete",
          });
          const result = await res.json();
          if (result.status === "error") throw new Error(result.error);
          
          else socket.emit('productList', body); 
        //   else socket.emit("productList", result.products); 
         } catch (error) {
         alert('El producto fue eliminado')
        }
      };


    //   socket.on('updateProducts', (products) => {
    //     productsTable.innerHTML =   
        
    //     `
    //     <thead>
    //       <tr>
    //         <th scope="col">Eliminar Productosssddsss</th>
    //         <th scope="col">ID</th>
    //         <th scope="col">Producto</th> 
    //         <th scope="col">Descripción</th>
    //         <th scope="col">Precio</th>
    //         <th scope="col">Código</th>
    //         <th scope="col">Stock</th>
    //         <th scope="col">Status</th>
    //         <th scope="col">Imágenes</th>
    //       </tr>
    //     </thead>
    //     `
    //     products.forEach((product) => {
                      
    //         const tr =document.createElement('tr');
    //       tr.innerHTML = ` 
    //       <td> <button type="button" class="btn btn-danger" onclick="deleteProduct('${product.id}')">Eliminar</button></td>
    //         <th scope="row">${product.id}</th>
    //         <td>${product.title}</td>
    //         <td>${product.description}</td>
    //         <td>${product.price}</td>
    //         <td>${product.code}</td>
    //         <td>${product.stock}</td>
    //         <td>${product.status}</td>
    //         <td><img src="${product.thumbnail}" alt=""></td>
            
    //               } `
    //     productsTable.appendChild(tr)
    //     // productsTable.getElementsByTagName('tbody')[0].appendChild(tr)
    //     })
    
                
    //   }); 


//     socket.on('updateProducts', (products) => {
//   productsTable.innerHTML =   
//     `
//     <thead>
//       <tr>
//         <th scope="col">Eliminar Productosssddsss</th>
//         <th scope="col">ID</th>
//         <th scope="col">Producto</th> 
//         <th scope="col">Descripción</th>
//         <th scope="col">Precio</th>
//         <th scope="col">Código</th>
//         <th scope="col">Stock</th>
//         <th scope="col">Status</th>
//         <th scope="col">Imágenes</th>
//       </tr>
//     </thead>
//     `;

//   if (Array.isArray(products)) {
//     // 'products' ya es un array, puedes continuar con la lógica actual
//     products.forEach((product) => {
//       const tr = document.createElement('tr');
//       tr.innerHTML = ` 
//         <td> <button type="button" class="btn btn-danger" onclick="deleteProduct('${product.id}')">Eliminar</button></td>
//         <th scope="row">${product.id}</th>
//         <td>${product.title}</td>
//         <td>${product.description}</td>
//         <td>${product.price}</td>
//         <td>${product.code}</td>
//         <td>${product.stock}</td>
//         <td>${product.status}</td>
//         <td><img src="${product.thumbnail}" alt=""></td>
//       `;
//       productsTable.appendChild(tr);
//     });
//   } else if (typeof products === 'object') {

//     const productsArray = Object.values(products);
//     productsArray.forEach((product) => {
//       const tr = document.createElement('tr');
//       tr.innerHTML = ` 
//         <td> <button type="button" class="btn btn-danger" onclick="deleteProduct('${product.id}')">Eliminar</button></td>
//         <th scope="row">${product.id}</th>
//         <td>${product.title}</td>
//         <td>${product.description}</td>
//         <td>${product.price}</td>
//         <td>${product.code}</td>
//         <td>${product.stock}</td>
//         <td>${product.status}</td>
//         <td><img src="${product.thumbnail}" alt=""></td>
//       `;
//       productsTable.appendChild(tr);
//       console.log(products)
//     });
//   } else {
//     console.log('No es un array ni un objeto válido');
//   }
// });





    socket.on('updateProducts', data => {
        if (data !== null){
            productsTable.innerHTML = '';
            data.forEach(product => {
                let productHtml = `
            <tr>
                <td> <button type="button" class="btn btn-danger" onclick="deleteProduct('${product.id}')">Eliminar</button></td>
                <th scope="row">${product.id}</th>
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>${product.code}</td>
                <td>${product.stock}</td>
                <td>${product.status}</td>
                <td><img src="${product.thumbnail}" alt=""></td>
             </tr>
                `;

                productsTable.innerHTML+= productHtml;
                
            });
        }
    })



