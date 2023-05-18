export const chooseCategory = (category) =>{
    switch(category){
        case "MAKEUP" : 
            return "Макияж";
        case "PRINT":
            return "Печать";
        case "SEWING":
            return "Пошив";
        case "HAIRSTYLES" :
            return "Прически";
        case "ACCESSORIES" :
            return "Аксессуары";
        case "COSMETICS":
            return "Косметика";
        case "SHOES":
            return "Обувь";
        case "UPPER_CLOTHING":
            return "Верх";
        case "LOWER_CLOTHING" :
            return "Низ";
    }
}