
export const chooseStatusCompetition = (status) =>{
    switch(status){
        case "CREATED": 
            return "Набор участников";
        case "HELD": 
            return "Проводится";
        case "CANCELLED": 
            return "Отменен";
        case "FINISHED": 
            return "Окончен";
    }

}