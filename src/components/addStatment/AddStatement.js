import React, {useState} from "react";
import { TitlePage } from "../TitlePage/TitlPage";
import {Image} from "../img/Image";
import { useForm, Controller } from "react-hook-form";
import { statementGroup, competitionForm, sellerRole } from "../../Constant";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { getPostConfig } from "../helpers/getRequestConfig";
import { useCities } from "../helpers/useCities";
import WindowedSelect from "react-windowed-select";
import { selectStyle } from "../groupChange/SelectStyle";

import './AddStatement.scss';

export const FormFooter = ({title, classnames, isActive, setIsActive}) =>{
    return(
        <div className={classNames(classnames.buttonContainer, classnames.submitContainer)}>
            <button className={classnames.button} onClick={(e) => {e.preventDefault(); setIsActive(!isActive)}} >
                <Image src = './icons/leftarrow.svg' alt="Далее" width = {20} height = {20} />
            </button>
            <button type="submit" className={classnames.submit} >{title}</button>
        </div>
    )
}

const FormStatement = ({cities}) =>{

    const store = require('store');
    const user = store.get('user');

    let navigate = useNavigate();

    

    const [isActive, setIsActive] = useState(false);
    const [type, setType] = useState();
    const[isDisabled, setDisabled] = useState(true);

    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [dateStart, setStart] = useState('');
    const [dateFinish, setFinish] = useState('');
    const [description, setDescription] = useState('');


    const {
        register,
        formState: {errors},
        handleSubmit,
        control
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = handleSubmit(async (data) => {
        console.log(data.city)
        let statement = {
            type: type,
            ...data,
        }
        console.log(statement);
        await axios.post(`http://localhost:8080/api/statements/${user.idUser}`, JSON.stringify(statement), getPostConfig())
        .then(() => navigate('/mystatements'))
        .catch((error) =>{ 
            alert("Что-топошло не так");
            console.log(error);
        })
    })

    const handleChangeRadio = (e) =>{
        setType(e.target.value);
        setDisabled(false);
    }

    const groupType = "GROUP";
    const competitionType = "COMPETITION"

    const classnames = {
        
        form: 'statement',
        title: 'field-choose__title',
        radioContainer: 'form-container',
        radio: 'form-container__radio',
        choose: 'field-choose',
        open: 'field-open',
        button: 'form-container__then',
        active: 'field-active',
        buttonContainer: 'button-container',
        submitContainer: 'submit-container',
        submit: 'submit',
        message: 'message-statement',

        formContainer: 'change-container change-container_margin',
        group : 'change__group',
        error: 'change__error',
        input: 'change__input',
        textarea: 'change__textarea',
        labels: 'change-title',
        label : 'change-title__label', 
    }

    return(
        <>
        <p className={classnames.message}>Внимание, если вы являетесь руководителем коллектива,то вы можете подать заявку только на размещение коллектива.
            <p>А если вы организатор конкурса, то только на размещение конкурса.</p>
        </p>
        {user.role === sellerRole ?
        <p className={classnames.message}>Вы не можете разместить коллектив или конкурс</p>:
        <form className={classnames.form} onSubmit={onSubmit} >
            <fieldset className = {classNames(classnames.open, { 'field-active': !isActive})}>
                <legend className={classnames.title}>
                    1. Выберете, что хотите разместить
                </legend>
                
                <div className={classnames.radioContainer}>
                    {user.role !== "ORGANIZER" &&
                    <label htmlFor="radioGroup">
                        <input className = {classnames.radio} type="radio" name="type" value ={groupType} id="radioGroup" checked={type === groupType} onChange={(e) => handleChangeRadio(e)}/>
                        <span>Коллектив</span>
                    </label>}
                    {user.role !== "DIRECTOR" &&
                    <label htmlFor="radioCompetition">
                        <input className = {classnames.radio} type="radio" name="type" value ={competitionType} id = "radioCompetition" checked={type === competitionType} onChange={(e) => handleChangeRadio(e)} />
                        <span>Конкурс</span>
                    </label>}
                    <div className={classnames.buttonContainer} >
                        <button className={classnames.button} disabled = {isDisabled} onClick={(e) => {e.preventDefault(); setIsActive(!isActive)}} >
                            <Image src = './icons/then.svg' alt="Далее" width = {20} height = {20} />
                        </button>
                    </div>
                </div>
            </fieldset>
            {type === groupType && <fieldset  className = {classNames(classnames.open, { 'field-active': isActive && type === groupType })} >
                <legend className={classnames.title} >
                    2. Заполните данные о коллективе
                </legend>
                <div className={classnames.formContainer}>
                    <div className={classnames.labels}>
                        {statementGroup.map((item,id) =>
                            <p className={classnames.label} key = {id}>{item}</p>
                        )}
                    </div>
                    <div> 
                        <div className = {classnames.group}>
                            <input 
                                type = "text" 
                                {...register('name',{
                                    maxLength : {value: 25, message: "Введено более 25 символов"},
                                    required : 'Поле обязательно',
                                })}
                                className = {classnames.input}
                                autoFocus  />
                            {errors?.name && < div className = {classnames.error}>{errors?.name?.message}</div>}
                        </div> 

                        <div className = {classnames.group}>
                            <Controller
                            control={control}
                            name='city'
                            rules={{ required : 'Поле обязательно' }}
                            render={({field:{onChange, value, ref}}) => (
                                <WindowedSelect 
                                    placeholder="Выберете город"
                                    styles={selectStyle} 
                                    onChange={onChange}
                                    inputRef={ref}
                                    value={cities.find(c => c.value === value)}
                                    options={cities}
                                    getOptionLabel={option => option.city}
                                    getOptionValue={option => option.idCity}
                                />)}
                            />
                            {errors?.city && < div className = {classnames.error}>{errors?.city?.message}</div>}
                        </div>
                        <div className = {classnames.group}>
                            <input 
                                type ="text"
                                {...register('address', {
                                    required : 'Поле обязательно',
                                })}
                                className = {classnames.input} />
                            {errors?.address && <div className = {classnames.error}>{errors?.address?.message}</div>}
                        </div>
                        <textarea className={classnames.textarea} cols={43} {...register('description')} />
                    </div>
                    
                </div>
                <FormFooter title="Подать заявку" classnames={classnames} isActive={isActive}  setIsActive={setIsActive}/>
            </fieldset>}
            {type === competitionType && <fieldset  className = {classNames(classnames.open, { 'field-active': isActive && type === competitionType })} >
                <legend className={classnames.title} >
                    2. Заполните данные о конкурсе
                </legend>
                <div className={classnames.formContainer}>
                    <div className={classnames.labels}>
                        {competitionForm.map((item,id) =>
                            <p className={classnames.label} key = {id}>{item}</p>
                        )}
                    </div>
                    <div> 
                        <div className = {classnames.group}>
                            <input 
                                type = "text" 
                                name="name"
                                {...register('name',{
                                    maxLength : {value: 25, message: "Введено более 25 символов"},
                                    required : 'Поле обязательно',
                                })}
                                className = {classnames.input}
                                autoFocus />
                            {errors?.name && < p className = {classnames.error}>{errors?.name?.message}</p>}
                        </div>
                        <div className = {classnames.group}>  
                            <input 
                            type ="date"
                            {...register('dateStart', {
                                required : 'Поле обязательно',
                            })}
                            className = {classnames.input}/>
                            {errors?.dateStart && < div className = {classnames.error}>{errors?.dateStart?.message}</div>}
                        </div>
                        <div className = {classnames.group}>
                            <input 
                                type = "date" 
                                {...register('dateFinish',{
                                    required : 'Поле обязательно',
                                })}
                                className = {classnames.input} />
                            {errors?.dateFinish && < div className = {classnames.error}>{errors?.dateFinish?.message}</div>}
                        </div>
                        <div className = {classnames.group}>
                            <Controller
                            control={control}
                            name='city'
                            rules={{ required : 'Поле обязательно' }}
                            render={({field:{onChange, value, ref}}) => (
                                <WindowedSelect 
                                    placeholder="Выберете город"
                                    styles={selectStyle} 
                                    onChange={onChange}
                                    inputRef={ref}
                                    value={cities.find(c => c.value === value)}
                                    options={cities}
                                    getOptionLabel={option => option.city}
                                    getOptionValue={option => option.idCity}
                                />)}
                            />
                            {errors?.city && <div className = {classnames.error}>{errors?.city?.message}</div>}
                        </div>
                        <textarea className={classnames.textarea} cols={43} {...register('description')} />
                    </div>
                </div>
                <FormFooter title="Подать заявку" classnames={classnames} isActive={isActive}  setIsActive={setIsActive} />
            </fieldset>}
        </form>}
        </>
    )
}

export const AddStatement = () =>{

    const classnames = {
        container: 'main-container',
        request: 'request'
    }

    const store = require('store');
    const user = store.get('user');

    const cities = useCities();
    
    return(
        <div className={classnames.container}>
            <TitlePage title={'Подать заявку'} />
            {!user ? 
                <h3 className={classnames.request}>Необходимо <Link to="/login">авторизоваться</Link></h3> :
                cities === undefined ? <p>Loading...</p> : 
                <FormStatement classnames={classnames} cities = {cities} />
            }
        </div>
    )
}

