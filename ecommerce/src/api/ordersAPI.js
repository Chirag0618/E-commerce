import { API } from "../config"

export const getAllOrders = () => {
    return fetch(`${API}/getallorders`)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const processOrder = (id, status) => {
    return fetch(`${API}/updateorder/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const getMyOrders = (id) => {
    return fetch(`${API}/getorderbyuser/${id}`)
        .then(response => response.json())
        .catch(error => console.log(error))
}