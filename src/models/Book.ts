import {Schema, model} from "mongoose";


export const BookSchema = new Schema({
    id: String,
    isbn: String,
    title: String,
    author: String,
    description: String,
    published_year: { type: Number, min: 1945, max: 2019 },
    publisher: String,
    updated_date: { type: Date, default: Date.now },
});

export const BookModel = model("Book", BookSchema);
