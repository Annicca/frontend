import { getRequestConfig } from "./getRequestConfig";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";

export const useCities = () => {
    const [cities, setCities] = useState([])

    useEffect(() => {
        const getCitiesData = async() =>
        await axios.get("http://localhost:8080/api/cities", getRequestConfig())
        .then((resp) => {
            console.log(resp.data);
            setCities(resp.data)

        }).catch((error) => console.log(error));

        getCitiesData();
    },[])
    const options = useMemo(()=>        
        cities.map(item =>
            item
        // item ={
        //     label: item.city,
        //     value: item.idCity
        // }
    ))

    return options;
}