import React from "react";
import classNames from "classnames";
import { useForm} from "react-hook-form";

import './Filter.scss';

export const Filter = ({active, setIsFilter, setFilter}) =>{

    const {
        register,
        handleSubmit,
    } = useForm({
        mode: "onBlur"
    });

    const onFilter = handleSubmit((data)=>{
        console.log(data)
        setFilter(data)
        setIsFilter(!active)
    })

    return(
        <div className={classNames('filter-hide',{'filter':active})}>
            <form onSubmit={handleSubmit(onFilter)}>
                <div className="group-filter">Даты проведения:</div>
                <div className="group-filter">
                    <label className="group-filter__label">С:
                        <input 
                        type="date" 
                        className="group-filter__input"
                        {...register('dateStart')}/>
                    </label>
                </div>
                <div className="group-filter">
                    <label className="group-filter__label">До:
                        <input 
                        type="date" 
                        className="group-filter__input"
                        {...register('dateFinish')}/>
                    </label>
                </div>
                <div className="group-filter">
                    <input 
                    type="checkbox" 
                    name="participant"
                    {...register('statusCompetition')}/>
                    <label htmlFor="participant">Набор участников</label>
                </div>
                <div className="filter__button-container">
                    <button type="reset" className="filter__button" onClick={() =>{setFilter({}); setIsFilter(!active)}} >Отменить</button>
                    <button type="submit" className="filter__button">Принять</button>
                </div>
            </form>
        </div>
    )
}