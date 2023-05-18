import React, {useState, useEffect} from "react";
import { TitlePage } from "../TitlePage/TitlPage";
import classNames from "classnames";
import { getDate } from "../helpers/getDate";
import { Image } from "../img/Image";
import { getBasket } from "../helpers/getBasket";
import { FormAddOrder } from "../formAddOrder/FormAddOrder";
import { handleAmountMinus, handleAmountPlus, deleteItem } from "./handleBasket";

import './Basket.scss';
import { Link } from "react-router-dom";

export const Basket = () =>{
    const [order, setOrder] = useState([]);
    const store = require('store');
    const user = store.get('user');
    const id = user?.idUser;

    const [activeForm, setActiveForm] = useState(false)

    const [inStockList, setInStockList] = useState([])
    const [outOfStockList, setOutOfStockList] = useState([])

    let url = `http://localhost:8080/api/mybasket`
    useEffect(()=>{
        if(user) getBasket(url, id, setOrder);
    }, [id])

    useEffect(()=>{
        if(order.shoppingCart) {
            setInStockList(order.shoppingCart.filter(item => (item.size && item.size.amount !== 0) || (item.date && item.date.free))) 
            setOutOfStockList(order.shoppingCart.filter(item => (item.size && item.size.amount === 0) || (item.date && !item.date.free))) 
        }

    }, [order])

    const classnames = {
        container: 'main-container',
        request: 'request',
        card: 'card',
        info: 'card-info',
        title: 'card-info__title card-info__title_big',
        
        child: 'card-info__article',
        text: 'card-info__text card-info__text-order',

        buy: 'description-container__basket buy-order',
        footer: 'buy-footer',
        orange: 'buy-footer__cost',
        outOfStockList : 'outOfStock-list'
    }

    return(
        <div className={classnames.container}>
            <TitlePage title={'Корзина покупок'} />
            { !user ?  
                <h3 className={classnames.request}>Чтобы посмотреть корзину, пожалуйста, <Link to="/login">авторизуйтесь</Link></h3> :
                !order || (order && order.shoppingCart?.length === 0) ?
                <h3 className={classnames.request}>Ваша корзина пуста</h3> :
                <>
                <ul>
                    {inStockList.length !== 0 && inStockList.map(item =>
                        <li key = {item.idOrderItem}> 
                            <OrderItem orderItem = {item} updateBasket={()=>getBasket(url, id,setOrder)}/>
                        </li>
                    )}
                </ul>

                {outOfStockList.length !== 0 && <ul className={classnames.outOfStockList}>
                    {outOfStockList.map(item =>
                        <li key = {item.idOrderItem}> 
                            <OrderItem orderItem = {item} updateBasket={()=>getBasket(url, id,setOrder)} outOfStock />
                        </li>
                    )}
                </ul>}
                </>

            }
            <p className={classnames.footer}>
                <span className={classnames.orange}>ИТОГО: {order.cost}</span>
                <button disable={inStockList.length === 0} className={classnames.buy} onClick={() => setActiveForm(true)}>КУПИТЬ</button>
            </p>
            {console.log({...order, shoppingCart: inStockList})}
            {activeForm && order && <FormAddOrder order = {{...order, shoppingCart: inStockList}} setActive = {setActiveForm} /> }
        </div>
    )
}

export const OrderItem = ({orderItem, updateBasket, outOfStock}) =>{

    const product = orderItem.attributes ? orderItem.attributes : orderItem.services

    const classnames = {
        product: 'order-item',
        img: 'order-item__img',
        title: 'order-item__title',
        titleConteiner: 'order-item__title-conteiner',
        price: 'order-item__price',
        child: 'order-item__article',
        delete: 'order-item__delete',
        counter: "description-container__counter",
        count: "description-container__count",
        amount: "order-item__amount",
        option: "order-item__option",
        item: "description-list__item",
        date: "description-list__date",
        time: "description-list__time",
        size: "description-list__size",
        outOfStock: "outOfStock-message",
    }



    if(!product){
        return(
            <div>Loading...</div>
        )
    } else{
    return(
        <section className={classnames.product}>
            <img src = {product.img} alt = {product.title} className={classnames.img} />
                <div className={classNames(classnames.titleConteiner, {'order-item_outOfStock' :outOfStock}) }>
                    <p className={classnames.title}>{product.title}</p>
                    <p>{product.description.slice(0,201) + "..."}</p>
                    <div className={classnames.option}>
                        {!outOfStock && orderItem.size && <span className={classNames(classnames.item,classnames.size)}>{orderItem.size.size}</span>}
                        {!outOfStock && orderItem.date && 
                        <span className={classnames.item}>
                            <span className={classnames.date}>{getDate(orderItem.date.date).date}</span> 
                            <span className={classnames.time}>{getDate(orderItem.date.date).time}</span>
                        </span>}
                    </div>
                </div>

                {orderItem.attributes ?
                    <div className={classnames.counter}>
                        <button className={classnames.count} style={{cursor: orderItem.count === 1 && "default"}}  onClick={()=>handleAmountMinus(orderItem, updateBasket)}>-</button>
                        <span>{orderItem.count}</span>
                        <button className={classnames.count} onClick={()=>handleAmountPlus(orderItem, updateBasket)}>+</button>   
                    </div> : <div className={classnames.amount}>1</div>
                }

                {!outOfStock ? <p className={classnames.price}>{product.cost + "р"}</p>:<p className={classNames(classnames.price, classnames.outOfStock) }>Нет в наличии</p>}
            
                <button className={classnames.delete} onClick={() => deleteItem(orderItem.idOrderItem, updateBasket)} >
                    <Image src = './icons/delete.svg' alt  ='Удалить' width = {20} height ={20} />
                </button>
            

        </section>
    )}
}