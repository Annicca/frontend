import { useEffect, useMemo, useState} from "react"
import { getBasket } from "../components/helpers/getBasket";

export const useFindOrderItem = (orderItem) =>{
    const [basket, setBasket] = useState()
    const store = require('store');
    const user = store.get('user');
    const id = user?.idUser;
    let url = `http://localhost:8080/api/basket`;
    useEffect(()=>{
        if(user){
           getBasket(url, id,setBasket) 
        }
        
    }, [orderItem?.size, orderItem?.date])
    const itemInBasket = useMemo(()=>{
        return basket?.shoppingCart?.
        filter(item => (item.size && item.size.amount !== 0) || (item.date && !item.date.free))
        .find(item =>(item.attributes && item.attributes.id === orderItem.attributes?.id && item.size.idSize === orderItem?.size?.idSize) || (item.services && item.services.id === orderItem.services?.id && item.date.idDate === orderItem?.date?.idDate))
    }, [orderItem?.size,  orderItem?.date])
    return itemInBasket
}