import * as url from 'url';

const config = {
    PORT: 5050,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),

    get UPLOAD_DIR() {return `${this.DIRNAME}/public/uploads`},
    MONGODB_URI: 'mongodb+srv://mfabbri72:Mateo2001@dbmaxi.mghfagl.mongodb.net/atlas-db',
    //MONGODB_URI: 'mongodb://localhost:27017/local-db',
    USERS_COLLECTION: 'users',
    CART_COLLECTION: 'carts',
    PRODUCTS_COLLECTION: 'products'

};

export default config;
