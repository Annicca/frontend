import React from "react";
import { useState,useEffect } from "react";
import { tabletitle , tableUsersImg} from "../../Constant";
import { Image } from "../img/Image";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleValue } from "../helpers/handleValue";
import { SearchForm } from "../SearchForm/SearchForm";
import { getRequestConfig } from "../helpers/getRequestConfig";
import Pagination from "react-js-pagination";
import { handlePageChange } from "../helpers/handlePageChange";

import './Table.scss';


export const TableUser = () =>{

  let navigate = useNavigate(); 
  const change = (id) =>{ 
    let path = `/users/${id}`; 
    navigate(path);
  }

  const [data, setState] = useState([]);
  const [loginSearch, setLoginSearch] = useState('');
  const [page, setPage] = useState({
    activePage:0,
    totalPages: null,
    itemsCountPerPage:null,
    totalItemsCount:null
})

  const url = "http://localhost:8080/api/users"
  const urlSearch = `http://localhost:8080/api/users/search/${loginSearch}`;

  const getUsers = async (pageNumber) => {
    let urlData = handleValue(loginSearch, url, urlSearch);
    const resp = await axios(urlData+`?page=${pageNumber}`, getRequestConfig());
    setState(resp.data.content);
    setPage({
      activePage: resp.data.number,
      totalPages: resp.data.totalPages,
      totalItemsCount: resp.data.totalElements,
      itemsCountPerPage: resp.data.size
     })
  };
  
  useEffect(() => {
        getUsers(0);

  }, [loginSearch]);

  const deleteUser = (idUser,e)  =>{
        e.preventDefault();
        const url = `http://localhost:8080/api/users/${idUser}`;
        if(window.confirm("Вы действительно хотите удалить пользователя?")){
            axios.delete(url, getRequestConfig())
            .then((result) =>{
                console.log(result.data);
                setState(result.data.content)
                getUsers(0);
                alert("Успешно удалено")
            })
            .catch((error)=>{
                console.log(error);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
            })
        }
  };

  const classnames = {
        table: 'table',
        tableButton: 'table-button',
        addButton: 'table-button_add',
        status: 'status',
        message: 'table-message'
  }

    return(
      <>
        <SearchForm searchText = {'Введите логин'} setValue = {setLoginSearch} />
        {page.totalPages > 2 && <div className={classnames.container}>
          <Pagination
          hideNavigation
          activePage={page.activePage+1}
          itemsCountPerPage={page.itemsCountPerPage}
          totalItemsCount={page.totalItemsCount}
          pageRangeDisplayed={10}
          innerClass = 'pager-list'
          onChange={(e)=>handlePageChange(e, setPage, getUsers)}
          />
      </div>}
        {data === undefined ? (<p>Loading...</p>) : data.length === 0 ? <p className = {classnames.message} >Пользователи не найдены</p> : 
        <table className = {classnames.table}>
        
        <tbody>
          <tr>
            {tabletitle.map((item,index) =>
              <th key = {index}>{item}</th>
            )}
          </tr>
          {data.map((data) => 
            <tr key = {data.idUser}>
              <td>{data.loginUser}</td>
              <td>{data.surnameUser +" " + data.nameUser +" " + data.patronimycUser}</td>
              <td>{data.mailUser}</td>
              {data.phoneUesr != null ? <td>{data.phoneUser}</td> : <td>-</td> }
              <td>
                <button className = {classnames.tableButton} onClick={() => change(data.idUser)}>
                  <Image 
                    src = {tableUsersImg[0].src}
                    alt = {tableUsersImg[0].alt}/>
                </button>
              </td>
              <td>
              <button className = {classnames.tableButton} onClick={(e) => deleteUser(data.idUser, e)}>
              
                <Image 
                    src = {tableUsersImg[2].src}
                    alt = {tableUsersImg[2].alt} 
                    width = {30} height = {30} />
                </button>
              </td>
             </tr>
          )}
        </tbody>
      </table>}

      </>
    )
}