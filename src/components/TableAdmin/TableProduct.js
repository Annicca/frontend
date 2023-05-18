import React,{useState, useEffect} from "react";
import {tableUsersImg} from "../../Constant";
import { Image } from "../img/Image";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { handleValue } from "../helpers/handleValue";
import { SearchForm } from "../SearchForm/SearchForm";
import { getRequestConfig } from "../helpers/getRequestConfig";
import Pagination from "react-js-pagination";
import { handlePageChange } from "../helpers/handlePageChange";

import './Table.scss';

export const TableProduct = ({path, urlDelete, tableProduct}) =>{

  const location = useLocation().pathname;
  let navigate = useNavigate(); 

  const change = (id) =>{ 
    navigate(`${location}/${id}`);
  }

    const [products, setProducts] = useState();
    const [idSearch, setIdSearch] = useState('');
    const [page, setPage] = useState({
      activePage:0,
      totalPages: null,
      itemsCountPerPage:null,
      totalItemsCount:null
  })
  
    let url = `http://localhost:8080/api/${path}`;
    let urlSearch = `http://localhost:8080/api/${path}/search/${idSearch}`;


    const getProducts = async (pageNumber) => {
      let urlData = handleValue(idSearch,url,urlSearch)
      await axios(urlData+`?page=${pageNumber}`, getRequestConfig())
      .then((resp)=>{
        setProducts(resp.data.content);
        console.log(resp.data);
        setPage({
          activePage: resp.data.number,
          totalPages: resp.data.totalPages,
          totalItemsCount: resp.data.totalElements,
          itemsCountPerPage: resp.data.size
         })
      })
      .catch((error)=>{
        console.log(error);
        alert("Что-то пошло не так(")
      })

    };

    useEffect(() => {
      getProducts(0);
    }, [idSearch, url]);
  
    const deleteProduct = async(idProduct,e)  =>{
          e.preventDefault();
          
          if(window.confirm("Вы действительно хотите удалить атрибутику или услугу?")){
              await axios.delete(`http://localhost:8080/api/`+`${urlDelete}`+`/${idProduct}`, getRequestConfig())
              .then((resp) =>{
                  console.log(resp.data);
                  alert(resp.data)
              })
              .catch((error)=>{
                  console.log(error);
                  if(error.response.data){
                    alert(error.response.data.message);
                  }else{
                    alert("Что-то пошло не так(")
                  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
              })
             getProducts(0)
              // setIdSearch('')
          }
    };
  
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
              <td colSpan={tableProduct.length}>
                <button className = {classnames.addButton} onClick={()=>navigate('/products/add')}>+</button>
              </td>
            </tr>
            <tr>
              {tableProduct.map((item,index) =>
                <th key = {index}>{item}</th>
              )}
            </tr>
            {products === undefined ? (<p>Loading...</p>) : products.map((product) => 
              <tr key = {product.id}>
                <td>{product.id}</td>
                <td>{product.seller.surnameUser +" " + product.seller.nameUser +" " + product.seller.patronimycUser}</td>
                <td>{product.title}</td>
                {product.amount && <td className="table__amount">{product.amount}</td>}
                <td>{product.cost}</td>
                <td>
                  <button className = {classnames.tableButton} onClick={() => change(product.id)}>
                    <Image 
                      src = {tableUsersImg[0].src}
                      alt = {tableUsersImg[0].alt}/>
                  </button>
                </td>
                <td>
                <button className = {classnames.tableButton} onClick={(e) => deleteProduct(product.id, e)}>
                
                  <Image 
                      src = {tableUsersImg[2].src}
                      alt = {tableUsersImg[2].alt} 
                      width = {30} height = {30} />
                  </button>
                </td>
               </tr>
            )}
          </tbody>
        </table> 
        {page.totalPages >= 2 && <div className="main-container">
                <Pagination
                hideNavigation
                activePage={page.activePage+1}
                itemsCountPerPage={page.itemsCountPerPage}
                totalItemsCount={page.totalItemsCount}
                pageRangeDisplayed={10}
                innerClass = 'pager-list'
                onChange={(e)=>handlePageChange(e, setPage, getProducts)}
                />
        </div>}
        </>
      )
  }