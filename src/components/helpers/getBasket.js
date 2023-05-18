import axios from "axios";
import { getRequestConfig } from "./getRequestConfig";

export const getBasket = async(url, id, setOrder) =>{
    await axios(url+`/${id}`, getRequestConfig())
    .then((response) =>{
        console.log(response.data);
        setOrder(response.data)
    })
    .catch((e) => {
        console.log(e)
        alert("Что-то пошло не так")
    })
}