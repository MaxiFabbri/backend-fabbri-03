import productModel from "./models/product.model.js"; 

class ProductController {
    constructor() {}

    // Metodo para ver productos con paginados, filtrados y ordenados
    get = async (limitNumber,pg,filter,sort) => {
        try {
            return await productModel.paginate(filter, {
                limit: limitNumber,
                 page: pg,
                 sort: sort,
                 lean: true});
        } catch (err) {
            return err.message;
        }
    }

    // Metodo para Cargar un producto
    add = async (data) => {
        try {
            return await productModel.create(data);
        } catch (err) {
            return err.message;
        }
    }

    // Metodo para actualizar un producto
    update = async (filter, updated, options) => {
        try {
            return await productModel.findOneAndUpdate(filter, updated, options);
        } catch (err) {
            return err.message;
        }
    }

    // Metodo para eliminar un producto
    delete = async (filter, options) => {
        try {
            return await productModel.findOneAndDelete(filter, options);
        } catch (err) {
            return err.message;
        }
    }
}


export default ProductController;