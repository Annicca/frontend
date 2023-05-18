
export const chooseStatusOrder = (status) =>{
    switch(status){
        case "CREATE": 
            return "Оформлен";
            
        case "SENT": 
            return "Отправлен";
            
        case "CANCELLED": 
            return "Отменен";
            
        case "DELIVERED": 
            return "Доставлен";
        
        case "PAID":
            return "Оплачен";
        
        case "NOT_PAID":
            return "Не оплачен"

    }

}