import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {CompetitionList } from './competition/Competition';
import Pagination from 'react-js-pagination';
import { handlePageChange } from './helpers/handlePageChange';
import { SearchForm } from './SearchForm/SearchForm';
import { Image } from './img/Image';
import { Filter } from './filter/Filter';
import { generateFilterUrl } from './helpers/generateFilterUrl';
import axios from 'axios';

export const Competitions = ()=>{

  const [competitions, setCompetitions] = useState();
  const [city, setCity] = useState('');
  const [isFilter, setIsFilter] = useState(false);
  const [filter, setFilter] = useState({})
  const [message, setMessage] = useState('')
  const [page, setPage] = useState({
    activePage:0,
    totalPages: null,
    itemsCountPerPage:null,
    totalItemsCount:null
})

  const store = require('store');
  const userAuth = store.get('user');

  let url = "http://localhost:8080/api/competitions"

  const getCompetitions = async (pageNumber) => {
    let urlFilter = generateFilterUrl(url,city,filter)
    await axios.get(urlFilter+`page=${pageNumber}`)
    .then((resp) => {
      console.log(resp.data);
      setCompetitions(resp.data.content);
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
    
    getCompetitions(0)

  }, [city,filter,url]);


  const classnames = {
    container: 'main-container',
    list: 'main-container-list',
    inputContainer: 'input-container',
    button: 'input-container_button',

    competition: 'competition',
    imgContainer: 'competition-container',
    img : 'competition-container-img',
    info: 'competition-info',
    title: 'competition-info-title',
    name: 'competition-info-title-name',
    city: 'competition-info-title-city',
    status: 'competition-container__status',
    contact: 'contact',
    contactImg: 'contact-img',
    buttonContainer: 'competition-button-container',
    button: 'competition-button-container_participant',
    rightContainer: 'input-container__right',
    buttonRight: 'input-container__button-filter'
  }

  return (
      <>
        <div className={classnames.inputContainer}>
        { userAuth?.idRole != 3  ?
          <Link to='/statement' ><button className = {classnames.button}>+Разместить свой конкурс</button></Link>
          : <div></div>
        }
                  <div className={classnames.rightContainer}>
            <SearchForm searchText={'Введите город'} setValue = {setCity} />
              <div>
                <button className={classnames.buttonRight} onClick={()=>setIsFilter(!isFilter)}>
                  <Image src="./icons/filter.svg" alt="фильтр" />
                </button>
                <Filter active={isFilter} setIsFilter={setIsFilter} setFilter = {setFilter} />
              </div> 
          </div>
        </div>
        {message ? 
        <div className={classnames.container}>
          <p className='request__city'>{message}</p>
        </div>
         :
        <CompetitionList competitions = {competitions}  classnames = {classnames} />}
        {page.totalPages >=2 && <div className={classnames.container}>
         <Pagination
          hideNavigation
          activePage={page.activePage+1}
          itemsCountPerPage={page.itemsCountPerPage}
          totalItemsCount={page.totalItemsCount}
          pageRangeDisplayed={10}
          innerClass = 'pager-list'
          onChange={(e)=>handlePageChange(e, setPage, getCompetitions)}
          />
        </div>}
      </>
  )
}