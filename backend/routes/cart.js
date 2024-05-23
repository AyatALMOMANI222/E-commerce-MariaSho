const express =require("express")
const {updateCartItem,getCartProduct,addToCart,getCartByCartId,deleteProductFromCart} =require("../controller/cart")
const auth =require("../middlewear/authentication")
const cartRouter =express.Router()
cartRouter.post("/",auth,addToCart)
cartRouter.get("/",auth,getCartByCartId)
cartRouter.get("/cartproduct",auth,getCartProduct)
cartRouter.delete("/del/:productId",auth ,deleteProductFromCart)
cartRouter.put("/",auth,updateCartItem)

module.exports=cartRouter