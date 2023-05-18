import React from "react";
import { TitlePage } from "../TitlePage/TitlPage";
import { useNavigate} from "react-router-dom";
import { TableProduct } from "../TableAdmin/TableProduct";
import { useEffect } from "react";
import { adminRole, sellerRole } from "../../Constant";



export const Products = ({path, urlDelete, title, listTitle}) =>{

  let navigate = useNavigate();
  const store = require('store');
  const user = store.get('user');

  useEffect(() =>{
    if(user?.role !== adminRole && user?.role !== sellerRole){
      navigate(`/notfound`)
    }
   
  }, [user, path])

  return(
    <div className="main-container">
      <TitlePage title = {title} />
      <TableProduct path={user?.role === sellerRole ? path + `/${user.idUser}` : path} urlDelete={urlDelete} tableProduct={listTitle}/>
    </div>
  )
}