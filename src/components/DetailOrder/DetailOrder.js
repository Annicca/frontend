import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRequestConfig } from "../helpers/getRequestConfig";
import axios from "axios";
import { adminRole, detailOrders, sellerRole } from "../../Constant";
import { transformDate } from "../helpers/transformDate";
import { chooseStatusOrder } from "../helpers/chooseStatusOrder";
import { TableOrderItem } from "./TableOrderItem";
import { OrderStatus, OrderStatusSeller, PaymentStatus } from "../../Constant";
import { useForm } from "react-hook-form";

import './DetailOrder.scss'
import { cancelOrder } from "../helpers/cancelOrder";



export const DetailOrder = () =>{

    const [order, setOrder] = useState()

    const store = require('store');
    const user = store.get('user');
    let navigate = useNavigate()
    const params = useParams();
    const current = params.id;

    let apiUrl;
    let isAdmin = user?.role == adminRole
    let isSeller = user?.role == sellerRole
    if(isSeller){
        apiUrl = `http://localhost:8080/api/myorders/${user?.idUser}/${current}`;
    }else if(isAdmin){
        apiUrl = `http://localhost:8080/api/orders/${current}`;
    }
    let baseUrl = `http://localhost:8080/api/orders`;
    
    console.log(apiUrl)

    const getOrderDetail = async() => {
        await axios.get(apiUrl, getRequestConfig())
        .then((resp) => {
            console.log(resp.data);
            setOrder(resp.data);
        })
        .catch((error) => {
            console.log(error)
            if(error.response.data){
                alert(error.response.data.message)
            }else{
                alert("Что-то пошло не так(")
            }
        });
    }

    useEffect(() => {
        if(isSeller && isAdmin){
            navigate(`/notfound`)
        }
        getOrderDetail();
    }, []); 

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = handleSubmit(async (data) => {
        console.log(order.shoppingCart)
        let orderChange = {
            ...order,
            ...data,
            shoppingCart : order.shoppingCart
        }
    
        console.log(orderChange);
        if(window.confirm('Вы действительно хотите внести изменения?')){
            axios.put(baseUrl, orderChange, getRequestConfig())
            .then((resp) =>{
                setOrder(resp.data)
                console.log(resp.data);
                alert("Успешно");
            }).catch((error)=>{
                console.log(error)
                if(error.response.data){
                    alert(error.response.data.message)
                }else{
                   alert("Мы не смогли изменить данные(") 
                }

            })
        }
    })

    const classnames = {
        main: "main-container",
        title: 'main-container-user',
        detail: 'main-container-form',
        detailContainer: 'detail-container',
        detailItem: 'detail-container__item',
        status: 'detail-container__status',
        input: 'change__input',
        buttonContainer: 'main-container-form-child2-box',
        button: 'description-statement__button',
        submit: 'description-statement__button',
    }

    return(
        <div className={classnames.main}>
            {order && <p className={classnames.title}> {'Заказ №' + order.idOrder}</p>}
            {!order ? <div>Loading...</div> : <form className = {classnames.main} onSubmit={onSubmit}>
                <div className = {classnames.detail}>
                    <div className = {classnames.detailContainer}>
                        {detailOrders.map((item,index) =>
                            <p key = {index} className = {classnames.detailItem}>
                                <span>{item}</span>
                            </p>
                        )}
                    </div>
                     
                        <div className={classnames.detailContainer} >
                            <div className = {classnames.detailItem}>
                                {order?.customer.surnameUser + " " + order?.customer.nameUser + " " + order?.customer.patronimycUser}
                            </div>
                            {order?.customer.phoneUser ? 
                            <div className = {classnames.detailItem}>{order?.customer.phoneUser}</div> : 
                            <div className = {classnames.detailItem}>-</div>}
                            <div className = {classnames.detailItem}>{order?.customer.mailUser}</div>
                            
                            {order?.statusOrder && <select
                                defaultValue = {order.statusOrder}
                                className = {classnames.input}
                                {...register('statusOrder')}>
                                {isAdmin &&  OrderStatus.map(status =>
                                    <option value={status} key= {status}>{chooseStatusOrder(status)}</option>    
                                )}
                                {isSeller && OrderStatusSeller.map(status =>
                                    <option value={status} key= {status}>{chooseStatusOrder(status)}</option>    
                                )}
                            </select>}
                            {isSeller &&
                            <>
                                <div className = {classnames.detailItem}>{order && transformDate(order.dateOrder)}</div>
                                <div className = {classnames.detailItem}>{order.dateArrival ? transformDate(order.dateArrival) : "-"}</div>
                                <div className = {classnames.detailItem}>{order?.address}</div>
                                <div className={classnames.status}>{order && chooseStatusOrder(order.statusPayment)}</div>
                                
                            </>
                            }
                            {isAdmin &&
                            <>
                                <input 
                                type="date"
                                className = {classnames.input}
                                {...register('dateOrder')} 
                                defaultValue = {order?.dateOrder}/>
                                <input 
                                type="date"
                                className = {classnames.input}
                                {...register('dateArrival')} 
                                defaultValue = {order?.dateArrival}/>
                                <input 
                                type="text"
                                className = {classnames.input}
                                {...register('address')} 
                                defaultValue = {order?.address}/>
                            {order?.statusPayment && <select
                                defaultValue = {order.statusPayment}
                                className = {classnames.input}
                                {...register('statusPayment')}>
                                {PaymentStatus.map(status =>
                                    <option value={status} key= {status}>{chooseStatusOrder(status)}</option>    
                                )}
                            </select>}
                            </>
                            }
                            
                        </div>

                </div>

                <div className={classnames.buttonContainer}>
                    <button className={classnames.button} onClick={(e) => {e.preventDefault(); navigate(-1)}}>Назад</button>
                    <button type="submit" className={classnames.submit}>Сохранить</button>
                    {user?.idRole === "ADMIN" && <button className={classnames.button} onClick={(e) => {e.preventDefault(); cancelOrder(order, setOrder)}}>Отменить</button>}
                </div>
                {order?.shoppingCart && <TableOrderItem orderItems={order.shoppingCart} />}
            </form>}

        </div>
    )
}