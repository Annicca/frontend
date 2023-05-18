import { updateInBasket, deleteFromBasket } from "../helpers/basketFunctions";

export const handleAmountMinus = async(orderItem, updateBasket) =>{
    if(orderItem.count > 1 ){
        await updateInBasket({...orderItem, count: orderItem.count -1})
        .then(()=>updateBasket())
    }
    
}
export const handleAmountPlus = async(orderItem, updateBasket) =>{
    if(orderItem.count + 1 <= orderItem.size.amount){
        await updateInBasket({...orderItem, count: orderItem.count + 1})
        .then(()=>updateBasket())
    }
}

export const deleteItem = async(id, updateBasket) =>{
    await deleteFromBasket(id)
    .then(()=>updateBasket())
}