import axios from "axios";
import { getRequestConfig } from "./getRequestConfig";

export const addToBasket = async(idUser, orderItem) =>{
    return await axios.post(`http://localhost:8080/api/basket/${idUser}`, orderItem, getRequestConfig())
    .then((resp) => {
        console.log(resp.data)
        return new Promise(resolve => resolve(resp.data))
    })
    .catch((error)=>{
        console.log(error)
        alert("Не удалось добавить в корзину(")
    })
}

export const updateInBasket = async(orderItem) =>{
    await axios.put(`http://localhost:8080/api/basket`, orderItem, getRequestConfig())
    .then((resp) => {
        console.log(resp.data)
    })
    .catch((e)=>{
        if(e.response.data.message){
            console.log(e)
            alert(e.response.data.message)
        }else{
            alert("Не удалось добавить в корзину(")
        }
    })
}

export const deleteFromBasket = async(id) =>{
    await axios.delete(`http://localhost:8080/api/basket/${id}`, getRequestConfig())
    .then((resp) => {
        console.log(resp)
    })
    .catch((e)=>{
        if(e.response.data.message){
            console.log(e)
            alert(e.response.data.message)
        }else{
            alert("Не удалось удалить из корзины(")
        }
    })
}