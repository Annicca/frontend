import React from "react";
import classNames from "classnames";

export const SearchIcon = ({className}) =>{
    const classes = classNames(
        className
    )

    return (
        <svg 
        width="19" 
        height="21" 
        viewBox="0 0 19 21" 
        className ={classes}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
        <line x1="9.74741" y1="11.3356" x2="17.7474" y2="20.3356" stroke="#4F4F4F" strokeWidth="2"/>
        <circle cx="7" cy="7" r="6" stroke="#4F4F4F" strokeWidth="2"/>
        </svg>
    )

}