import { updateInBasket, addToBasket, deleteFromBasket } from "../helpers/basketFunctions";

export const handleBasketActive = async(userAuth, orderItem, setOrderItem, setBasketActive) =>{
    if(!userAuth){
        alert('Пожалуйста авторизируйтесь')
    } else{
        if(!orderItem.size && !orderItem.date){
            alert("Выберете размер или дату")
        }
        else{

            await addToBasket(userAuth?.idUser, {...orderItem, count: 1})
            .then((res)=>{
                console.log(res)
                if(res){
                    setBasketActive(true);
                    setOrderItem({...res})
                }
            })

        }
    }
}

export const handleAmountMinus = async(userAuth, orderItem, setOrderItem, setBasketActive, link) =>{
    if(!userAuth){
        alert('Пожалуйста авторизируйтесь')
    } else{
        if(!orderItem.size && !orderItem.date){
            alert("Выберете размер или дату")
        }
        else{
            if(orderItem.count > 1 ){
                await updateInBasket({...orderItem, count: orderItem.count - 1})
                .then(()=>{
                    setOrderItem({...orderItem, count: orderItem.count - 1})
                })
            }else if(orderItem.count === 1 || link === "services"){

                await deleteFromBasket(orderItem.idOrderItem)
                .then(()=> {
                    setOrderItem({
                        ...orderItem,
                        date: null,
                        size: null,
                        count: 0
                    })
                    setBasketActive(false)
                })
            }
        }
    }
    
}

export const handleAmountPlus = async (userAuth, orderItem, setOrderItem) =>{
    if(!userAuth){
        alert('Пожалуйста авторизируйтесь')
    } else{
        if(!orderItem.size && !orderItem.date){
            alert("Выберете размер или дату")
        }
        else{
            if(orderItem.count + 1 <= orderItem.size.amount)
            await updateInBasket({...orderItem, count: orderItem.count + 1})
            .then(()=>
                setOrderItem({...orderItem, count: orderItem.count + 1})
            )
        }
    }
}

export const handleOption = async (option, orderItem, setOrderItem, link) =>{
    if(link === "attributes"){
        setOrderItem({
            ...orderItem,
            size: option,
            count: 0
        })
    } else if(link === "services"){
        setOrderItem({
            ...orderItem,
            date: option,
        })
    }
}