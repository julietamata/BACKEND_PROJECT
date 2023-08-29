import dotenv from 'dotenv'
dotenv.config()

export default{
    port: process.env.PORT,
    uri: process.env.MONGO_URI,
    dbname: process.env.MONGO_DB_NAME
}