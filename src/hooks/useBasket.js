import { useEffect, useState } from "react";
import { getBasket } from "../components/helpers/getBasket";

export const useBasket = () =>{
    const [order, setOrder] = useState([]);
    const store = require('store');
    const user = store.get('user');
    const id = user.idUser;
    let url = `http://localhost:8080/api/basket`;
    useEffect(()=>{
        getBasket(url, id, setOrder);
    }, [id])
    return order
}

