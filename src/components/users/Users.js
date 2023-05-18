import React from "react";
import { TitlePage } from "../TitlePage/TitlPage";
import { useNavigate } from "react-router-dom";
import { TableUser } from "../TableAdmin/TableUser";
import {adminRole} from "../../Constant";

import { useEffect } from "react";


export const Users = () =>{

  let navigate = useNavigate();
  const store = require('store');
  const user = store.get('user');

  useEffect(() =>{
    if(user?.role != adminRole){
      navigate(`/notfound`)
    }
  }, [user])

  return(
    <div className="main-container">
      <TitlePage title = 'Пользователи' />
      <TableUser />
    </div>
  )
}

