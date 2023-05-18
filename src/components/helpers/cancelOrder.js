import axios from "axios";
import { getRequestConfig } from "./getRequestConfig";

export const cancelOrder = async(order, setState) => {
    order  = {...order, statusOrder: "CANCELLED"}

    await axios.put(`http://localhost:8080/api/orders/cancel`,order, getRequestConfig())
    .then((resp) => {
        console.log(resp.data);
        setState(resp.data)
        alert("Заказ отменен")
    })
    .catch((error) => {
        console.log(error)
        if(error.response.data){
            alert(error.response.data.message)
        }else{
            alert("Что-то пошло не так(")
        }
    });
}