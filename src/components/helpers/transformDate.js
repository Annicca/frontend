export const transformDate = (date) =>{
    let d = date.split("-").reverse();
    return d.join(".")

}