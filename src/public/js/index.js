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

    deleteProduct = (id) => {
fetch(`/api/products/${id}`, {
    method: 'delete'
})
    .then(result => result.json())
    .then(result => {
        if (result.status === 'error') throw new Error(result.error)
        // else socket.emit('productList', result.body)
        alert('Producto eliminado')
    })
    .catch(err => alert(`Favor de verificar todos los campos ${err}`))
    }

    socket.on('updateProducts', data => {
        if (data !== null){
            productsTable.innerHTML = '';
            data.forEach(product => {
                let productHtml = `
            <tr>
                <td> <button type="button" class="btn btn-danger" onclick="deleteProduct({{this.id}})">Eliminar</button></td>
                <th scope="row">{{this.id}}</th>
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>${product.code}</td>
                <td>${product.stock}</td>
                <td>${product.status}</td>
                <td><img src="${this.thumbnail}" alt=""></td>
             </tr>
                `;

                productsTable.innerHTML+= productHtml;
                
            });
        }
    })



