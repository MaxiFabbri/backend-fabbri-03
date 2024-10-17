import mongoose from 'mongoose'

mongoose.pluralize(null)

const collection = 'products'

const schema = new mongoose.Schema({
    title: {type: String, required: true },
    description: {type: String, required: true },
    code: {type: String, required: true },
    price: {type: Number, required: true },
    status: {type: Boolean, required: false},
    stock: {type: Number, required: true },
    category: {type: String, required: true }
})

const productModel = mongoose.model(collection, schema)

export default productModel