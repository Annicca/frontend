import {Categories} from "../categories/categories";
import {servicesCategory} from "../../Constant";
import React, {useEffect, useState} from "react";
import { ListProduct } from "../listProduct/ListProduct";
import axios from "axios";
import Pagination from "react-js-pagination";
import { handlePageChange } from "../helpers/handlePageChange";


export const ServicesPage = () =>{

    const [services, setServices] = useState();
    const [category, setCategory] = useState('MAKEUP');
    const [page, setPage] = useState({
        activePage:0,
        totalPages: null,
        itemsCountPerPage:null,
        totalItemsCount:null
    })

    const url = `http://localhost:8080/api/services/category?category=${category}`;

    const fetchService = async (pageNumber) => {
        await axios.get(url+`&page=${pageNumber}`)
        .then((resp) => {
         console.log(resp.data);
         setServices(resp.data.content);
         setPage({
          activePage: resp.data.number,
          totalPages: resp.data.totalPages,
          totalItemsCount: resp.data.totalElements,
          itemsCountPerPage: resp.data.size
         })
         
        })
        .catch((error) => {
            console.log(error);
            alert("Что-то пошло не так(")
        });
    };

    useEffect(()=>{

        fetchService(0);
    }, [category])

    const classnames = {
        productList: 'main-container-list',
    }

    return(
        <>
            <Categories listCategories={servicesCategory} setCategory={setCategory}/>
            <ListProduct products={services} classnames={classnames} link={"/services/"} />
            {page.totalPages >=2 && <div className="main-container">
                <Pagination
                hideNavigation
                activePage={page.activePage+1}
                itemsCountPerPage={page.itemsCountPerPage}
                totalItemsCount={page.totalItemsCount}
                pageRangeDisplayed={10}
                innerClass = 'pager-list'
                onChange={(e)=>handlePageChange(e, setPage, fetchService)}
                />
            </div>}
        </>
    )
}