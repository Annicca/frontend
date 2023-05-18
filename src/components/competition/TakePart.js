import React from "react";
import classNames from "classnames";
import { Group } from "../group/Group";
import axios from "axios";
import { getPostConfig } from "../helpers/getRequestConfig";


export const TakePart = ({isActive, setIsActive, groups, idCompetition}) =>{

    const participant = async(idCompetition, group) =>{
        console.log(group);
        await axios.put(`http://localhost:8080/api/competitions/participants/${idCompetition}`,
            group,
            getPostConfig()
        )
        .then((response) =>{
            console.log(response);
            alert(response.data);
            setIsActive(false)
        })
        .catch((error) => {
            console.log(error);
            if(error.response){
                alert(error.response.data.message)
            }
        })
    }

    const classnames = {
        takePart: 'take-part',
        active: 'take-part_active',
        container: 'take-part__container',
        title: 'take-part__title',
        closeX: 'take-part__close',
        participant: "take-part__participant"
    }
    return(
        <div className={ !isActive ? classnames.takePart : classNames(classnames.takePart, classnames.active)}>
            <div className={classnames.container}>
                <p className={classnames.title}>
                    <span>Выберете коллектив</span>
                    <span className={classnames.closeX} onClick={() => setIsActive(false)}>x</span>
                </p>
                {groups.lenght === 0 ? <p>У вас нет коллективов</p> : groups.map((group)=>
                    <div key = {group.idGroup} onClick={()=>participant(idCompetition, group)} className = {classnames.participant}><Group group={group} /></div>
                )}
            </div>
        </div>
    )
}