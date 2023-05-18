import React,{useState,useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CompetitionList } from "../competition/Competition";
import { competitionclass } from "./myGroupCompetitionClass";
import { getRequestConfig } from "../helpers/getRequestConfig";
import { TitlePage } from "../TitlePage/TitlPage";


export const MyGroupCompetitions = () =>{

    const store = require('store');
    const user = store.get('user');
    let navigate = useNavigate();
    let { id } = useParams();

    const [competitions, setCompetitions] = useState()
    let url = `http://localhost:8080/api/mygroups/competitions/${id}`

    useEffect(()=>{
        if(!user || user.role !== "DIRECTOR"){
            navigate('/notfound');
        }
        const getMyGroupCompetiitons = async() => await axios(url, getRequestConfig())
        .then((resp) =>{
            console.log(resp.data);
            setCompetitions(resp.data);
        })
        .catch((error)=>
        {
            console.log(error);
            alert("Что-то пошло не так(")
        })
        getMyGroupCompetiitons();
    },[])

    return(
        <div className="main-container">
            <TitlePage title={"Мои конкурсы"} />
            <p><Link to={'/mygroups'} className="participant-text__link">{"<-Назад"}</Link></p>
            <CompetitionList competitions = {competitions}  classnames = {competitionclass} isNotTakePart={true}/>
        </div>
    )
}