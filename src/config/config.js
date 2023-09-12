import dotenv from 'dotenv'
dotenv.config()

export default{
    port: process.env.PORT,
    uri: process.env.MONGO_URI,
    dbname: process.env.MONGO_DB_NAME,
    persistance: process.env.PERSISTANCE,
    nodemailuser: process.env.NODEMAILER_USER,
    nodemailpass: process.env.NODEMAILER_PASS,
    twiliosid: process.env.TWILIO_ACCOUNT_SID,
    twiliotoken: process.env.TWILIO_AUTH_TOKEN,
    twiliophone: process.env.TWILIO_PHONE_NUMBER
}