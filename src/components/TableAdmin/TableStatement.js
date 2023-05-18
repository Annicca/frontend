import React, {useEffect, useState} from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import classNames from "classnames";
import { tablestatement, tableUsersImg, adminRole, accept, reject, statusAccept, statusReject } from "../../Constant";
import { useNavigate } from "react-router-dom";
import { Image } from "../img/Image";
import { changeStatus } from "../helpers/changeStatus";
import axios from "axios";
import { getRequestConfig } from "../helpers/getRequestConfig";
import { choosetypeStatement } from "../helpers/chooseTypestatement";
import { handleValue } from "../helpers/handleValue";
import Pagination from "react-js-pagination";
import { handlePageChange } from "../helpers/handlePageChange";

import './Table.scss';

export const TableStatement = () =>{
    const store = require('store');
    const user = store.get('user');

    const [statements, setStatements] = useState([]);
    const [statusChange, setStatusChange] = useState(null);
    const [numberSearch, setNumberSearch] = useState('');
    const [page, setPage] = useState({
      activePage:0,
      totalPages: null,
      itemsCountPerPage:null,
      totalItemsCount:null
  })
  
    const urlSearch = `http://localhost:8080/api/statements/search/${numberSearch}`;
    const url = "http://localhost:8080/api/statements";

    let navigate = useNavigate();

    const redirected = (id) =>{ 
        let path = `/statements/${id}`; 
        navigate(path);
      }

    const getStatements = async (pageNumber) => {
      let urlData = handleValue(numberSearch, url, urlSearch);
      const resp = await axios.get(urlData+`?page=${pageNumber}`, getRequestConfig());
      console.log(resp.data);
      setStatements(resp.data.content);
      setPage({
        activePage: resp.data.number,
        totalPages: resp.data.totalPages,
        totalItemsCount: resp.data.totalElements,
        itemsCountPerPage: resp.data.size
       })
    };
    
    useEffect(() => {
      if(user?.role != adminRole || !user){
        navigate(`/notfound`)
      }
      getStatements(0);
  
    }, [numberSearch, statusChange]);

    const classnames = {
        table: 'table',
        statement: 'table_statement',
        tableButton: 'table-button',
        addButton: 'table-button_add',
        status: 'status',
        message: 'table-message',
    }

    return(
        <>
          <SearchForm searchText = {'Введите номер заявки'} setValue = {setNumberSearch} />
          {page.totalPages > 2 && <div className={classnames.container}>
            <Pagination
            hideNavigation
            activePage={page.activePage+1}
            itemsCountPerPage={page.itemsCountPerPage}
            totalItemsCount={page.totalItemsCount}
            pageRangeDisplayed={10}
            innerClass = 'pager-list'
            onChange={(e)=>handlePageChange(e, setPage, getStatements)}
            />
          </div>}
          {statements === undefined ? (<p>Loading...</p>) : statements.length === 0 ? <p className = {classnames.message}>Заявки не найдены</p> :
          <table className = {classNames(classnames.table, classnames.statement)}>
          <tbody>
              <tr>
                {tablestatement.map((item,index) =>
                  <th key = {index}>{item}</th>
                )}
              </tr>
              { statements.map((statement,index) => 
                <tr key = {index}>
                  <td>{statement.idStatement}</td>
                  <td>{statement.user.surnameUser +" " + statement.user.nameUser +" " + statement.user.patronimycUser}</td>
                  <td>{choosetypeStatement(statement.type)}</td>
                  <td>{statement.name}</td>
                  <td>{statement.city.city}</td>
                  <td>
                    <button className = {classnames.tableButton} onClick={() => redirected(statement.idStatement)}>
                      <Image 
                        src = {tableUsersImg[0].src}
                        alt = {tableUsersImg[0].alt}/>
                    </button>
                  </td>
                  {statement.statusStatement != null ?
                  <td>
                    <button className = {classnames.tableButton}>
                    {statement.statusStatement == statusAccept ?
                      <span className= {classnames.status}>Принято</span> :
                      <span className= {classnames.status}>-</span> }
                    </button>
                  </td> :
                  <td>
                    <button className = {classnames.tableButton} onClick={() => changeStatus(statement.idStatement, accept, setStatusChange)}>
                      <span className= {classnames.status}><Image src = './icons/accept.svg' alt = 'Принять' width = {30} height = {30} /></span>
                    </button>
                  </td> 
                  }
                  {statement.statusStatement != null ?
                  <td>
                    <button className = {classnames.tableButton}>
                      {statement.statusStatement == statusReject ?
                      <span className= {classnames.status}>Отклонено</span> :
                      <span className= {classnames.status}>-</span>
                      }
                    </button>
                  </td> :
                  <td>
                    <button className = {classnames.tableButton} onClick={() => {changeStatus(statement.idStatement, reject, setStatusChange)}}>
                      <span className= {classnames.status}><Image src = './icons/del.svg' alt = 'Отклонить' width = {30} height = {30} /></span>
                    </button>
                  </td> 
                  }
                </tr>
              )}
            </tbody>
          </table> }
        </>
    )
}