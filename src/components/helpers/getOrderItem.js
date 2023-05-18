import React from "react"
import axios from "axios"

export const getOrderItem = async (url) =>{
    await axios.get(url)
    .then((resp)=>{
        console.log(resp.data)
        return resp.data
    })
    .catch((e)=>{
        console.log(e)
    })
}