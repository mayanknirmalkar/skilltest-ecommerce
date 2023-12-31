import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const cartSlice = createSlice({
    name:"cart",
    initialState: {
        cartItems: JSON.parse(sessionStorage.getItem("cart")) || []
    },
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item ) => item.id === action.payload)

            if(itemIndex != -1){
                state.cartItems[itemIndex].quantity += 1;
            }else{
                state.cartItems.push({ id:action.payload, quantity:1})
            }

            sessionStorage.setItem("cart", JSON.stringify(state.cartItems))
            toast.success("added to cart")
        },
        removeFromCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(( item ) => item.id === action.payload)

            if(itemIndex == -1){
                return toast.error("Not present in cart")
            }else{
                if( state.cartItems[itemIndex].quantity == 1){
                     state.cartItems.splice(itemIndex, 1)
                }else{
                    state.cartItems[itemIndex].quantity -= 1;
                }
                
            }
            sessionStorage.setItem("cart", JSON.stringify(state.cartItems))
            toast.success("removed from cart")
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;