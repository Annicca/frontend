import React, {useState} from "react";
import { Image } from "../img/Image";
import { useNavigate } from "react-router-dom";
import { TableParticipant } from "./TableParticipant";
import axios from "axios";
import { getRequestConfig } from "../helpers/getRequestConfig";
import { urlSrc } from "../../Constant";
import { transformDate } from "../helpers/transformDate";
import { chooseStatusCompetition } from "../helpers/chooseStatusCompetition";
import { Description } from "../description/Descrption";
import { Link } from "react-router-dom";

export const MyCompetitionList = ({competitions, setCompetitions}) =>{
    return(
        <div>
        {competitions == undefined ? <div>Loading...</div> : competitions.map((competition) =>
            <MyCompetitionItem competition = {competition} key = {competition.idCompetition} setCompetitions = {setCompetitions} />
        )}
    </div>
    )
}

const MyCompetitionItem = ({competition, setCompetitions, page}) =>{

    let navigate = useNavigate();

    const [isActive, setIsActive] = useState(false);

    // let cancelUrl = `https://localhost:44344/api/competitions/cancel/`;
    let cancelUrl = `http://localhost:8080/api/competitions/cancel/`;

    const cancelCompetition = async(id) =>{
        await axios.put(cancelUrl + `${id}?page=${page}`, {}, getRequestConfig())
        .then((response)=>{
            console.log(response.data);
            setCompetitions(response.data.content);
            alert("Успешно")
        })
        .catch((error)=>{
            console.log(error);
            if(error.response){
                alert(error.response.data.message)
            }else{
                alert("Не удалось отменить конкурс(")
            }
        });

    }

    const classnames ={
        card: 'card',
        info: 'card-info',
        title: 'card-info__title',
        img: 'card-info__img',
        child: 'card-info__article',
        text: 'card-info__text',
        more: 'card-info__more',
        edit: 'card-info__edit',
        delete: 'card-info__delete',
        competition: 'card__participant',
        linkcompetition: 'card-competition__link' ,
        cancel: 'card__cancel',
        participant: 'card__list'
    }

    return(
        <section className={classnames.card}>
        <section  className={classnames.info}>
            <article className={classnames.child}>
                <p className={classnames.title} >{competition.nameCompetition}</p>
                <Image src = {urlSrc + competition.img} alt = {competition.nameCompetition} width = {460} height = {240} className={classnames.img} />
            </article>
            <article className={classnames.child}>
                <p className={classnames.text}><span>Город:</span>{" " + competition.cityCompetition.city}</p>
                <p className={classnames.text}><span>Дата начала: </span>{" " + transformDate(competition.dateStart)}</p>
                <p className={classnames.text}><span>Дата окончания: </span>{" " + transformDate(competition.dateFinish)}</p>
                <p className={classnames.text}><span>Статус: </span>{" " + chooseStatusCompetition(competition.statusCompetition)}</p>
                <Description text = {competition.descriptionCompetition} classnames={classnames} />
            </article> 
            <article className={classnames.child}>
                <button className = {classnames.edit} onClick={() => navigate(`/mycompetitions/change/${competition.idCompetition}`)} >
                    <Image src = './icons/edit.svg' alt  ='Изменить' width = {30} height ={30} />
                </button>
            </article>
        </section>
        <article className={classnames.competition}>
            <button className={classnames.cancel} disabled={false} onClick = {() => cancelCompetition(competition.idCompetition)} >Отменить конкурс</button>
            <Link to={`participants/${competition.idCompetition}`} className={classnames.linkcompetition}>Посмотреть участников</Link>
        </article>
    </section>
    )
}