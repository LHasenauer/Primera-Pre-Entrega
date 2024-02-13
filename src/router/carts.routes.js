import { Router } from "express";
import CartManager from "../controllers/CardManager.js";

const CartRouter = Router();
const carts = new  CartManager();

CartRouter.post("/", async (req, res) => {
    res.send(await carts.addCarts(req.body));
})

CartRouter.get( "/" ,async ( req ,res)=>{
    res.send(await carts.readCarts()) ;
})

CartRouter.get( "/:id" ,async ( req ,res)=>{
    let id = req.params.id
    res.send(await carts.getCartsById(id))
})

CartRouter.post("/:cid/products/:pid" ,async (req ,res)=>{
    let cardId = req.params.cid
    let productId = req.params.pid
    res.send (await carts.addProductInCart(cardId, productId))
})

export default CartRouter