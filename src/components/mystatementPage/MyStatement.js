import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { TitlePage } from "../TitlePage/TitlPage";
import {useNavigate } from "react-router-dom";
import { Image } from "../img/Image";
import classNames from "classnames";
import axios from "axios";
import { getRequestConfig } from "../helpers/getRequestConfig";
import { choosetypeStatement } from "../helpers/chooseTypestatement";
import { handlePageChange } from "../helpers/handlePageChange";
import Pagination from "react-js-pagination";
import { Description } from "../description/Descrption";

import '../myGroupsPage/MyGroup.scss'


export const MyStatement = () =>{

    const store = require('store');
    const user = store.get('user');
    const id = user.idUser;

    let navigate = useNavigate();

    const [statements, setStatements] = useState([]);
    const [page, setPage] = useState({
        activePage:0,
        totalPages: null,
        itemsCountPerPage:null,
        totalItemsCount:null
    })

    let url = `http://localhost:8080/api/mystatements/${id}`

    const getMyStatements = async (pageNumber) => {
        await axios.get(url+`?page=${pageNumber}`, getRequestConfig())
        .then((resp) =>{
            console.log(resp.data);
            setStatements(resp.data.content);
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
        if(!user){
            navigate('/notfound');
        }
        getMyStatements(0);
      }, []);

    const classnames = {
        container: 'main-container',
        request: 'request',
    }

    return(
            <div className = {classnames.container} >
                <TitlePage title={'Мои заявки'}/>
                {statements.length == 0 ? 
                <h3 className={classnames.request}>У вас ещё нет заявок</h3> : 
                statements.map((statement) =>
                    <Statement statement = {statement} key = {statement.idStatement} />
                )}
                {page.totalPages >= 2 && <Pagination
                hideNavigation
                activePage={page.activePage+1}
                itemsCountPerPage={page.itemsCountPerPage}
                totalItemsCount={page.totalItemsCount}
                pageRangeDisplayed={10}
                innerClass = 'pager-list'
                onChange={(e)=>handlePageChange(e, setPage, getMyStatements)}
                />}
            </div>
    )
}

const Statement = ({statement}) =>{

    // const [openDescription, setOpenDescription] = useState(false)

    const classnames = {
        card: 'card',
        statement: 'mystatement',
        info: 'card-info',
        title: 'card-info__title',
        status: 'mystatement__status',
        child: 'mystatement__article',
        text: 'card-info__text',
        moreText: 'card-info__more'
    }
    return(
        <section className={classNames(classnames.card, classnames.statement)}>
            <section  className={classnames.info}>
                <article className={classnames.child}>
                    <p className={classnames.title} >{"Заявка № " + statement.idStatement}</p>
                    { statement.status != null ?
                    <p className={classnames.status} >{"Статус: " + statement.status}</p> :
                    <p className={classnames.status} >Статус: На рассмотрении</p>
                    }
                    <Image src = './icons/mystatement.svg' alt = {'Заявка'} width = {200} height = {200} />
                </article>
                <article className={classnames.child}>
                    <p className={classnames.text}><span>Тип:</span>{" " + choosetypeStatement(statement.type)}</p>
                    <p className={classnames.text}><span>Название: </span>{" " + statement.name}</p>
                    <p className={classnames.text}><span>Город: </span>{"г." + statement.city.city}</p>
                    {statement.address != null ? <p className={classnames.text}><span>Адрес: </span>{" " + statement.address}</p> : ''}
                    {statement.start != null ? <p className={classnames.text}><span>Дата начала: </span>{" " + statement.start.split('T')[0]}</p> : ''}
                    {statement.finish != null ? <p className={classnames.text}><span>Дата окончания: </span>{" " + statement.finish.split('T')[0]}</p> : ''}
                    <Description text={statement.description} classnames={classnames} />
                </article> 
            </section>
        </section>
    )
}
