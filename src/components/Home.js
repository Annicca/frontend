import React, {useState, useEffect} from 'react';
import { GroupList } from './group/Group';
import { SearchForm } from './SearchForm/SearchForm';
import { handleValue } from './helpers/handleValue';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { handlePageChange } from './helpers/handlePageChange';
import axios from 'axios';

import './group/Group.scss';


export const Home = ()=>{

  const store = require('store');
  const userAuth = store.get('user');

  const [groups, setGroups] = useState([]);
  const [city, setCity] = useState('');
  const [message, setMessage] = useState("")
  const [page, setPage] = useState({
      activePage:0,
      totalPages: null,
      itemsCountPerPage:null,
      totalItemsCount:null
  })
  
  const url = "http://localhost:8080/api/groups";
  const urlSearch = `http://localhost:8080/api/groups/search/`+`${city}`;

  const dataFetch = async (pageNumber) => {
    const urlData = handleValue(city, url, urlSearch);
    await axios.get(urlData+`?page=${pageNumber}`)
    .then((resp) => {
     console.log(resp.data);
     setGroups(resp.data.content);
     setPage({
      activePage: resp.data.number,
      totalPages: resp.data.totalPages,
      totalItemsCount: resp.data.totalElements,
      itemsCountPerPage: resp.data.size
     })
     
     if(resp.data.content.length == 0){
      setMessage("В этом городе нет коллективов")
     }else{
      setMessage("")
     }
    })
    .catch((error) => {
        console.log(error);
        if(error.response){
          setMessage(error.response.data.message)
        } else{
          alert("Что-то пошло не так(")
        }
    });
 };

 useEffect(() => {
  dataFetch(0);
  // console.log(page)
 }, [city]);

  const classnames = {
    container: 'main-container',
    groupList: 'main-container-list',
    inputContainer: 'input-container',
    rightContainer: 'input-container__right',
    button: 'competition-button-container_participant',
    buttonRight: 'input-container__button-filter'
  }

  return (
      <>
        <div className={classnames.inputContainer}>
          { userAuth?.idRole !== 4  ?
          <Link to='/statement' className = {classnames.button}>+Разместить свой коллектив</Link>
          : <div></div>
          }
          <SearchForm searchText={'Введите город'} setValue = {setCity} />
        </div>
        {message ? 
        <div className={classnames.container}>
          <p className='request__city'>{message}</p>
        </div>
         :
        <GroupList groups = {groups} classnames= {classnames} />}
        {page.totalPages >=2 && <div className={classnames.container}>
         <Pagination
          hideNavigation
          activePage={page.activePage+1}
          itemsCountPerPage={page.itemsCountPerPage}
          totalItemsCount={page.totalItemsCount}
          pageRangeDisplayed={10}
          innerClass = 'pager-list'
          onChange={(e)=>handlePageChange(e, setPage, dataFetch)}
          />
        </div>}
      </>
  )
}