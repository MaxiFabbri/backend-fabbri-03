import productModel from "./models/product.model.js"; 

class ProductController {
    constructor() {}

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


    add = async (data) => {
        try {
            return await productModel.create(data);
        } catch (err) {
            return err.message;
        }
    }

    update = async (filter, updated, options) => {
        try {
            return await productModel.findOneAndUpdate(filter, updated, options);
        } catch (err) {
            return err.message;
        }
    }

    delete = async (filter, options) => {
        try {
            return await productModel.findOneAndDelete(filter, options);
        } catch (err) {
            return err.message;
        }
    }
}


export default ProductController;