import { API } from "../config"

export const register = (user) => {
    return fetch(`${API}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const verifyAccount = (token) => {
    return fetch(`${API}/verify/${token}`)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const forgetPassword = (email) => {
    return fetch(`${API}/forgetpassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const resetpassword = (password, token) => {
    return fetch(`${API}/resetpassword/${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const login = (user) => {
    return fetch(`${API}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const authenticate = (data) => {
    localStorage.setItem('jwt', JSON.stringify(data))
}

export const isAuthenticated = () => {
    return localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')) : false
}

export const logOut = () => {
    localStorage.removeItem('jwt')
    return fetch(`${API}/signout`)
        .then(response => response.json())
        .catch(error => console.log(error))
} 


export const getAllUsers = () =>{
    return fetch(`${API}/getalluser`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const updateAdmin = (id, role) => {
    return fetch(`${API}/updateuser/${id}`,{
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({role})
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}