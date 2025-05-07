import cartReducer from "./cartReducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk"


const rootReducer = combineReducers({
    cartStore: cartReducer
})

const initialData = {
    cartStore: {
        cart_items: localStorage.getItem('cart_items') ? JSON.parse(localStorage.getItem('cart_items')) : [],
        shipping_info: localStorage.getItem('shipping_info') ? JSON.parse(localStorage.getItem('shipping_info')) : {}
    }
}

const mystore = createStore(rootReducer, initialData, applyMiddleware(thunk))

export default mystore