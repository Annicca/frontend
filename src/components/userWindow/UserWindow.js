import React from "react";
import { Link } from "react-router-dom";
import { listClientWindow, listDirectorWindow, listOrganizerWindow, listAdminWindow, listSellerWindow } from "../../Constant";
import './UserWindow.scss';
import { WindowAuth } from "./WindowAuth";

export const UserWindow = ({activeWindow, setActiveWindow}) =>{

    const store = require('store');
    const user = store.get('user');

    const classnames = {
        container: 'user-container',
        containerActive: 'user-container activewindow',
        buttonlog: 'user-container-button',
        auth: 'user-container activewindow auth'
    }

    if(user == undefined){
        return(
            <div className ={activeWindow ? classnames.containerActive : classnames.container} onMouseLeave={() => setActiveWindow(false)}>
                <Link to='/login'>
                    <button className={classnames.buttonlog}>
                        Вход
                    </button>
                </Link>
                <Link to='/signin'>  
                    <button className={classnames.buttonlog}>
                        Регистрация
                    </button>
                </Link>
            </div>
        )
    } else if(user.role == "ADMIN"){
        return(
            <div className ={activeWindow ? classnames.auth : classnames.container} onMouseLeave={() => setActiveWindow(false)}>
                <WindowAuth user = {user} list = {listAdminWindow} />
            </div>
        )
    } else if(user.role == "CLIENT"){
        return(
            <div className ={activeWindow ? classnames.auth : classnames.container} onMouseLeave={() => setActiveWindow(false)}>
                <WindowAuth user = {user} list = {listClientWindow} />
            </div>
        )
    } else if(user.role == "DIRECTOR"){
        return(
            <div className ={activeWindow ? classnames.auth : classnames.container} onMouseLeave={() => setActiveWindow(false)}>
                <WindowAuth user = {user} list = {listDirectorWindow} />
            </div>
        )
    } else if(user.role == "ORGANIZER"){
        return(
            <div className ={activeWindow ? classnames.auth : classnames.container} onMouseLeave={() => setActiveWindow(false)}>
                <WindowAuth user = {user} list = {listOrganizerWindow} />
            </div>
        )
    } else if(user.role == "SELLER"){
        return(
            <div className ={activeWindow ? classnames.auth : classnames.container} onMouseLeave={() => setActiveWindow(false)}>
                <WindowAuth user = {user} list = {listSellerWindow} />
            </div>
        )
    }
}