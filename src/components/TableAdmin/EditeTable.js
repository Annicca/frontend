import React, {useEffect, useState} from 'react';
import './Table.scss'
import { Image } from '../img/Image';
import axios from 'axios';
import { getRequestConfig } from '../helpers/getRequestConfig';

export const EditeTable = ({columns, rows, actions, delet, onDelete}) =>{

    const [isEditMode, setIsEditMode] = useState(false);
    const [rowIDToEdit, setRowIDToEdit] = useState(undefined);
    const [rowsState, setRowsState] = useState(rows);
    const [editedRow, setEditedRow] = useState();

    useEffect(()=>{
      setRowsState(rows)
    }, [rows])

    const handleEdit = (rowID) => {
      setIsEditMode(true);
      setEditedRow(undefined);
      setRowIDToEdit(rowID);
    }

    const handleRemoveRow = async(rowID, e) => {
        e.preventDefault()
        await axios.delete(`http://localhost:8080/api/size/${rowID}`, getRequestConfig())
        .then((resp)=>{
            console.log(resp.data);
            setRowsState(resp.data);
        })
        .catch((error)=>{
            console.log(error);
            if(error.response.data){
                alert(error.response.data.message)
            } else{
                alert("Что-то пошло не так(")
            }
        })
      
    }

    const handleOnChangeField = (e, rowID) => {
      const { name: fieldName, value } = e.target;
      
      setEditedRow({
        idSize: rowID,
        [fieldName]: value
      })
    }

    const handleCancelEditing = () => {
      setIsEditMode(false);
      setEditedRow(undefined);
    }
    const handleSaveRowChanges = async(size, e) => {
        setIsEditMode(false);
        e.preventDefault()
        size = {
            ...size,
            ...editedRow
        }
        await axios.put(`http://localhost:8080/api/size`, size, getRequestConfig())
        .then((resp)=>{
            console.log(resp.data);
            setRowsState(resp.data);
            setEditedRow(undefined)
        })
        .catch((error)=>{
            console.log(error);
            if(error.response.data){
                alert(error.response.data.message)
            } else{
                alert("Что-то пошло не так(")
            }
        })
    }

    return(
        <table className='table edit-table'>
        <tbody>
        <tr>
          {columns.map((column) => {
            return <th key={column.field}>{ column.fieldName }</th>
          })}
        </tr>
        {rowsState.map((row) => {
          return <tr key={row.idSize}>
            <td>
              { isEditMode && rowIDToEdit === row.idSize
                ? <input
                  type='text'
                  defaultValue={editedRow ? editedRow.size : row.size}
                  id={row.idSize}
                  name='size'
                  onChange={ (e) => handleOnChangeField(e, row.idSize) }
                />
                : row.size
              }
            </td>
            <td>
              { isEditMode && rowIDToEdit === row.idSize
                ? <input
                  type='number'
                  defaultValue={editedRow ? editedRow.lastName : row.amount}
                  id={row.idSize}
                  name='amount'
                  onChange={ (e) => handleOnChangeField(e, row.idSize) }
                />
                : row.amount
              }
            </td>

            {actions &&
            <td>
              { isEditMode && rowIDToEdit === row.idSize
                ? <button onClick={ (e) => handleSaveRowChanges(row, e) } disabled={!editedRow}>
                  <Image src={'../icons/ok.svg'} alt={"Сохранить"} width = {22} height = {22}/>
                </button>
                : <button onClick={ () => handleEdit(row.idSize) }>
                  <Image src={'../icons/edit.svg'} alt={"Изменить"} width = {25} height = {25}/>
                </button>
              }
              { isEditMode && rowIDToEdit === row.idSize
                ? 
                <button onClick={() => handleCancelEditing()}>
                    <Image src={'../icons/cancel.svg'} alt={"Отменить"} width = {27} height = {27}/>
                </button>
                : 
                <button onClick={(e) => handleRemoveRow(row.idSize, e)}>
                  <Image src={'../icons/trash.svg'} alt={"Удалить"} width = {22} height = {22}/>
                </button>
              }
            </td>
            }
            {delet && 
            <td>
                <button onClick={(e) => onDelete(row.idSize, e)}>
                  <Image src={'../icons/trash.svg'} alt={"Удалить"} width = {22} height = {22}/>
                </button>
            </td>
            }
          </tr>
        })}
        </tbody>
      </table>
    )
}