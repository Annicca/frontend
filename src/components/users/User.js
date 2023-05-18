import React from "react";
import { useState, useEffect} from "react";
import { useParams,Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { inputTitle, roles, adminRole } from "../../Constant";
import { getRequestConfig } from "../helpers/getRequestConfig";

import './User.scss';


export const User = () =>{

    let navigate = useNavigate();
    const store = require('store');
    const userAuth = store.get('user');

    const [name, setName] = useState('');
    const [surName, setSurname] = useState('');
    const [patronimyc, setPatronimyc] = useState('');
    const [login, setLogin] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');

    const params = useParams();
    const current = params.id;
    const [user, setUser] = useState();

    const apiUrl = `http://localhost:8080/api/users`;

    useEffect(() => {
        if(userAuth?.role != adminRole){
            navigate(`/notfound`)
        } else{
            const getUser = async() => {
            await axios.get(apiUrl+`/${current}`, getRequestConfig())
            .then((resp) => {
                console.log(resp.data);
                setUser(resp.data);
                setSurname(resp.data.surnameUser);
                setName(resp.data.nameUser);
                setPatronimyc(resp.data.patronimycUser);
                setLogin(resp.data.loginUser);
                setPhone(resp.data.phoneUser)
                setMail(resp.data.mailUser);
                setRole(resp.data.role);
            }).catch((error) => console.log(error));
        }
        getUser();
        }

      }, [apiUrl,current]); 
      

    const changeUser = () => {
        let userChange = {
            role: role,
            idUser: user.idUser,
            surnameUser: surName,
            nameUser: name,
            patronimycUser: patronimyc,
            loginUser: login,
            passwordUser: user.passwordUser,
            mailUser: mail,
            phoneUser:phone
        };

        console.log(userChange);
        if(window.confirm('Вы действительно хотите внести изменения?')){
            axios.put(apiUrl, userChange, getRequestConfig())
            .then((result) =>{
                console.log(result.data);
                alert("Успешно")
            }).catch((e)=>{
                console.log(e);
                if(e.response){
                    alert(e.response.data.message)
                 }else{
                    alert("Мы не смогли изменить данные(");
                }
            })
        }
    }

    const options = roles.map((role) =>{
        return <option key={role.idRole} value={role.idRole}>{role.name}</option>
    })

    const classnames ={
        container: 'main-container',
        title: 'main-container-user',
        changeButton: 'main-container-user-change',
        form: 'main-container-form',
        childFirst: 'main-container-form-child1',
        childSecond: 'main-container-form-child2',
        child1Element: 'main-container-form-child1-item',
        child2Element: 'main-container-form-child2-item',
        input: 'main-container-form-child2-item-input',
        inputActive: 'main-container-form-child2-item-input active',
        buttonContainer: 'main-container-form-child2-box',
        button: 'main-container-form-child2-box-button'
    }
    
    return(
         <div className={classnames.container}>
        {user === undefined ? (<span>Loading...</span>) :
            <>
                <p className={classnames.title}> 
                    {"Пользователь: " + surName +" " + name +" " + patronimyc}
                </p>
                <div className = {classnames.form}>
                    <div className = {classnames.childFirst}>
                        {inputTitle.map((item,index) =>
                            <div key = {index} className = {classnames.child1Element}>
                                <span>{item}</span>
                            </div>
                        )}
                    </div>
                    <div className = {classnames.childSecond}>
                        
                            <form>
                                <p className={classnames.child2Element }>{user.idUser}</p>
                                <p className={classnames.child2Element} >
                                    <select 
                                        className={classnames.input}
                                        type = 'text' 
                                        value = {role} 
                                        onChange={(e) => setRole(e.target.value)}>
                                            {options}
                                    </select>
                                </p>

                                <p className={classnames.child2Element} >
                                    <input 
                                        className={classnames.input}
                                        type = 'text' 
                                        defaultValue = {user.surnameUser} 
                                        onChange={(e) => setSurname(e.target.value)} />
                                </p>
                                <p className={classnames.child2Element} >
                                    <input 
                                        className={classnames.input}
                                        type = 'text' 
                                        defaultValue = {user.nameUser} 
                                        onChange={(e) =>setName(e.target.value)} 
                                        required />
                                </p>
                                <p className={classnames.child2Element} >
                                    <input 
                                        className={classnames.input}
                                        type = 'text' 
                                        defaultValue = {user.patronimycUser} 
                                        onChange={(e) =>setPatronimyc(e.target.value)}/>
                                </p>
                                <p className={classnames.child2Element} >
                                    <input 
                                        className={classnames.input}
                                        type = 'text' 
                                        defaultValue = {user.loginUser} 
                                        onChange={(e) =>setLogin(e.target.value)} 
                                        required />
                                </p>
                                <p className={classnames.child2Element} >
                                    <input 
                                        className={classnames.input}
                                        type = 'email' 
                                        defaultValue = {user.mailUser} 
                                        onChange={(e) =>setMail(e.target.value)} 
                                        required/>
                                </p>
                                <p className={classnames.child2Element} >
                                    <input 
                                        className={classnames.input}
                                        type = 'phone' 
                                        defaultValue = {user.phoneUser} 
                                        onChange={(e) =>setPhone(e.target.value)} />
                                </p>
                            </form>
                    </div>
                </div>
                <p className={classnames.buttonContainer}>
                    <Link to = {'/users'}><button className={classnames.button}>Назад</button></Link>
                    <button className={classnames.button} onClick={() => changeUser()}>Сохранить</button>
                </p>
            </>}
        </div>
    )
}