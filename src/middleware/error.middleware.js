import { EErrors } from "../services/errors/enum.js";

export default (error, req, res, next) => {
    console.log(error.cause)
    switch(error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            res.status(400).send({status: 'error', error: error.namme})
            break
        case EErrors.ROUTING_ERROR:
            res.status(400).send({status: 'error', error: error.namme})
            break
        case EErrors.DATABASES_ERROR:
            res.status(500).send({status: 'error', error: error.namme})
            break
        case EErrors.INVALID_PRODUCT:
            res.status(500).send({status: 'error', error: error.namme})
            break
        case EErrors.INVALID_CART:
             res.status(500).send({status: 'error', error: error.namme})
             break
        default: 
            res.send( {status: 'error', error: 'Unhandled error'})
            break
    }
}