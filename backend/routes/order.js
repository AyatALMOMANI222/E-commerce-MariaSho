const express =require("express")
// const {updateCartItem,getCartProduct,addToCart,getCartByCartId,deleteProductFromCart} =require("../controller/cart")
const auth =require("../middlewear/authentication")
const orderRouter =express.Router()
// cartRouter.post("/",auth,addToCart)

module.exports=orderRouter