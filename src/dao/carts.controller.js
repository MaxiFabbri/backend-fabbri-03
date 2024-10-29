import cartModel from "./models/cart.model.js";
import productModel from "./models/product.model.js";

class CartController {
    constructor() {}

    get = async (filter) => {
        try {
            return await cartModel.find(filter).populate({ path: 'product._id', model: productModel }).lean()
        } catch (err) {
            return err.message;
        }
    }

    // Metodo para crear un Carrito Vacío
    add = async () => { 
        try {
            return await cartModel.create({product: []});
        } catch (err) {
            return err.message;
        }
    }

    // Metodo para actualizar la cantidad de 1 producto
    updateOne = async (cartId, prodId, newQty) => {
        try {
            const cart = await cartModel.findById(cartId); // Encuentra el carrito por ID

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
            // Encuentra el producto en el carrito
            const productIndex = cart.product.findIndex(prod => prod._id == prodId);

            if (productIndex === -1) {
                // Si el producto no está en el carrito, Envío mensaje
                throw new Error('Producto no encontrado');
            } else {
                // Si el producto ya está en el carrito, actualiza la cantidad
                cart.product[productIndex].qty = newQty;
            }

            // Guarda la actualización
            const updatedCart = await cart.save();
            return updatedCart;

        } catch (err) {
            return err.message;
        }
    }

    // Metodo para actualizar TODOS los productos del carro
    updateAll = async (filter, updated, options) => {
        try {
            return await cartModel.findOneAndUpdate(filter, updated, options )   
        } catch (err) {
            return err.message;
        }
    }

    // Metodo para agregar productos al carrito o modificar la cantidad
    // Estos metodos tienen mas logica en los mismos de la que me hubiera gustado, pero no encontré otra forma de modificar el Array interior
    updateProd = async (cartId, newProductId) => {
        try {
            const cart = await cartModel.findById(cartId); // Encuentra el carrito por ID
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
            // Encuentra el producto en el carrito
            const productIndex = cart.product.findIndex(prod => prod._id == newProductId);

            if (productIndex === -1) {
                // Si el producto no está en el carrito, agrégalo
                cart.product.push({ _id: newProductId, qty: 1 });
            } else {
                // Si el producto ya está en el carrito, actualiza la cantidad
                cart.product[productIndex].qty += 1;
            }

            // Guarda la actualización
            const updatedCart = await cart.save();
            return updatedCart;

        } catch (error) {
            console.error('Error al agregar o actualizar producto en el carrito:', error);
        }
    };
    
    // Metodo para borrar UN producto del carro
    deleteProd = async (cartId, productId) => {
        try {
            const cart = await cartModel.findById(cartId); // Encuentra el carrito por ID
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
    
            // Encuentra el producto en el carrito
            const productIndex = cart.product.findIndex(prod => prod._id == productId);

            if (productIndex === -1) {
                // Si el producto no está en el carrito, Error
                throw new Error('Producto no encontrado');
            } else {
                // Si el producto ya está en el carrito, lo elimina
                cart.product.splice(productIndex,1)
            }

            // Guarda la actualización
            const updatedCart = await cart.save();
            console.log('Carrito actualizado:', updatedCart);
            return updatedCart;

        } catch (error) {
            console.error('Error al agregar o actualizar producto en el carrito:', error);
        }
    }

}


export default CartController;