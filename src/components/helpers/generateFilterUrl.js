export const generateFilterUrl = (url,city, filter) =>{
    url += `?`
    if(city !== ""){
        url += `cityCompetition=${city}&`
    }
    const keysFilter = Object.keys(filter)

    for(let key of keysFilter){
        if(filter[key]){
            url += `${key}=${filter[key]}&`
        }
    }
    return url;
}