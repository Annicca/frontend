export const getDate = (dateTime) =>{
    let d = dateTime.split("T");
    let resDate = d[0].split("-");
    let resTime = d[1].split(".");
    let date = resDate[2]+"."+resDate[1];
    let time = resTime[0].slice(0,5);

    return {
        date: date,
        time: time
    }
}