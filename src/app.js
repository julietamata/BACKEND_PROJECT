import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from  './routes/carts.router.js'
import ProductManager from './ProductManager.js'


const app = express()

app.use(express.json())

app.get('/', (req, res) => res.status(201).send({message: 'server ok'}))


app.use('/api/products', productsRouter)

app.use('/api/carts', cartsRouter)









app.listen(8080, () => console.log('Server up'))









// let users =[
    //     {id: 1, name: 'juls', age: 28},
    //     {id: 2, name: 'let', age: 27},
    //     {id: 3, name: 'mats', age: 26},
    //     {id: 4, name: 'sand', age: 25}
    // ]


// app.get('/products', (req, res) => {
//     res.json({message:'The server is running'})
// })

// app.get('/users', (req, res) => {
//     const limit = req.query.limit
//     if(limit > users.length) {
//         return res.status(400).json({error: 'limit is invalid'})
//     }
//     res.status(200).json({users: users.slice(0, limit)})

// })

// app.post('/users', (req, res) =>{
//      const {id, name, age} = req.body
//      if (!id || !name || !age){
//         return res.status(400).json({error: 'Info missing'})
//      }
//      const userCreated = {id: parseInt(id), name, age: parseInt(age)}
//      users.push(userCreated)
//      res.status(201).json({message: 'User created', data: userCreated})
// })


// app.delete('/users/:id', (req, res) =>{
//     const id = req.params.id 
//     users = users.filter(item => item.id != id)
//     res.status(200).json({message: 'product deleted'})
// })


// app.put('/users/:id', (req, res) => {
//     const id = req.params.id
//     const newData = req.body
//     const user = users.find(item => item.id == id)
//     const userIndex = users.findIndex(item => item.id == id)
//     users[userIndex] = {
//         ...user, ...newData
//     }
//     res.status(200).json({message: 'usper update!'})
// })