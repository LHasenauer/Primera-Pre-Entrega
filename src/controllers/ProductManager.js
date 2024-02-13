import {promises as fs} from  'fs';
import { nanoid } from 'nanoid';

class ProductManager {
    constructor() {
        this.path ="./src/models/products.json";
    }

    readProducts = async () => {
        let products = await fs.readFile(this.path, "utf-8")
        return JSON.parse(products)
    }

    writeProducts = async (product) => {
        await fs.writeFile(this.path ,JSON.stringify(product))
    }

    addProducts = async (product) => {
        let productsOld = await this.readProducts();
        product.id = nanoid();
        let productALL = [...productsOld, product];
        await this.writeProducts(productALL);
        return "Producto Agregado";
    };

    getProducts = async () => {
        return await this.readProducts()
    };

    exist = async (id) => {
        let products = await this.readProducts()
        return products.find(prod => prod.id === id)
    }

    getProductsById = async (id) => {
        let ProductsById = await this.exist(id)
        if (!ProductsById) return "Producto no encontrado"
        return ProductsById
    };

    UpdateProducts = async (id, product) => {
        let ProductsById = await this.exist(id)
        if(!ProductsById) return 'Producto No Encontrado'
        await this.deleteProducts(id)
        let productsOld = await this.readProducts()
        let products = [{...product, id : id}, ...productsOld]
        await this.writeProducts(products)
        return "Producto Actualizado"
    }

    deleteProducts = async (id) => {
        let products = await this.readProducts();
        let existProducts = products.some(prod => prod.id === id)
        if (existProducts) {
            let filterProducts = products.filter(prod => prod.id != id)
            await this.writeProducts(filterProducts)
            return 'Eliminado Correctamente'
        }
        return "El Producto a Eliminar no existe"
    }
}

export default ProductManager;
