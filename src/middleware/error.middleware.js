import { EErrors } from "../services/errors/enum.js";

export default (error, req, res, next) => {
    console.log(error.cause)
    switch(error.code) {
        case EErrors.INVALID_TYPIES_ERROR:
            res.status(400).send({status: 'error', error: error.namme})
            break
        default: 
            res.send( {status: 'error', error: 'Unhandled error'})
            break
    }
}