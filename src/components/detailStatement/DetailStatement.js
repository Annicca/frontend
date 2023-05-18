import React, {useState, useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { detailCompetition, detailGroup, adminRole, accept, reject, statusAccept, statusReject } from "../../Constant";
import { Image } from "../img/Image";
import { changeStatus } from "../helpers/changeStatus";
import { transformDate } from "../helpers/transformDate";
import { getRequestConfig } from "../helpers/getRequestConfig";
import { choosetypeStatement } from "../helpers/chooseTypestatement";

import './DetailStatement.scss';

export const DetailStatement = () =>{

    let navigate = useNavigate();
    const store = require('store');
    const userAuth = store.get('user');

    const params = useParams();
    const current = params.id;
    const [statement, setStatement] = useState();
    let group = "GROUP";

    const change = async(idStatement, accept, setStatement) =>{
        await changeStatus(idStatement, accept, setStatement).then(()=>{
            console.log(statement)
            setStatus(true)
        });
    }

    const apiUrl = `http://localhost:8080/api/statements/${current}`;
    const [statementData, setStatementData] = useState();
    const [titles, setTitles] = useState();
    const [isStatus, setStatus] = useState(true);

    const generateStatementData = (statement) =>{
        if(statement.type == group){
            setStatementData([statement.user.surnameUser +" " + statement.user.nameUser +" " + statement.user.patronimycUser, statement.user.mailUser, choosetypeStatement(statement.type) , statement.name, statement.city.city, statement.address]);
            setTitles(detailGroup);
        } else{
            setStatementData([statement.user.surnameUser +" " + statement.user.nameUser +" " + statement.user.patronimycUser, statement.user.mailUser, choosetypeStatement(statement.type), statement.name, statement.city.city, transformDate(statement.dateStart), transformDate(statement.dateFinish)]);
            setTitles(detailCompetition);
        }
        if(statement.statusStatement == null){
            setStatus(false)
        }
    }
    useEffect(() => {
        if(userAuth?.role != adminRole || !userAuth){
            navigate(`/notfound`)
        } else{
            const getStatementAdmin = async() => {
            await axios.get(apiUrl, getRequestConfig()).then((resp) => {
                console.log(resp.data);
                setStatement(resp.data);
                generateStatementData(resp.data);
            }).catch((error) => console.log(error));
            
        }
        getStatementAdmin();
        }
      }, []); 

    const classnames = {
        main: 'main-container',
        title: 'main-container-user statement-title',
        detail: 'main-container-form',
        childFirst: 'main-container-form-child1',
        childSecond: 'main-container-form-child2',
        child1Element: 'main-container-form-child1-item',
        description: 'description-statement',
        descriptionTitle: 'description-statement__title',
        descriptionText: 'description-statement__text',
        buttonContainer: 'main-container-form-child2-box',
        button: 'description-statement__button',
        imgStatus: 'description-statement__img-status'
    }

    return(
        <div className={classnames.main}>
            {statement === undefined ? (<span>Loading...</span>) :
                <p className={classnames.title}> 
                    {'Заявка №' + statement.idStatement}
                    <span>

                    {isStatus && statement.statusStatement == statusAccept ?
                        
                        <Image src="./icons/acceptActive.svg" alt = "Принято" width={35} height={35} className={classnames.imgStatus} />
                        : <> </>}
                    </span>
                    <span>
                    {isStatus && statement.statusStatement == statusReject ?
                        <Image src="./icons/delActive.svg" alt = "Отклонено" width={35} height={35} className={classnames.imgStatus} />
                        : <> </>}
                    </span>
                </p>}
            <div className = {classnames.detail}>
                <div className = {classnames.childFirst}>
                    {titles == undefined ? <> </> : titles.map((item,index) =>
                        <p key = {index} className = {classnames.child1Element}>
                            <span>{item}</span>
                        </p>
                    )}
                </div>
                <div className={classnames.childSecond} >
                    {statementData == undefined ? <> </> : statementData.map((item,index) =>
                        <p key = {index} className = {classnames.child1Element}>
                            <span>{item}</span>
                        </p>
                    )}
                </div>
            </div>
            {statement == undefined ? <></> : 
            <div className={classnames.description}>
                <p className={classnames.descriptionTitle}>Описание:</p>
                <p className={classnames.descriptionText}>{statement.description}</p>
            </div>}
            <div className={classnames.buttonContainer}>
                <Link to = {'/statements'}><button className={classnames.button}>Назад</button></Link>
                <button className={classnames.button} disabled = {isStatus} onClick={() => change(statement.idStatement, accept, setStatement)}>Принять</button>
                <button className={classnames.button} disabled = {isStatus} onClick={() => change(statement.idStatement, reject, setStatement)}>Отклонить</button>
            </div>
        </div>
    )
}