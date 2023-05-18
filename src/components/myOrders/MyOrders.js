import React,{useState, useEffect} from "react";
import axios from "axios";
import { getRequestConfig } from "../helpers/getRequestConfig";
import { TitlePage } from "../TitlePage/TitlPage";
import { MyOrder } from "./MyOrder";
import Pagination from "react-js-pagination";
import { handlePageChange } from "../helpers/handlePageChange";


export const MyOrders = () =>{

    const store = require('store');
    const user = store.get('user');
    const id = user?.idUser;

    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState({
        activePage:0,
        totalPages: null,
        itemsCountPerPage:null,
        totalItemsCount:null
    })
    let url = `http://localhost:8080/api/orders/user/${id}`;
    
    const getOrder = async (pageNumber) => {
        await axios(url +`?page=${pageNumber}`, getRequestConfig())
        .then((resp) => {
            console.log(resp.data);
            setOrders(resp.data.content);
            setPage({
             activePage: resp.data.number,
             totalPages: resp.data.totalPages,
             totalItemsCount: resp.data.totalElements,
             itemsCountPerPage: resp.data.size
            })
        })
        .catch((error) => {
            console.log(error);
            alert("Что-то пошло не так(")
        });

    };

    useEffect(() => {
        if(user){
          getOrder(0);  
        }
      }, [url]);

    const classnames = {
        container: 'main-container',
        request: 'request'
    }

    return(
        <div className={classnames.container}>
            <TitlePage title={'Мои заказы'} />
            { orders.length == 0 ?
                <h3 className={classnames.request}>У вас ещё нет заказов</h3> :
                orders?.map(order =>
                    <MyOrder key = {order.idOrder} orderInit = {order} />
            )}
            {page.totalPages >= 2 && <Pagination
                hideNavigation
                activePage={page.activePage+1}
                itemsCountPerPage={page.itemsCountPerPage}
                totalItemsCount={page.totalItemsCount}
                pageRangeDisplayed={10}
                innerClass = 'pager-list'
                onChange={(e)=>handlePageChange(e, setPage, getOrder)}
            />}
        </div>
    )
}