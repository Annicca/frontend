import React, {useState, useEffect} from "react";
import { Image } from "../img/Image";
import { Contact } from "../contact/Contact";
import { Link } from "react-router-dom";
import { TakePart } from "./TakePart";
import { fetchMyGroups } from "../helpers/fetchMyGroups";
import { transformDate } from "../helpers/transformDate";
import { chooseStatusCompetition } from "../helpers/chooseStatusCompetition";

import './Competition.scss';


const Competition = ({competition, classnames, setIsActivePart, setIdComp}) =>{

    let isDisabled = false;
    if(competition.statusCompetition !== "CREATED"){
        isDisabled = true;
    }
    return(
        <div className = {classnames.competition}>
            <div className={classnames.imgContainer}>
                <Image src= {competition.img} alt = ' Нет фото' width = {220} height = {142} className = {classnames.img} />
                <p className = {classnames.status}>Статус: {chooseStatusCompetition(competition.statusCompetition)}</p>
                
            </div>
            <div className={classnames.info}>
                <div className={classnames.title}>
                    <p className={classnames.name}>{competition.nameCompetition}</p>
                    <p className = {classnames.city}>{'Город: ' + competition.cityCompetition.city}</p>
                    
                </div>
                <Contact contact = {transformDate(competition.dateStart) + " - " + transformDate(competition.dateFinish)} src = './icons/calendar.svg' alt = 'Адрес: ' width = {20} height = {21}  classnames = {classnames} />
                <div className= {classnames.buttonContainer}>
                    
                    <button className={classnames.button} disabled={isDisabled} onClick={(e) =>{e.preventDefault(); setIsActivePart(true); setIdComp(competition.idCompetition)}}>Принять участие</button>
                </div>
            </div>
            
        </div>
    )
}

export const CompetitionList = ({competitions, classnames, isNotTakePart}) =>{
    const store = require('store');
    const user = store.get('user');
    const id = user?.idUser;

    const [isActivePart, setIsActivePart] = useState(false);
    const [idComp, setIdComp] = useState();
    const [groups, setGroups] = useState([]);

    let url = `http://localhost:8080/api/usergroups/${id}`;

    useEffect(() => {
        fetchMyGroups(url, setGroups);
      }, [url]);

    return(
        <div className = {classnames.list}>
        {competitions == undefined ? <div>Loading...</div> : competitions.map((competition) =>
            <Link to = { `/competitions/${competition.idCompetition}`} key = {competition.idCompetition} ><Competition competition = {competition} classnames = {classnames} groups = {groups} setIsActivePart = {setIsActivePart} setIdComp={setIdComp}/></Link>
        )
        } 
        
        {!isNotTakePart && <TakePart isActive={isActivePart}  setIsActive={setIsActivePart} groups={groups} idCompetition={idComp} />}
      </div>
    )
}