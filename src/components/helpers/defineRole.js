export const defineRole = (role) =>{
    switch(role){
        case "ADMIN": return "Администратор"
        case "CLIENT": return "Клиент"
        case "DIRECTOR": return "Руководитель коллектива"
        case "ORGANIZER": return "Организатор конкурса"
        default: return " "
    }
}