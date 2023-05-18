import classNames from "classnames";
import React,{useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Contact } from "../contact/Contact";
import { getDate } from "../helpers/getDate";
import { handleAmountMinus, handleAmountPlus, handleBasketActive, handleOption } from "./handlesProduct";
import { useFindOrderItem } from "../../hooks/useFindOrderItem";
import { getProduct } from "../helpers/getProduct";
import { Image } from "../img/Image";

import './ProductPage.scss';
import '../groupPage/GroupPage.scss'

export const ProductPage = ({link}) =>{

    const id = useParams().id;

    const store = require('store');
    const userAuth = store.get('user');

    const [product, setProduct] = useState();
    const [basketActive, setBasketActive] = useState(false);
    const [orderItem, setOrderItem] = useState({
        count: 0
    })

    let url = `http://localhost:8080/api/${link}/${id}`;

    useEffect(()=>{
        getProduct(url, setProduct, setOrderItem, orderItem, link);

    },[url])

    let productInBasket = useFindOrderItem(orderItem);
    useEffect(()=>{
        console.log("productInBasket")
        console.log(productInBasket)
        if(productInBasket){
            setOrderItem({
                ...orderItem,
                ...productInBasket,
            })
            setBasketActive(true)
        }else{
            setBasketActive(false)
        }
    },[productInBasket])

    const classnames = {
        product: "product-container",
        productImg: "product-container__product-img",
        descirption: "description-container",
        title: "description-container__title",
        dateTitle: "description-list__date-title",
        list: "description-list",
        item: "description-list__item",
        date: "description-list__date",
        time: "description-list__time",
        size: "description-list__size",
        cost: "description-container__cost",
        counter: "description-container__counter",
        descirptionText: "description-container__description",
        count: "description-container__count",
        addBasket: "description-container__basket",

    }

    const contactClasses = {
        contact: 'address_contact',
        contactImg: 'address_img',
        address: 'address product-address',
        addressTitle: 'address_title',
        phone: 'address_phone',
        email: 'address_email',
    }

    if(!product){
        return(
            <div>Loading...</div>
        )
    } else{
        return(
            <div className={classnames.product}>
                <div>
                    <Image src={product?.img} alt={product?.title} width={600} height={484} className={classnames.productImg} />
                    <div className={contactClasses.address}>
                        <p className={contactClasses.addressTitle}>Продавец</p>
                        <Contact classnames={contactClasses} contact = {product?.seller?.surnameUser + " " + product?.seller?.nameUser + " " + product?.seller?.patronimycUser} src = './icons/man.svg' alt = 'Адрес: ' width=  {25} height ={22} />
                        <p className={contactClasses.addressTitle}>Контакты</p>
                        {!product?.seller?.phoneUser ? ' ' :
                            <Contact classnames={contactClasses} contact = {product?.seller?.phoneUser} src = './icons/phone.svg' alt = 'Тел: '  width=  {25} height ={22} />
                        }
                        <Contact classnames={contactClasses} contact = {product?.seller?.mailUser} src = './icons/mail.svg' alt = 'Email: '  width=  {25} height ={20}/>
                    </div>
                </div>

                <div className={classnames.descirption}>
                    <p className={classnames.title}>{product?.title}</p>
                    <p className={classnames.dateTitle}>{link === "services" ? "Свободные даты:" : "Размеры:"}</p>
                    <ul className={classnames.list}>
                        {link === "services" ? product?.dates.map(date =>
                            <li key={date.idDate} 
                            className={classNames(classnames.item, {"description-list__item_active" : orderItem.date?.idDate == date.idDate}, {"description-list__item_disabled" : !date.free})} 
                            onClick={()=>handleOption(date, orderItem, setOrderItem, link)}>
                                <span className={classNames(classnames.date, {"description-list__date_active" : orderItem.date?.idDate == date.idDate},{"description-list__date_disabled" : !date.free})}>{getDate(date.date).date}</span> 
                                <span className={classnames.time}>{getDate(date.date).time}</span>
                            </li>)
                        :
                        product?.size.map(size =>
                            <li key={size.idSize} 
                            className={classNames(classnames.item, {"description-list__item_active" : orderItem.size?.idSize == size.idSize}, {"description-list__item_disabled" : size.amount == 0})} 
                            onClick={()=>handleOption(size, orderItem, setOrderItem, link)}>
                                <span className={classnames.size}>{size.size}</span> 
                            </li>)
                        }
                    </ul>
                    {orderItem.size && orderItem.size.amount == 0 && <p className={"product-message"}>Размер отсутствует</p>}
                    {orderItem.date && !orderItem.date.free && <p className={"product-message"}>Данное время занято</p>}
                    <p className={classnames.cost}>{product?.cost + "р"}</p>
                    {!basketActive ?
                        <button 
                        className={classnames.addBasket} 
                        onClick = {()=>handleBasketActive(userAuth, orderItem, setOrderItem, setBasketActive)}
                        disabled = {(orderItem.size && orderItem.size.amount === 0) || (orderItem.date && !orderItem.date.free)}>
                            Добавить в корзину
                        </button>
                        :
                        link == "attributes" ?
                        <div className={classnames.counter}>
                            <button className={classnames.count} onClick={()=>handleAmountMinus(userAuth, orderItem, setOrderItem, setBasketActive, link)}>-</button>
                            <span>{orderItem.count}</span>
                            <button className={classnames.count} onClick={(e)=>handleAmountPlus(userAuth, orderItem, setOrderItem)}>+</button>   
                        </div> :
                        <button className={classnames.addBasket} onClick={()=>handleAmountMinus(userAuth, orderItem, setOrderItem, setBasketActive, link)}>Убрать из корзины</button>
                    }
                    <p className={classnames.descirptionText}>{product?.description}</p>
                </div>
            </div>
        )
    }
}