import React, {useState, useEffect} from "react";
import { TitlePage } from "../TitlePage/TitlPage";
import { MyGroupList } from "./MyGroupList";
import { useNavigate } from "react-router-dom";
import { getRequestConfig } from "../helpers/getRequestConfig";
import { handlePageChange } from "../helpers/handlePageChange";
import Pagination from "react-js-pagination";
import axios from "axios";

export const MyGroup = () =>{

    const store = require('store');
    const user = store.get('user');

    const [groups, setGroups] = useState([]);
    const [page, setPage] = useState({
        activePage:0,
        totalPages: null,
        itemsCountPerPage:null,
        totalItemsCount:null
    })

    let navigate = useNavigate();

    let url = `http://localhost:8080/api/mygroups/${user?.idUser}`;

    const getMyGroups = async (pageNumber) => {
        await axios(url+`?page=${pageNumber}`, getRequestConfig())
        .then((resp)=>{
            console.log(resp.data);
            setGroups(resp.data.content);
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

      };

    useEffect(() => {
        if(!user || user.role !== "DIRECTOR"){
            navigate('/notfound');
        }
        getMyGroups(0);
      }, []);

    const classnames = {
        container: 'main-container',
        request: 'request'

    }
    return(
        <div className={classnames.container}>
            <TitlePage title={'Мои коллективы'} />
            {groups.length == 0 ? 
            <h3 className={classnames.request}>У вас ещё нет коллективов</h3> :
            <MyGroupList groups = {groups} setState = {setGroups} page={page.activePage} />
            }
            {page.totalPages >= 2 && <Pagination
                hideNavigation
                activePage={page.activePage+1}
                itemsCountPerPage={page.itemsCountPerPage}
                totalItemsCount={page.totalItemsCount}
                pageRangeDisplayed={10}
                innerClass = 'pager-list'
                onChange={(e)=>handlePageChange(e, setPage, getMyGroups)}
            />}
        </div>
    )
}