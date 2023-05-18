import {Categories} from "../categories/categories";
import React, { useEffect, useState } from "react";
import {atributsCategory} from "../../Constant";
import { ListProduct } from "../listProduct/ListProduct";
import axios from "axios";
import { handlePageChange } from "../helpers/handlePageChange";
import Pagination from "react-js-pagination";

export const AtributsPage = () =>{

    const [atributs,setAtributs] = useState();
    const [category, setCategory] = useState('ACCESSORIES');
    const [page, setPage] = useState({
        activePage:0,
        totalPages: null,
        itemsCountPerPage:null,
        totalItemsCount:null
    })

    let url = `http://localhost:8080/api/attributes/category?category=${category}`;

    const fetchAtribut = async (pageNumber) => {
        await axios.get(url+`&page=${pageNumber}`)
        .then((resp) => {
         console.log(resp.data);
         setAtributs(resp.data.content);
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
    }

    useEffect(()=>{
        fetchAtribut(0);
    }, [category])

    const classnames = {
        productList: 'main-container-list',
    }

    return(
        <>
            <Categories listCategories={atributsCategory} setCategory={setCategory}/>
            <ListProduct products={atributs} classnames={classnames} link={"/attributes/"}/>
            {page.totalPages >=2 && <div className="main-container">
                <Pagination
                hideNavigation
                activePage={page.activePage+1}
                itemsCountPerPage={page.itemsCountPerPage}
                totalItemsCount={page.totalItemsCount}
                pageRangeDisplayed={10}
                innerClass = 'pager-list'
                onChange={(e)=>handlePageChange(e, setPage, fetchAtribut)}
                />
            </div>}

        </>
    )
}