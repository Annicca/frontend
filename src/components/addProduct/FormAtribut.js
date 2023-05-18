import React,{useState, useEffect} from "react";
import classNames from "classnames";
import { Image } from "../img/Image";
import { useForm } from "react-hook-form";
import { FormFooter } from "../addStatment/AddStatement";
import { inputTitleAtribut, atributsCategory } from "../../Constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getPostConfig } from "../helpers/getRequestConfig";
import { EditeTable } from "../TableAdmin/EditeTable";


export const FormAtribut = ({classnames, isActive, setIsActive, type}) =>{

    const store = require('store');
    const user = store.get('user');

    let navigate = useNavigate();

    const [size, setSize] = useState();
    const [listSize, setListSize] = useState([]);

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        let atribut = {
            ...data,
            seller: user,
            size: listSize,
        }
        console.log(atribut);
        await axios.post('http://localhost:8080/api/attributes', JSON.stringify(atribut), getPostConfig())
        .then(() => 
            navigate(-1)
        )
        .catch((error) =>{ 
            alert("Что-топошло не так");
            console.log(error);
        })
    })

    const addSize = (e) =>{
        e.preventDefault();
        let idSize;
        if(listSize.length !== 0){
            idSize = listSize.length + 1;
        } else{
            idSize = 0;
        }
        let newSize = {idSize : idSize , ...size};
        console.log(newSize)
        setListSize([...listSize,newSize]);
    }

    const deleteSize = (id, e) =>{
        e.preventDefault()
        let newlistSize = listSize.filter(size => {return size.idSize !== id});
        console.log(newlistSize)
        setListSize(newlistSize);
    }

    return(
        <form className={classnames.form} onSubmit={onSubmit} >
            <fieldset  className = {classNames(classnames.open, { 'field-active': isActive && type === "1" })} >
                <legend className={classnames.title} >
                    2. Заполните данные
                </legend>
                <div className={classnames.formContainer}>
                    <div className={classnames.labels}>
                        {inputTitleAtribut.slice(1).map((item,id) =>
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
                                {atributsCategory.map(category =>
                                <option value={category.category} key= {category.category}>{category.title}</option>    
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

                        <div >
                            <div className={classnames.group}>
                            <div className={classnames.dateContainer}>
                                <input
                                {...register('size.size', {
                                    required : 'Размер обязателен',
                                })}
                                placeholder="Размер" 
                                type="text" 
                                onChange={(e)=>setSize({...size, size: e.target.value})} 
                                className={classNames(classnames.input, classnames.sizeInput)} />
                                <input 
                                {...register('size.amount', {
                                    required : 'Количество обязательно',
                                })}
                                type="number" 
                                placeholder="Кол-во" 
                                onChange={(e)=>setSize({...size, amount : e.target.value})} 
                                className={classNames(classnames.input, classnames.sizeInput)} />
                                <button className={classnames.addButton} onClick={(e)=>addSize(e)}>
                                    <Image src = './icons/ok.svg' alt = 'Сохранить' width = {24} height = {24} />
                                </button>
                            </div>
                            {errors?.size?.size ? 
                            <div className = {classnames.error}>{errors?.size?.size?.message}</div> :
                            errors?.size?.amount && <div className = {classnames.error}>{errors?.size?.amount?.message}</div>
                            }
                            </div>

                            
                            
                            {listSize.length != 0 && <EditeTable 
                                    columns = {[{ field: 'size', fieldName: 'Размер' },{ field: 'amount', fieldName: 'Кол-во' },{ field: 'del', fieldName: 'Удалить' }]}
                                    rows = {listSize}
                                    delet
                                    onDelete = {deleteSize}
                            />}
                        </div>
                        
                        <textarea placeholder="Описание" className={classnames.textarea} cols={43} {...register('description')} />
                        
                    </div>
                    
                </div>
                <FormFooter title="Добавить" classnames={classnames} isActive={isActive}  setIsActive={setIsActive}/>
            </fieldset>
        </form>
    )
}