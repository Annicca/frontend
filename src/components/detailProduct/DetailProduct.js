import React, {useState, useEffect} from "react";
import {useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getRequestConfig } from "../helpers/getRequestConfig";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { getDate } from "../helpers/getDate";
import { Image } from "../img/Image";

import './DetailProduct.scss';
import { EditeTable } from "../TableAdmin/EditeTable";

export const DetailProduct = ({path, titles, listCategory}) =>{

    let navigate = useNavigate();
    const store = require('store');

    const params = useParams();
    const current = params.id;

    const [product, setProduct] = useState();
    const [dateTime, setDateTime] = useState();
    const [size, setSize] = useState();

    const {
        register,
        setValue,
        formState: {errors},
        handleSubmit
    } = useForm({
        mode: "onBlur"
    });

    const apiUrl = `http://localhost:8080/api/${path}/${current}`;

    const getProductChange = async() => {
        await axios.get(apiUrl, getRequestConfig())
        .then((resp) => {
            console.log(resp.data);
            setProduct(resp.data);

            setValue("title", resp.data.title);
            setValue("cost", resp.data.cost);
            setValue("seller", resp.data.seller);
            setValue("description", resp.data.description);
            if(resp.data.amount){
                setValue("amount", resp.data.amount);
            }
            
        })
        .catch((error) => console.log(error));
    }

    useEffect(() => {
        getProductChange();
    }, []); 

    const onSubmit = handleSubmit(async (data) => {
        let productChange = {
            ...product,
            ...data,
            "seller": product.seller,
        }
    
        console.log(productChange);
        if(window.confirm('Вы действительно хотите внести изменения?')){
            axios.put(`http://localhost:8080/api/${path}`, productChange, getRequestConfig())
            .then((result) =>{
                console.log(result.data);
                alert("Успешно");
            }).catch((e)=>{
                alert("Мы не смогли изменить данные(")
                console.log(e.response.data.message);
            })
        }
    })

    const deleteDate = async(e,id) =>{
        e.preventDefault(e);
        console.log(id)
        await axios.delete(`http://localhost:8080/api/date/${id}`, getRequestConfig())
        .then((resp)=>{
            console.log(resp.data);
            setProduct({...product,
            "dates": resp.data})
            setValue("dates", resp.data)
        })
        .catch((error)=>{
            console.log(error);
            if(error.response.data){
                alert(error.response.data.message)
            } else{
                alert("Что-то пошло не так(")
            }
        })
    }

    const addDate = async() =>{
        let newDate = {"idService" : product.id,"date":dateTime}
        await axios.post(`http://localhost:8080/api/date`,newDate, getRequestConfig())
        .then((resp)=>{
            console.log(resp.data);
            setProduct({
                ...product,
                "dates": resp.data})
            setValue("dates", resp.data)
        })
        .catch((error)=>{
            console.log(error);
            if(error.response.data){
                alert(error.response.data.message)
            } else{
                alert("Что-то пошло не так(")
            }
        })
    }

    const addSize = async(e) =>{
        e.preventDefault()
        let newSize = {"idAttribute" : product.id, ...size}
        console.log(newSize)
        await axios.post(`http://localhost:8080/api/size`,newSize, getRequestConfig())
        .then((resp)=>{
            console.log(resp.data);
            setProduct({...product, "size": resp.data})
            setValue("size", resp.data)
            setSize({})
        })
        .catch((error)=>{
            console.log(error);
            if(error.response.data){
                alert(error.response.data.message)
            } else{
                alert("Что-то пошло не так(")
            }
        })
        
    }

    const classnames = {
        main: 'main-container',
        title: 'main-container-user',
        detail: 'main-container-form',
        childFirst: 'main-container-form-child1',
        childSecond: 'main-container-form-child2',
        child1Element: 'main-container-form-child1-item',
        childSecondItem: 'child2-item',
        buttonContainer: 'main-container-form-child2-box',
        button: 'description-statement__button',
        submit: 'description-statement__button',
        input: 'change__input',
        textarea: 'change__textarea textarea-description',
        dateInput: "input-date",
        sizeInput: "input-size",
        list: "description-list",
        item: "description-list__item",
        date: "description-list__date",
        time: "description-list__time",
        size: "description-list__size",
        del: "date-list__delete",
        dateContainer: "date-container",
        addButton: 'change-button__submit',
    }
    

    if(!product){
        return(
            <div className={classnames.main}>Loading...</div>
        )
    } else
    return(
        <form className={classnames.main} onSubmit={onSubmit}>
           <p className={classnames.title}> {'№' + product.id}</p>
            <div className = {classnames.detail}>
                <div className = {classnames.childFirst}>
                    {titles.map((item,index) =>
                        <p key = {index} className = {classnames.child1Element}>
                            <span>{item}</span>
                        </p>
                    )}
                </div>
                <div className={classnames.childSecond} >
                    <div className = {classNames(classnames.input, classnames.childSecondItem)}>
                        {product.seller.surnameUser + " " + product.seller.nameUser + " " + product.seller.patronimycUser}
                    </div>

                    <input 
                    type="text"
                    className = {classNames(classnames.input, classnames.childSecondItem)}
                    {...register('title')} 
                    defaultValue = {product.title}/>

                    
                    {product?.category && <select
                        defaultValue = {listCategory.filter((c)=>c.category === product?.category)[0].category}
                        className = {classNames(classnames.input, classnames.childSecondItem)}
                        {...register('category')}>
                        {listCategory.map(category =>
                            <option value={category.category} key= {category.category}>{category.title}</option>    
                        )}
                    </select>}

                    <input 
                    type="text"
                    className = {classNames(classnames.input, classnames.childSecondItem)}
                    {...register('cost')} 
                    defaultValue = {product?.cost}/>
                    
                    <div>
                    {product.dates || product.dates?.length == 0 ? 
                        <ul className={classNames(classnames.list, "date-list" )}>
                            <div className={classnames.dateContainer}>
                                <input type="datetime-local" onChange={(e)=>setDateTime(e.target.value)}  className={classNames(classnames.input, classnames.dateInput)}/>
                                <button className={classnames.addButton} onClick={(e)=>addDate(e)}>
                                    <Image src = './icons/ok.svg' alt = 'Сохранить' width = {24} height = {24} />
                                </button>
                            </div>

                            {product.dates.map(date=>
                                <li key={date.idDate} className={classnames.item}>
                                    <span className={classnames.date}>{getDate(date.date).date}</span>
                                    <span className={classnames.time}>{getDate(date.date).time}</span>
                                    <span className={classnames.del} onClick={(e)=>deleteDate(e,date.idDate)}>X</span>
                                </li>
                            )}
                        </ul>

                        :
                        <>
                            <div className={classnames.dateContainer}>
                                <input type="text" placeholder="Размер" onChange={(e)=>setSize({size:e.target.value})} className={classNames(classnames.input, classnames.sizeInput)} />
                                <input type="number" placeholder="Кол-во" onChange={(e)=>setSize({...size, amount : e.target.value})} className={classNames(classnames.input, classnames.sizeInput)} />
                                <button className={classnames.addButton} onClick={(e)=>addSize(e)}>
                                    <Image src = './icons/ok.svg' alt = 'Сохранить' width = {24} height = {24} />
                                </button>
                            </div>
                           
                            {product.size.length != 0 && <EditeTable 
                                columns = {[{ field: 'size', fieldName: 'Размер' },{ field: 'amount', fieldName: 'Кол-во' }, { field: 'edit', fieldName: 'Изменить' }]}
                                rows = {product?.size}
                                actions
                            />}
                        </>
                    }</div>

                    <label htmlFor="description" className = {classNames(classnames.child1Element, "textarea-label")}>Описание</label>
                    <textarea
                        className = {classNames( classnames.textarea, classnames.input)}
                        {...register('description')} 
                        defaultValue = {product?.description}/>
                    
                </div>
            </div>

            <div className={classnames.buttonContainer}>
                <button className={classnames.button} onClick={(e) => {e.preventDefault(); navigate(-1)}}>Назад</button>
                <button type="submit" className={classnames.submit}>Изменить</button>
            </div>
        </form>
    )
}