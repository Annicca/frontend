import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { groupForm} from "../../Constant";
import { Image } from "../img/Image";
import { getPostConfig, getRequestConfig } from "../helpers/getRequestConfig";
import { useCities } from "../helpers/useCities";
import WindowedSelect from "react-windowed-select";
import { selectStyle } from "../groupChange/SelectStyle";

import './GroupChange.scss';


export const GroupChange = () =>{
    const params = useParams();
    const current = params.id;

    const [group, setGroup] = useState();
    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [city, setCity] = useState();
    const [address, setAddress] = useState();
    const [description, setDescription] = useState();

    const cities = useCities();

    const apiUrl = `http://localhost:8080/api/groups`;

    const navigate = useNavigate();

    useEffect(() => {
        const getGroup= async() => {
            await axios.get(apiUrl+`/${current}`, getRequestConfig())
            .then((resp) => {
                console.log(resp.data);
                setGroup(resp.data);
                setName(resp.data.nameGroup);
                setCategory(resp.data.category);
                setDescription(resp.data.descriptionGroup);
                setCity(resp.data.cityGroup);
                setAddress(resp.data.addressGroup);
            }).catch((error) => {
                console.log(error);
                if(error.response){
                    alert(error.response.data.message)
                } else{
                    alert('Мы не смогли изменить данныe(')
                }
            });
        }
        getGroup();
      }, [apiUrl, setGroup, current]); 

    const {
        register,
        formState: {errors},
        handleSubmit,
        control
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit= handleSubmit(async (data) =>{
        let groupChange = {
            ...group,
            ...data,
        }
        console.log(groupChange);
        if(window.confirm('Вы действительно хотите внести изменения?')){
            axios.put(apiUrl, groupChange, getRequestConfig()).then((result) =>{
                console.log(result.data);
                alert("Успешно");
                navigate('/mygroups');
            }).catch((e)=>{
                if(e.response){
                    alert(e.response.data.message)
                }else{
                    alert("Мы не смогли изменить данные(")
                }
                console.log(e);
            })
        }
    })

    const classnames = {
        form: 'change',
        formContainer: 'change-container',
        group : 'change__group',
        error: 'change__error',
        input: 'change__input',
        textarea: 'change__textarea',
        labels: 'change-title',
        label : 'change-title__label',
        buttonContainer: 'change-button',
        button: 'change-button__submit',
        buttonImg: 'change-button__img'
    }

    return(
        <div className="main-container">
            <form className = {classnames.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={classnames.buttonContainer}>
                    <button type = "submit" className={classnames.button}>
                        <Image src = './icons/ok.svg' alt = 'Сохранить' width = {24} height = {24} />
                    </button>
                </div>
                <div className={classnames.formContainer}>
                    <div className={classnames.labels}>
                        {groupForm.map((item,id) =>
                            <p className={classnames.label} key = {id}>{item}</p>
                        )}
                    </div>
                    {group == undefined ? <div>Loading..</div> :
                    <div> 
                        <div className = {classnames.group}>
                            <input 
                                type = "text" 
                                {...register('nameGroup',{
                                    maxLength:{value: 25, message: "Введено более 25 символов"},
                                    required : 'Поле обязательно',
                                })}
                                defaultValue = {group.nameGroup}
                                className = {classnames.input}
                                autoFocus 
                                 />
                            {errors?.nameGroup && < div className = {classnames.error}>{errors?.nameGroup?.message}</div>}
                        </div>
                        <div className = {classnames.group}>  
                            <input 
                            type ="text"
                            {...register('category', {
                                required : 'Поле обязательно',
                            })}
                            defaultValue = {group.category}
                            className = {classnames.input}
                             />
                            {errors?.category && < div className = {classnames.error}>{errors?.category?.message}</div>}
                        </div>
                        <div className = {classnames.group}>
                            <Controller
                            control={control}
                            name='cityGroup'
                           
                            rules={{ required : 'Поле обязательно' }}
                            render={({field:{onChange, value, ref}}) => (
                                <WindowedSelect 
                                    placeholder="Выберете город"
                                    styles={selectStyle} 
                                    defaultValue = {group.cityGroup}
                                    onChange={onChange}
                                    inputRef={ref}
                                    options={cities}
                                    getOptionLabel={option => option.city}
                                    getOptionValue={option => option.idCity}
                                />)}
                            />
                            {errors?.cityGroup && <div className = {classnames.error}>{errors?.cityGroup?.message}</div>}
                        </div>
                        <div className = {classnames.group}>
                            <input 
                                type ="text"
                                {...register('addressGroup', {
                                    required : 'Поле обязательно',
                                })}
                                defaultValue = {group.addressGroup}
                                className = {classnames.input}
                                placeholder = " "
                                 />
                            {errors?.addressGroup && <div className = {classnames.error}>{errors?.addressGroup?.message}</div>}
                        </div>
                        <textarea {...register('descriptionGroup')} className={classnames.textarea} cols={43} defaultValue = {group.descriptionGroup} />
                    </div>}
                </div>

            </form>
        </div>
    )
}