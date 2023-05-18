import React, {useState, useEffect} from "react";
import { TitlePage } from "../TitlePage/TitlPage";
import { MyCompetitionList } from "./MyCompetitionList";
import { useNavigate } from "react-router-dom";
import { getRequestConfig } from "../helpers/getRequestConfig";
import Pagination from "react-js-pagination";
import { handlePageChange } from "../helpers/handlePageChange";
import axios from "axios";

export const MyCompetition = () =>{

    const store = require('store');
    const user = store.get('user');
    const id = user.idUser;

    let navigate = useNavigate();

    const [competitions, setCompetitions] = useState([]);
    const [page, setPage] = useState({
        activePage:0,
        totalPages: null,
        itemsCountPerPage:null,
        totalItemsCount:null
    })
   
    let url = `http://localhost:8080/api/mycompetitions/${id}`;

    const getMyCompetitions = async (pageNumber) => {
        await axios(url+`?page=${pageNumber}`, getRequestConfig())
        .then((resp) =>{
            console.log(resp.data);
            setCompetitions(resp.data.content);
            setPage({
                activePage: resp.data.number,
                totalPages: resp.data.totalPages,
                totalItemsCount: resp.data.totalElements,
                itemsCountPerPage: resp.data.size
            })  
        })
        .catch((error) => {
            console.log(error);
            if(error.response){
              alert(error.response.data.message)
            } else{
              alert("Что-то пошло не так(")
            }
        });

    }

    useEffect(() => {
        if(!user || user.role !== "ORGANIZER"){
            navigate('/notfound');
        }
        getMyCompetitions(0);
      }, []);

    const classnames = {
        container: 'main-container',
        request: 'request'
    }

    return(
            <div className={classnames.container}>
                <TitlePage title={'Мои конкурсы'} />
                { competitions.length == 0 ?
                <h3 className={classnames.request}>У вас ещё нет конкурсов</h3> :
                <MyCompetitionList competitions={competitions} setCompetitions = {setCompetitions} page={page.activePage}  />
                }
                {page.totalPages >= 2 && <Pagination
                hideNavigation
                activePage={page.activePage+1}
                itemsCountPerPage={page.itemsCountPerPage}
                totalItemsCount={page.totalItemsCount}
                pageRangeDisplayed={10}
                innerClass = 'pager-list'
                onChange={(e)=>handlePageChange(e, setPage, getMyCompetitions)}
                />}
            </div>
    )
}