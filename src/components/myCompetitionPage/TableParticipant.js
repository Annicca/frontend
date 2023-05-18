import React, { useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { participantTitle } from "../../Constant";
import axios from "axios";
import { getRequestConfig } from "../helpers/getRequestConfig";
import { TitlePage } from "../TitlePage/TitlPage";

export const TableParticipant = () => {

    const store = require('store');
    const user = store.get('user');
    let navigate = useNavigate();
    let { id } = useParams();

    const [participants, setParticipants] = useState()
    let url = `http://localhost:8080/api/mycompetitions/participants/${id}`

    useEffect(()=>{
        if(!user || user.idRole !== "ORGANIZER"){
            navigate('/notfound');
        }
        const getParticipants = async() => await axios(url, getRequestConfig())
        .then((resp) =>{
            console.log(resp.data);
            setParticipants(resp.data);
        })
        .catch((error)=>
        {
            console.log(error);
            alert("Что-то пошло не так(")
        })
        getParticipants();
    },[])

    return(
            <div className="main-container">
                <TitlePage title={"Участники"} />
                { !participants || participants.length === 0 ? 
                <p className="participant-text">У вас ещё нет участников
                <p><Link to={'/mycompetitions'} className="participant-text__link">{"<-Назад"}</Link></p>
                </p> : 
                <>
                    <p><Link to={'/mycompetitions'} className="participant-text__link">{"<-Назад"}</Link></p>
                    <table className = {'table'}>
                        <tbody>
                            <tr>
                                {participantTitle.map((item,id)=>
                                    <th key = {id}>
                                        {item}
                                    </th>
                                )}
                            </tr>
                            {participants.map((participant)=>
                            <tr key = {participant.idGroup} onClick = {() => navigate(`/${participant.idGroup}`)}>
                                <td>{participant.nameGroup}</td>
                                <td>{participant.cityGroup.city + " " + participant.addressGroup}</td>
                                <td>{participant.director.surnameUser + " " + participant.director.nameUser + " " + participant.director.patronimycUser}</td>
                                {participant.director.phoneUser != null ? 
                                    <td>{participant.director.phoneUser}</td> : <td>-</td>
                                }
                                <td>{participant.director.mailUser}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </>}
            </div>
        )
}
