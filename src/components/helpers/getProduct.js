import axios from "axios";

export const getProduct = async (url, setProduct, setOrderItem, orderItem, link) => {
    await axios.get(url)
    .then((resp)=>{
        console.log(resp.data);
        setProduct(resp.data);
        if(link === "attributes"){
            setOrderItem({
                ...orderItem,
                attributes : resp.data,
            })
        } else if(link === "services"){
            setOrderItem({
                ...orderItem,
                services : resp.data,
            })
        }
    })
    .catch((e)=>{
        console.log(e)
        alert("Что-то пошло не так(")
    })
};