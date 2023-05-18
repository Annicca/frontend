import React, {useState} from "react";
import { transformDate } from "../helpers/transformDate";
import { chooseStatusOrder } from "../helpers/chooseStatusOrder";
import { Link } from "react-router-dom";

import './MyOrder.scss'
import { ListProduct, ProductItem } from "../listProduct/ListProduct";
import { cancelOrder } from "../helpers/cancelOrder";

export const MyOrder = ({orderInit}) =>{

    const [order, setOrder] = useState(orderInit);

    const classnames ={
        card: 'card',
        info: 'card-info',
        title: 'card-info__title card-info__title_big',
        
        child: 'card-info__article',
        text: 'card-info__text card-info__text-order',
        textOrder: 'card-info__text-order',
        textOrange: 'card-info__text card-info__text_orange',
        textBold: 'card-info__text card-info__text_orange card-info__text_bold',
        
        cancel: 'card__cancel',
        count: 'product__order-count',
        statucContainer: 'card-info__status-container',
        status: 'card-info__status'

    }

    return(
        <section className={classnames.card}>
            
                <article >
                    <div className={classnames.statucContainer}>
                        <span className={classnames.status}>{chooseStatusOrder(order.statusOrder) }</span>
                        <span className={classnames.status}>{chooseStatusOrder(order.statusPayment)}</span>
                    </div>
                    <p className={classnames.title} >{"Заказ " + order.idOrder}</p>
                    <p className={classnames.text}><span>Адрес:</span>{" " + order.address}</p>
                   
                   <p className={classnames.text}>
                        <span>Дата заказа: </span>
                        { order.dateOrder != null ?  
                        <span className={classnames.textOrange}>{" " + transformDate(order.dateOrder)}</span> :
                        <span className={classnames.textOrange}>-</span> }
                    </p>
                    <p className={classnames.text}>
                        
                        <span>Дата доставки: </span>
                        {order.dateArrival != null ? 
                        <span className={classnames.textOrange}>{" " + transformDate(order.dateArrival)}</span> : <span className={classnames.textOrange}>Скоро сообщим</span>}
                    </p>
                    <ul className='list-order'>
                        {order.shoppingCart.map(item =>
                            <li key = {item.idOrderItem}>
                                <span className={classnames.count}>{item.count}</span>
                                {item.attributes && <Link to = {"/attributes/"+item.attributes.id} key = {item.attributes.id} ><ProductItem product={item.attributes} /></Link>}
                                {item.services && <Link to = {"/services/"+item.services.id} key = {item.services.id} ><ProductItem product={item.services} /></Link>}
                            </li>
                        )}
                    </ul>
                    <div className="order-footer">
                        <button className="button-cancel" onClick={()=>cancelOrder(order, setOrder)}>Отменить</button>
                    <div className={classnames.textBold}>{order.cost}р</div>
                    </div>
                </article> 
            
        </section>
    )
}