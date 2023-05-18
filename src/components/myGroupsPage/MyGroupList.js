import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "../img/Image";
import axios from "axios";
import { CompetitionList } from "../competition/Competition";
import { Description } from "../description/Descrption";
import { getRequestConfig } from "../helpers/getRequestConfig";
import { competitionclass } from "./myGroupCompetitionClass";

import './MyGroup.scss';

export const MyGroupList = ({groups, setState}) =>{
    return(
        <div>
            {groups == undefined ? <div>Loading...</div> : groups.map((group) =>
                <MyGroupItem group = {group} key = {group.idGroup} setState = {setState} />
            )}
        </div>
    )
}

const classnames ={
    card: 'card',
    info: 'card-info',
    title: 'card-info__title',
    child: 'card-info__article',
    text: 'card-info__text',
    more: 'card-info__more',
    edit: 'card-info__edit',
    delete: 'card-info__delete',
    competition: 'card-competition',
    linkcompetition: 'card-competition__link' ,
    img: 'card-info__img',
    participant: 'participant-text'
}


const MyGroupItem = ({group, setState, page}) =>{
    let navigate = useNavigate();

    const [isActive, setIsActive] = useState(false);

    const deleteGroup = (idGroup)  =>{
        const url = `http://localhost:8080/api/groups/${idGroup}?page=${page}`;
        if(window.confirm("Вы действительно хотите удалить коллектив?")){
            axios.delete(url, getRequestConfig())
            .then((response) =>{
                setState(response.data.content);
                alert("Успешно удалено");
            })
            .catch((error)=>{
                if(error.response){
                    alert(error.response.data.message);
                } else{
                    alert("Мы не смогли удалить коллектив(");
                }
                console.log(error);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
            })
        }
    };

    return(
            <section className={classnames.card}>
                <section  className={classnames.info}>
                    <article className={classnames.child}>
                        <p className={classnames.title} >{group.nameGroup}</p>
                        <Image src = {group.img} alt = {group.nameGroup} width = {460} height = {240} className={classnames.img} />
                    </article>
                    <article className={classnames.child}>
                        {group.category != null ?
                            <p className={classnames.text}><span>Стиль:</span>{" " + group.category}</p> :
                            <p className={classnames.text}>Стиль: -</p>
                        }
                        
                        <p className={classnames.text}><span>Адрес: </span>{"г." + group.cityGroup.city + ", " + group.addressGroup}</p>
                        {/* <p className={classnames.text}>{group.descriptionGroup}</p> */}
                        <Description text = {group.descriptionGroup} classnames={classnames} />
                    </article> 
                    <article className={classnames.child}>
                        <button className = {classnames.edit} onClick={() => navigate(`/mygroups/change/${group.idGroup}`)} >
                            <Image src = './icons/edit.svg' alt  ='Изменить' width = {30} height ={30} />
                        </button>
                        <button className = {classnames.delete} onClick={(e) => deleteGroup(group.idGroup, e)} >
                            <Image src = './icons/delete.svg' alt  ='Удалить' width = {30} height ={30} />
                        </button>
                    </article>
                </section>
                <article className={classnames.competition}>
                        <Image src = './icons/startsmall.svg' alt = 'Конкурсы' width = {25} height = {25} />
                        {!isActive ? 
                        <p className={classnames.linkcompetition} onClick = {() =>{setIsActive(!isActive)}} >Конкурсы </p>
                        :
                        <p className={classnames.linkcompetition} onClick = {() =>{setIsActive(!isActive)}} >Скрыть конкурсы </p>
                        }
                </article>
                {!isActive ? ' ' :
                <article>
                    {group.competitions.length !== 0 ?
                    <>
                    <CompetitionList competitions = {group.competitions}  classnames = {competitionclass} isNotTakePart={true}/>
                    <Link to = {`competitions/${group.idGroup}`} className={classnames.linkcompetition}>{"Посмотреть больше ->"}</Link>
                    </> :
                    <p className={classnames.participant}>У вас ещё нет конкурсов</p>}
                </article>}
            </section>
    )
}