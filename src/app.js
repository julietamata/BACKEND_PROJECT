import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from  './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import ProductManager from './dao/fsManagers/ProductManager.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import messageModel from './dao/models/message.model.js'
import sessionRouter from './routes/session.router.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import initializePassport from '../src/config/passport.config.js'
import cookieParser from 'cookie-parser'
import { handlePolicies } from './utils.js'
import dotenv from 'dotenv'
import config from './config/config.js'
import cors from 'cors'

// export const PORT = config.apiserver.port

const port = config.port
const uri = config.uri
const dbname = config.dbname

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
const products = new ProductManager();
app.use(cookieParser('secret'))



app.use(
    session({
      store: MongoStore.create({
        mongoUrl: uri,
        dbName: dbname,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      }),
      secret: "secretPass",
      resave: true,
      saveUninitialized: true,
    })
  );
  
initializePassport()  
app.use(passport.initialize())
app.use(passport.session())



// Configuración del motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

mongoose.set('strictQuery', false)

// const serverHttp = app.listen(8080, () => console.log('Server up'))
// const io = new Server(serverHttp)

// app.set("socketio", io)

// io.on('connection', socket => {
//     console.log('Se ha realizado una conexion')
//     socket.on('productList', data => {
//         // let productsUpdated = await products.addProducts(data)
//         io.emit('updateProducts', data)
//     })
// })

try {
    await mongoose.connect('mongodb+srv://Alduin:alduin@cluster0.tq1ixbp.mongodb.net/ecommerce',
    {useUnifiedTopology: true}
    )
    console.log('Se ha realizado una conexion')
    const server = app.listen(port, () => console.log('Server up'))
    const io = new Server(server)
    app.use((req, res, next) => {
        req.io = io
        next()
    })
    app.set("socketio", io)

    io.on('connection', async socket => {
        
        socket.on('productList', data => {
            // let productsUpdated = await products.addProducts(data)
            io.emit('updateProducts', data)
        })

        let messages = (await messageModel.find()) ? await messageModel.find() : [];
        
        socket.broadcast.emit('alerta')
        socket.emit("logs", messages);
        socket.on("message", async (data) => {
          messages.push(data);
          await messageModel.create(data)
          io.emit("logs", messages)
        })



    })


//Lista productos
app.get('/products', async (req, res) => {
    // res.render('home', {nombre_vista: 'Productos'})
    res.render('home', { products: await products.getProducts()} )
})

//Lista real time products
app.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts', { products: await products.getProducts()} )
    // res.render('realTimeProducts', {nombre_vista: 'RrealTimeProducts'})
})


//middleware

//para servidores externos
app.use(cors())

app.use(express.static('./src/public'))

app.get('/', (req, res) => res.status(201).send({message: 'server ok'}))


app.use('/api/products', productsRouter)

app.use('/api/carts', cartsRouter)

app.use('/mongoose', viewsRouter)

app.use('/session', sessionRouter)

}catch(err){
    console.log(err.message)
}



 


// app.listen(8080, () => console.log('Server up'))


// io.on("connection", socket => {
//     console.log('A new client has connected to the Server')
//     socket.on('productList',async(data) => {
//         let products = await productManager.addProducts(data)
//         io.emit('updatedProducts', products)
//     })
// })















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
