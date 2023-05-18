import React, {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchForm } from "../SearchForm/SearchForm";
import axios from "axios";
import { getRequestConfig } from "../helpers/getRequestConfig";
import { Image } from "../img/Image";
import { tableUsersImg, tableOrders } from "../../Constant";
import {transformDate} from "../helpers/transformDate";
import { chooseStatusOrder } from "../helpers/chooseStatusOrder";
import Pagination from "react-js-pagination";
import { handlePageChange } from "../helpers/handlePageChange";
import { handleValue } from "../helpers/handleValue";

export const TableOrders = ({path}) =>{

    const location = useLocation().pathname;
    let navigate = useNavigate(); 

    const change = (id) =>{ 
      navigate(`${location}/${id}`);
    }

    const [orders, setOrders] = useState();
    const [idSearch, setIdSearch] = useState('');
    const [page, setPage] = useState({
      activePage:0,
      totalPages: null,
      itemsCountPerPage:null,
      totalItemsCount:null
  })
  
    let url = `http://localhost:8080/api/${path}`;
    let urlSearch = `http://localhost:8080/api/${path}/search/${idSearch}`;

    const getOrders = async (pageNumber) => {
      const urlData = handleValue(idSearch, url, urlSearch);
      const resp = await axios(urlData+`?page=${pageNumber}`, getRequestConfig());
      setOrders(resp.data.content);
      console.log(resp.data);
      setPage({
        activePage: resp.data.number,
        totalPages: resp.data.totalPages,
        totalItemsCount: resp.data.totalElements,
        itemsCountPerPage: resp.data.size
       })
    };

    useEffect(() => {
          getOrders(0);
  
    }, [idSearch, url]);
  
    const classnames = {
          table: 'table',
          tableButton: 'table-button',
          addButton: 'table-button_add',
          status: 'status'
    }

    return(
        <>
        <SearchForm searchText = {'Введите №'} setValue = {setIdSearch} />
        { page.totalPages >= 2 && <div className="main-container">
          <Pagination
          hideNavigation
          activePage={page.activePage+1}
          itemsCountPerPage={page.itemsCountPerPage}
          totalItemsCount={page.totalItemsCount}
          pageRangeDisplayed={10}
          innerClass = 'pager-list'
          onChange={(e)=>handlePageChange(e, setPage, getOrders)}
          />
      </div>}
        <table className = {classnames.table}>
        <tbody>

          <tr>
            {tableOrders.map((item,index) =>
              <th key = {index}>{item}</th>
            )}
          </tr>
          {orders === undefined ? (<p>Loading...</p>) : orders.map((order,index) => 
            <tr key = {index}>
              <td>{order.idOrder}</td>
              <td>{order.customer.surnameUser +" " + order.customer.nameUser +" " + order.customer.patronimycUser}</td>
              <td>{chooseStatusOrder(order.statusOrder)}</td>
              <td>{transformDate(order.dateOrder)}</td>
              <td>{order.dateArrival ? transformDate(order.dateArrival) : "-"}</td>
              <td>{order.address}</td>
              <td>{order.statusPayment === "PAID" ? 
                  <Image 
                  src = "./icons/okActive.svg"
                  alt="ДА"
                  width = {30} height = {30}
                  className = {classnames.tableButton} />
                  :
                  <Image 
                  src = "./icons/delActive.svg"
                  alt="НЕТ"
                  width = {30} height = {30}
                  className = {classnames.tableButton} />
              }</td>
              <td>
                <button className = {classnames.tableButton} onClick={() => change(order.idOrder)}>
                  <Image 
                    src = {tableUsersImg[0].src}
                    alt = {tableUsersImg[0].alt}/>
                </button>
              </td>
             </tr>
          )}
        </tbody>
      </table> 
      </>
    )
}