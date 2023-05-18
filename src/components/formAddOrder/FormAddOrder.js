import React from "react"
import './FormAddOrder.scss'
import { useForm, Controller } from "react-hook-form";
import { useCities } from "../helpers/useCities";
import WindowedSelect from "react-windowed-select";
import { selectStyle } from "../groupChange/SelectStyle";
import { getPostConfig } from "../helpers/getRequestConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

export const FormAddOrder = ({order, setActive}) =>{

    const cities = useCities();

    let navigate = useNavigate();

    const classnames = {
        addContainer: 'take-part add-order',
        form: 'statement add-order__form',
        buttonContainer : 'button-container',
        submit: 'submit',
        closeX: 'add-order__close',
        title: 'take-part__title',
        label : 'add-order__label',
        group : 'change__group',
        error: 'change__error',
        input: 'change__input',
    }

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
        let newOrder = {
            ...order,
            ...data,
            // statusOrder : "CREATE",
            dateOrder : new Date()
        }
        delete newOrder.shoppingCart;
        console.log(newOrder);
        await axios.put(`http://localhost:8080/api/buy`, newOrder, getPostConfig())
        .then(() => navigate('/orders'))
        .catch((error) =>{ 
            alert("Что-топошло не так");
            console.log(error);
        })
    })

    return(
        <div className={classnames.addContainer}>
            <form className={classnames.form} onSubmit={onSubmit}>
                <p className={classnames.title}>
                    <span>Укажите адрес доставки</span>
                    <span className={classnames.closeX} onClick={() => setActive(false)}>x</span>
                </p>

                <div className = {classnames.group}>
                    <label className={classnames.label}>Город</label>
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
                    <label className={classnames.label}>Адрес</label>
                    <input 
                    type ="text"
                    placeholder="ул. Новая, д. 1, кв. 1"
                    {...register('address', {
                        required : 'Поле обязательно',
                    })}
                    className = {classNames(classnames.input, 'add-order__address') } />
                    {errors?.address && <div className = {classnames.error}>{errors?.address?.message}</div>}
                </div>
                <div className = {classnames.buttonContainer}>
                    <button type="submit" className={classnames.submit} >Заказать</button>
                </div>
            </form>
        </div>   
    )

}