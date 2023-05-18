import React, { useState } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { ShopBasket } from "../shopBasket/ShopBasket";

import './ListProduct.scss';

export const ProductItem = ({product}) =>{

    const [amount, setAmount] = useState(0);

    const classnames = {
        product: "product",
        img: "product__img",
        price: "product__price",
        seller: "product__seller",
        title: "product__title",
        buyContainer: "buy-container",

    }

    const handleAmount = () =>{
        setAmount(amount+1);
    }
    return(
        <div className={classnames.product}>
            <img src = {product.img} alt = {product.title} className={classnames.img} />
            <p className={classnames.price}>{product.cost + "р"}</p>
            <p className={classnames.seller}>{product.seller.surnameUser + " " + product.seller.nameUser + " " + product.seller.patronimycUser}</p>
            <p className={classnames.title}>{product.title}</p>
            {/* <div className = {classnames.buyContainer} >
                <ShopBasket amount = {amount} onClick={handleAmount} width={38} height={48} />
            </div> */}
        </div>
    )
}

export const ListProduct = ({products, link, classnames}) =>{
    return(
        <div className = {classNames(classnames.productList, "list-product")}>
            {products ? products.map(product =>(
                <Link to = {link+product.id} key = {product.id} >
                    <ProductItem product={product} />
                </Link>
            )) : <div>Loading...</div>}
        </div>
    )
}