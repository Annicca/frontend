import React,{useState, useEffect} from "react";
import classNames from "classnames";
import { Image } from "../img/Image";
import { useForm } from "react-hook-form";
import { FormFooter } from "../addStatment/AddStatement";
import { inputTitleService, servicesCategory } from "../../Constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getPostConfig } from "../helpers/getRequestConfig";
import { getDate } from "../helpers/getDate";


export const FormService = ({classnames, isActive, setIsActive, type}) =>{

    const store = require('store');
    const user = store.get('user');

    let navigate = useNavigate();

    const [date, setDate] = useState();
    const [listDate, setListDate] = useState([]);

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = handleSubmit(async (data) => {
        let service = {
            ...data,
            seller: user,
            dates: listDate,
        }
        console.log(service);
        await axios.post('http://localhost:8080/api/services', JSON.stringify(service), getPostConfig())
        .then(() => navigate(-1))
        .catch((error) =>{ 
            alert("Что-топошло не так");
            console.log(error);
        })
    })

    const addDate = (e) =>{
        e.preventDefault();
        let id;
        if(listDate.length !== 0){
            id = listDate.length + 1;
        } else{
            id = 0;
        }
        let newDate = {"idDate" : id ,"date":date};
        setListDate([...listDate,newDate]);
    }

    const deleteDate = (id) =>{
        let newlistDate = listDate.filter(date => {return date.idDate !== id});
        setListDate(newlistDate);
    }

    return(
        <form className={classnames.form} onSubmit={onSubmit} >
            <fieldset  className = {classNames(classnames.open, { 'field-active': isActive && type === "2" })} >
                <legend className={classnames.title} >
                    2. Заполните данные
                </legend>
                <div className={classnames.formContainer}>
                    <div className={classnames.labels}>
                        {inputTitleService.slice(1).map((item,id) =>
                            <p className={classnames.label} key = {id}>{item}</p>
                        )}
                        
                    </div>
                    <div> 
                        <div className = {classnames.group}>
                            <input 
                                type = "text" 
                                {...register('title',{
                                    required : 'Поле обязательно',
                                })}
                                className = {classnames.input}
                                autoFocus  />
                            {errors?.title && < div className = {classnames.error}>{errors?.title?.message}</div>}
                        </div> 
                        <div className = {classnames.group}>
                            <select
                                className = {classnames.input}
                                {...register('category',{
                                    required : 'Поле обязательно',
                                })}
                            >
                                {servicesCategory.map(category =>
                                <option key= {category.category} value={category.category}>{category.title}</option>    
                                )}
                            </select>

                        </div>
                        <div className = {classnames.group}>
                            <input 
                                type ="text"
                                {...register('cost', {
                                    required : 'Поле обязательно',
                                })}
                                className = {classnames.input} />
                            {errors?.cost && <div className = {classnames.error}>{errors?.cost?.message}</div>}
                        </div>

                        <ul className={classNames(classnames.group, "date-list", classnames.list)}>
                            <div className={classnames.dateContainer}>
                                <input type="datetime-local" onChange={(e)=>setDate(e.target.value)}  className={classNames(classnames.input, classnames.dateInput)}/>
                                <button className={classnames.addButton} onClick={(e)=>addDate(e)}>
                                    <Image src = './icons/ok.svg' alt = 'Сохранить' width = {24} height = {24} />
                                </button>
                            </div>
                            
                            {listDate.map(date=>
                                <li key={date.idDate} className={classnames.item}>
                                    <span className={classnames.date}>{getDate(date.date).date}</span>
                                    <span className={classnames.time}>{getDate(date.date).time}</span>
                                    <span className={classnames.del} onClick={()=>deleteDate(date.idDate)}>X</span>
                                </li>
                            )}
                        </ul>
                        
                        <textarea placeholder="Описание" className={classnames.textarea} cols={43} {...register('description')} />
                        
                    </div>
                    
                </div>
                <FormFooter title="Добавить" classnames={classnames} isActive={isActive}  setIsActive={setIsActive}/>
            </fieldset>
        </form>
    )
}