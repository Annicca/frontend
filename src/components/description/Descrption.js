import React, {useState} from "react"
import { cutDescription } from "../helpers/cutDescription"

export const Description = ({text, classnames}) =>{

    const [openDescription, setOpenDescription] = useState(false)

    return(
        <>
            {!openDescription ?
            <p className={classnames.text}>{cutDescription(text)}
            {text.length > 500 ? 
            <span onClick={()=>setOpenDescription(!openDescription)} className={classnames.moreText}>... Читать больше?</span> : ""}
            </p>
            :
            <p className={classnames.text}>{text}
            <span onClick={()=>setOpenDescription(!openDescription)} className={classnames.moreText}>Скрыть</span>
            </p>

            }
        </>
    )
}
