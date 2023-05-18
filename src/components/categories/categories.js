import React, { useCallback, useState } from "react";
import './categories.scss';
import classNames from "classnames";



export const Categories = ({listCategories, setCategory}) =>{
    const [isCategory, setIsCategory] = useState(0);

    const onChangeCategory = useCallback((categoryValue, index) =>{
            setIsCategory(index);
            setCategory(categoryValue);
        }
    )

    return(
        <ul className='main-container-list'>
            {listCategories.map((category, index) =>
                <li key = {category.category}
                className={classNames("categori", { 'categori_active': isCategory === index})}
                onClick={()=>onChangeCategory(category.category,index)}>
                    {category.title}
                </li>
            )}
        </ul>
    )
}
