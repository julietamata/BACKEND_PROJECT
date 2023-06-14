const socket = io()

socket.emit('message' , 'Hola, websocket')

const table = document.getElementById('realProductsTable')

document.getElementById('submitProduct').addEventListener('click', () => {

    const body = {
        title: document.getElementById('').value,
        description: document.getElementById('').value,
        price: document.getElementById('').value,
        code: document.getElementById('').value,
        stock: document.getElementById('').value,
        status: document.getElementById('').value,
        thumbnail: document.getElementById('').value


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

    })



})