import { useMemo } from "react";
import { useBasket } from "./useBasket"

export const useCountInBasket = () =>{
    const basket = useBasket();
    let count = 0;
    useMemo(()=>{
        return basket.shoppingCart?.forEach(item => {
            count+=item.count;
        });
    })
    return count;
}