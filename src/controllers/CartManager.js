import {promises as fs} from  'fs';
import { nanoid } from 'nanoid';
import ProductManager from './ProductManager.js';

const productALL = new ProductManager

class CartManager {
    constructor() {
        this.path ="./src/models/carts.json";
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)
    }

    writeCarts = async (carts) => {
        await fs.writeFile(this.path ,JSON.stringify(carts))
    }

    exist = async (id) => {
        let carts = await this.readCarts()
        return carts.find(carts => carts.id === id)
    }

    getCartsById = async (id) => {
        let CartsById = await this.exist(id)
        if (!CartsById) return "Carrito no encontrado"
        return CartsById
    };

    addCarts = async () => {
        let cartOld = await this.readCarts();
        let id = nanoid()
        let cartsConcat = [{id : id, products :{}}, ...cartOld]
        await this.writeCarts(cartsConcat)
        return "Carrito Agregado"
    }

    addProductInCart = async (cartId, productId)=> {
        let CartsById = await this.exist(id)
        if (!CartsById) return "Carrito no encontrado"
        let ProductsById = await productALL.exist(productId);
        if (!ProductsById) return "Producto no encontrado"

        let cartAll = await this.readCarts()
        let cartFilter =  cartAll.filter(cart => cart.id != cartId)

        if(!CartsById.products.some(prod => prod.id === productId)){
            let addProductInCart = CartsById.products.find(prod => prod.id === productId)
            addProductInCart.cantidad++
            let cartsConcat = [addProductInCart, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "Producto sumado al carrito"
        }

        CartsById.products.push({ id: ProductsById.id, cantidad: 1})

        let cartsConcat = [CartsById, ...cartFilter];
        await this.writeCarts(cartsConcat)
        return "Producto Agregado al carrito"
    }
}

export default CartManager;