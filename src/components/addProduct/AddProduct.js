import React,{useState, useEffect} from "react";
import classNames from "classnames";
import { Image } from "../img/Image";
import { FormAtribut } from "./FormAtribut";
import { FormService } from "./FormService";

import './AddProduct.scss';

export const AddProduct = () =>{

    const [type, setType] = useState();
    const[isDisabled, setDisabled] = useState(true);
    const [isActive, setIsActive] = useState(false);

    const handleChangeRadio = (e) =>{
        setType(e.target.value);
        setDisabled(false);
    }

    const classnames = {
        container: 'main-container',
        form: "statement",
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
        textarea: 'change__textarea change__textarea_product',
        labels: 'change-title',
        label : 'change-title__label',

        dateContainer: "add-date-container",
        dateInput: "input-date",
        sizeInput: "input-size",
        addButton: 'change-button__submit',
        list: "description-list",
        item: "description-list__item create",
        size: "description-list__size",
        del: "date-list__delete",

        request: 'request'
    }

    return(
        <div className={classnames.container}>
            <form className={classnames.form}>
                <fieldset className = {classNames(classnames.open, { 'field-active': !isActive})}>
                    <legend className={classnames.title}>
                        1. Выберете, что хотите разместить
                    </legend>
                    <div className={classnames.radioContainer}>
                        
                        <label htmlFor="radioAtribut">
                            <input className = {classnames.radio} type="radio" name="idType" value ="1" id="radioAtribut" checked={type === "1"} onChange={(e) => handleChangeRadio(e)}/>
                            <span>Атрибутика</span>
                        </label>
                        
                        <label htmlFor="radioService">
                            <input className = {classnames.radio} type="radio" name="idType" value ="2" id = "radioService" checked={type === "2"} onChange={(e) => handleChangeRadio(e)} />
                            <span>Услуга</span>
                        </label>
                        <div className={classnames.buttonContainer} >
                            <button className={classnames.button} disabled = {isDisabled} onClick={(e) => {e.preventDefault(); setIsActive(!isActive)}} >
                                <Image src = './icons/then.svg' alt="Далее" width = {20} height = {20} />
                            </button>
                        </div>
                    </div>
                </fieldset>
            </form>
            {type === "1" && <FormAtribut classnames={classnames} isActive={isActive} setIsActive={setIsActive} type={type} />}
            {type === "2" && <FormService classnames={classnames} isActive={isActive} setIsActive={setIsActive} type={type} />}
        </div>
    )
}