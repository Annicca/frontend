import React,{useEffect} from 'react';
import { useParams } from 'react-router';
import { TableOrders } from '../TableAdmin/TableOrders';
import { TitlePage } from '../TitlePage/TitlPage';
import { useNavigate } from 'react-router-dom';
import { adminRole, sellerRole } from '../../Constant';

export const Orders = ({title}) =>{

    let navigate = useNavigate();
    const store = require('store');
    const user = store.get('user');

    let path;
    let isAdmin = user?.role == adminRole
    let isSeller = user?.role == sellerRole
    if(isAdmin){
      path="orders"
    }else if(isSeller){
      path=`myorders/${user?.idUser}`
    }
  
    useEffect(() =>{
      if(isAdmin && isSeller){
        navigate(`/notfound`)
      }
    }, [user])
  
    return(
      <div className="main-container">
        <TitlePage title = {title} />
        <TableOrders path = {path} />
      </div>
    )
  }