import mongoose from 'mongoose';
import config from '../../config.js';

// Anulamos comportamiento de renombre por defecto de colecciones
mongoose.pluralize(null);

// Indicamos nombre (verificar que coincida con la que deseamos usar en la bbdd),
// si no existe, Mongoose la crea.
const collection = config.USERS_COLLECTION;

// Generamos esquema, acá colocaremos la estructura de datos que nos interesa manejar
const schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true, index: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, enum: ['Male', 'Female'], default:'Female' },
    password: { type: String, required: true}
});

// Generamos modelo
const model = mongoose.model(collection, schema);

export default model;