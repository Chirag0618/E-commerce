import { API } from "../config"

export const getAllCategories=()=>{
    return fetch(`${API}/getallcategories`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const addCategory = (category, token) => {
    return fetch(`${API}/addcategory`, {
        method:"POST",
        headers:{
            Accept: "application/json", 
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(category)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const editCategory = (id, category, token) => {
    return fetch(`${API}/updatecategory/${id}`, {
        method:"PUT",
        headers:{
            Accept: "application/json", 
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(category)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const getCategoryDetails = (id) => {
    return fetch(`${API}/getcategorydetails/${id}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const deleteCategory = (id, token) => {
    return fetch(`${API}/deletecategory/${id}`,{
        method: "DELETE",
        headers:{
            Authorization: token
        }
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}