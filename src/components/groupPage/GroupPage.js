import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Image } from "../img/Image";
import { Contact } from "../contact/Contact";
import { urlSrc } from "../../Constant";

import './GroupPage.scss';

export const GroupPage = () =>{

    const params = useParams();
    const current = params.id;
    const [group, setGroup] = useState();

    // const apiUrl = `https://localhost:44344/api/groups/${current}`;
    const apiUrl = `http://localhost:8080/api/groups/${current}`;

    useEffect(() => {
        const getGroup = async() => {
            await axios.get(apiUrl).then((resp) => {
                console.log(resp.data);
                setGroup(resp.data);
            }).catch((error) => {
                console.log(error)
            }
            ); 
        }
        getGroup();
      }, [apiUrl,setGroup]); 

      const classnames = {
        detail: 'detail',
        img: 'detail_img',
        title: 'detail_title',
        style: 'detail_style',
        description:'detail_description',
        contact: 'address_contact',
        contactImg: 'address_img',
        address: 'address',
        addressTitle: 'address_title',
        phone: 'address_phone',
        email: 'address_email'

      }
    //   urlSrc + 

    return(
        <div className = {classnames.detail}>
            {group === undefined ? (<span>Loading...</span>) :
                <>
                    <Image src = {group.img} alt = {group.nameGroup} width = {780} height = {450} className = {classnames.img} />
                    <h1 className = {classnames.title}>{group.nameGroup}</h1>
                    {group.category ?
                    <h2 className = {classnames.style}>{"Стиль: " + group.category}</h2> :
                    <h2 className = {classnames.style}>Стиль: -</h2>
                    }
                    <div>
                        <div className={classnames.address}>
                            <p className={classnames.addressTitle}>Контакты</p>
                            <Contact classnames={classnames} contact = { group.cityGroup.city + ', ' + group.addressGroup} src = './icons/home.svg' alt = 'Адрес: ' width=  {25} height ={22} />
                            {!group.director.phoneUser ? ' ' :
                                <Contact classnames={classnames} contact = {group.director.phoneUser} src = './icons/phone.svg' alt = 'Тел: '  width=  {25} height ={22} />
                            }
                            <Contact classnames={classnames} contact = {group.director.mailUser} src = './icons/mail.svg' alt = 'Email: '  width=  {25} height ={20}/>
                        </div>
                        <p className={classnames.description}>{group.descriptionGroup}</p>
                    </div>
                </>
            }
        </div>
    )
}