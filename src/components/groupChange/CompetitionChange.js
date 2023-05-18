import React, {useState, useEffect, useMemo} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { competitionForm, City} from "../../Constant";
import { Image } from "../img/Image";
import { getRequestConfig } from "../helpers/getRequestConfig";
import { useCities } from "../helpers/useCities";
import WindowedSelect from "react-windowed-select";
import { selectStyle } from "../groupChange/SelectStyle";

// import { getCities } from "../helpers/getCities";

import './GroupChange.scss';


export const CompetitionChange = () =>{
    const params = useParams();
    const current = params.id;

    const [competition, setCompetition] = useState();
    const cities = useCities();

    // const apiUrl = `https://localhost:44344/api/competitions/${current}`;
    const apiUrl = `http://localhost:8080/api/competitions`;

    const navigate = useNavigate();

    useEffect(() => {
        const getCompetition= async() => {
            await axios.get(apiUrl+`/${current}`, getRequestConfig()).then((resp) => {
                console.log(resp.data);
                setCompetition(resp.data);

            }).catch((error) => console.log(error));
        }
        getCompetition();
        
      }, [apiUrl, setCompetition, current]); 

    const {
        register,
        formState: {errors},
        handleSubmit,
        control
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = handleSubmit(async (data) =>{
        let competitionChange = {
            ...competition,
            ...data,
        }
        console.log(JSON.stringify(competitionChange));
        if(window.confirm('Вы действительно хотите внести изменения?')){
            axios.put(apiUrl, competitionChange, getRequestConfig())
            .then((result) =>{
                console.log(result.data);
                alert("Успешно");
                navigate('/mycompetitions');
            }).catch((error) => {
                console.log(error);
                if(error.response){
                    alert(error.response.data.message)
                } else{
                    alert('Мы не смогли изменить данныe(')
                }
            });
        }
    })

    const classnames = {
        container: 'main-container',
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
        <div className={classnames.container}>
            <form className = {classnames.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={classnames.buttonContainer}>
                    <button type = "submit" className={classnames.button}>
                        <Image src = './icons/ok.svg' alt = 'Сохранить' width = {24} height = {24} />
                    </button>
                </div>
                <div className={classnames.formContainer}>
                    <div className={classnames.labels}>
                        {competitionForm.map((item,id) =>
                            <p className={classnames.label} key = {id}>{item}</p>
                        )}
                    </div>
                    {competition == undefined ? <div>Loading..</div> :
                    <div> 
                        <div className = {classnames.group}>
                            <input 
                                type = "text" 
                                {...register('nameCompetition',{
                                    required : 'Поле обязательно',
                                })}
                                defaultValue = {competition.nameCompetition}
                                className = {classnames.input}
                                autoFocus 
                                 />
                            {errors?.nameCompetition && < div className = {classnames.error}>{errors?.nameCompetition?.message}</div>}
                        </div>
                        <div className = {classnames.group}>  
                            <input 
                            type ="date"
                            {...register('dateStart', {
                                required : 'Поле обязательно',
                            })}
                            defaultValue = {competition.dateStart}
                            className = {classnames.input}
                            />
                            {errors?.dateStart && < div className = {classnames.error}>{errors?.dateStart?.message}</div>}
                        </div>
                        <div className = {classnames.group}>
                            <input 
                                type = "date" 
                                defaultValue = {competition.dateFinish}
                                {...register('dateFinish',{
                                    required : 'Поле обязательно',
                                })}
                               
                                className = {classnames.input}
                                />
                            {errors?.dateFinish && < div className = {classnames.error}>{errors?.dateFinish?.message}</div>}
                        </div>
                        <div className = {classnames.group}>
                            <Controller
                            control={control}
                            name='cityCompetition'
                            rules={{ required : 'Поле обязательно' }}
                            render={({field:{onChange, value, ref}}) => (
                                <WindowedSelect 
                                    placeholder="Выберете город"
                                    styles={selectStyle} 
                                    defaultValue = {competition.cityCompetition}
                                    onChange={onChange}
                                    inputRef={ref}
                                    options={cities}
                                    getOptionLabel={option => option.city}
                                    getOptionValue={option => option.idCity}
                                />)}
                            />
                            {errors?.cityCompetition && <div className = {classnames.error}>{errors?.cityCompetition?.message}</div>}
                        </div>
                        <textarea 
                        className={classnames.textarea} 
                        cols={43} 
                        defaultValue = {competition.descriptionCompetition} 
                        {...register('descriptionCompetition')}/>
                    </div>}
                </div>

            </form>
        </div>
    )
}