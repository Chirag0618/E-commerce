const initialData = {
    cart_items: []
}

const cartReducer = (state = initialData, action) => {
    switch(action.type){
        case "ADD_TO_CART":
            return{
                ...state,
                cart_items: [...state.cart_items, action.payload]
            }

        case "REMOVE_FROM_CART":
            return{
                ...state,
                cart_items: state.cart_items.filter(item => item.product != action.payload)
            }

        case "UPDATE_CART":
            return {
                ...state,
                cart_items: state.cart_items.map(item => {
                    return item.product === action.payload.product ? action.payload : item
                })
            }

        case "EMPTY_CART":
            return {
                ...state,
                cart_itens: []
            }

        case "SAVE_SHIPPING_INFO":
            return{
                ...state,
                shipping_info: action.payload
            }

        default: 
            return state
    }
}

export default cartReducer