import mongoose from "mongoose";

const ticketsCollection = "ticket"

const ticketSchema = new mongoose.Schema({
    code: {type: String, required: true, unique: true},
    purchase_datetime: {type: Date, default: Date.now, required: true},
    amount: {type: Number, required: true},
    purcharser: {type: String, required: true}
});

mongoose.set("strictQuery", false);
export const ticketsModel = moongose.model(ticketsCollection, ticketSchema)