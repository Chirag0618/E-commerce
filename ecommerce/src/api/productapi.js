import { API } from "../config"

export const getAllProducts = (filter) => {
    return fetch(`${API}/getallproducts`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filter)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const addProduct = (product, token) => {
    return fetch(`${API}/addproduct`, {
        method: 'POST',
        headers: {
            Authorization: `${token}`
        },
        body: product
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const editProduct = (id, product, token) => {
    return fetch(`${API}/updateproduct/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `${token}`
        },
        body: product
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const getProductDetails = (id) => {
    return fetch(`${API}/getproductdetails/${id}`)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const getRelatedProducts = (id) => {
    return fetch(`${API}/getrelatedproducts/${id}`)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const deleteProduct = (id, token) => {
    return fetch(`${API}/deleteproduct/${id}`,{
        method: "DELETE",
        headers:{
            Authorization: token
        }
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

