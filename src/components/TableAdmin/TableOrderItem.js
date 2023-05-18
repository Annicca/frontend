import React, {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchForm } from "../SearchForm/SearchForm";
import axios from "axios";
import { getRequestConfig } from "../helpers/getRequestConfig";
import { Image } from "../img/Image";
import { tableUsersImg, tableOrders } from "../../Constant";
import {transformDate} from "../helpers/transformDate";
import { useParams } from "react-router";

export const TableOrders = () =>{

    const location = useLocation().pathname;
    let navigate = useNavigate(); 
    let {id} = useParams();

    const change = (id) =>{ 
      navigate(`${location}/${id}`);
    }

    const [items, setItems] = useState();
    const [idSearch, setIdSearch] = useState('');
  
    let url = `http://localhost:8080/api/orderitem/${id}`;
    // const urlSearch = `https://localhost:44344/api/users/userLogin/${loginSearch}`;

    useEffect(() => {
  
        //   const urlData = handleValue(idSearch, url, urlSearch);
          const getOrderItems = async (urlData) => {
            const response = await axios(urlData, getRequestConfig());
            setOrders(response.data);
            console.log(response.data);
          };
          getOrderItems(url);
  
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
              <td>{transformDate(order.dateOrder)}</td>
              <td>{transformDate(order.dateArrival)}</td>
              <td>{order.address}</td>
              <td>{order.cost}</td>
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