import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import config from '../../config.js'

mongoose.pluralize(null)

const collection = config.PRODUCTS_COLLECTION

const schema = new mongoose.Schema({
    title: {type: String, required: true },
    description: {type: String, required: true },
    code: {type: String, required: true },
    price: {type: Number, required: true },
    status: {type: Boolean, required: false},
    stock: {type: Number, required: true },
    category: {type: String, required: true },
    thumbnails: {type:[String], required: false}
})
schema.plugin(mongoosePaginate)

const productModel = mongoose.model(collection, schema)

export default productModel