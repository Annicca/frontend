import React from "react";
import { ShoppingCartIcon } from "../../icon/ShoppingCartIcon";

import './ShopBasket.scss';

export const ShopBasket = ({amount, onClick, width, height}) =>{

    const classnames = {
        buy: "buy",
        amount: "buy__amount",
        basket : "buy__basket",
    }

    return(
        <button className={classnames.buy} onClick={(e)=>{e.preventDefault(); onClick();}} >
            <span className={classnames.amount}>{amount}</span>
            <ShoppingCartIcon className = {classnames.basket} width = {width} height = {height}/>   
        </button>
    )
}