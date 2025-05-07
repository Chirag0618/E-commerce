import Swal from "sweetalert2"

export const addToCart = (item, quantity) => async (dispatch, getState) => {


    let cart_items = getState().cartStore.cart_items
    let itemExists = cart_items.find(cartItem => cartItem.product == item._id)

    if (!itemExists) {

        let cart_item = {
            product: item._id,
            product_name: item.product_title,
            product_price: item.product_price,
            product_image: item.product_image,
            count_in_stock: item.count_in_stock,
            quantity: quantity
        }
        await dispatch({ type: "ADD_TO_CART", payload: cart_item })
        Swal.fire('Congrats!', `${item.product_title} has been added to cart`, 'success')

        localStorage.setItem('cart_items', JSON.stringify(getState().cartStore.cart_items))
    }
    else {
        Swal.fire('ALERT', 'Item already in cart. Add another?', 'question')
            .then(async result => {
                if (result.isConfirmed) {
                    let new_quantity = Number(itemExists.quantity) + Number(quantity)
                    if (new_quantity > item.count_in_stock) {
                        Swal.fire('Error', 'Could not add to cart because quantity exceeded the stock. ', 'warning')
                    }
                    else {
                        let cart_item = { ...itemExists, quantity: new_quantity }
                        await dispatch({ type: "UPDATE_CART", payload: cart_item })
                        Swal.fire('Congrats!', `${item.product_title} quantity has been inceased in cart`, 'success')

                        localStorage.setItem('cart_items', JSON.stringify(getState().cartStore.cart_items))
                    }
                }
            })
    }
}

export const removeItemFromCart = id => (dispatch, getState) => {
    Swal.fire("Alert!", 'Are You Sure?', 'question')
        .then(async result => {
            if (result.isConfirmed) {
                await dispatch({ type: "REMOVE_FROM_CART", payload: id })
                Swal.fire('Congrats!', `Item removed from cart`, 'success')

                localStorage.setItem('cart_items', JSON.stringify(getState().cartStore.cart_items))
            }
        })
}

export const updateCart = (item, quantity) => async (dispatch, getState) => {
    let cart_item = { ...item, quantity: quantity }
    await dispatch({ type: "UPDATE_CART", payload: cart_item })
    Swal.fire('Congrats!', `Cart has been updated`, 'success')

    localStorage.setItem('cart_items', JSON.stringify(getState().cartStore.cart_items))
}

export const saveShippingInfo = (shipping_info) => async (dispatch, getState) => {
    await dispatch({type: "SAVE_SHIPPING_INFO", payload: shipping_info})
    Swal.fire('Congrats!', "Shipping info saved", 'success')
    localStorage.setItem('shipping_info', JSON.stringify(getState().cartStore.shipping_info))
}

export const emptyCart = () => async(dispatch, getState) =>{
    await dispatch({type: "EMPTY_CART"})
    localStorage.removeItem('cart_items')
}