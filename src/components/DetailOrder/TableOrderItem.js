import React from "react"
import { tableItems } from "../../Constant"
import { getDate } from "../helpers/getDate"


export const TableOrderItem = ({orderItems}) =>{

    const classnames = {
        table: 'table',
        tableButton: 'table-button',
        addButton: 'table-button_add',
        status: 'status',
        lastTr: 'tr-last'
    }

    const getTotalCost  = () =>{
        let cost = 0 ;
        orderItems.forEach(item => {
            if(item.attributes){
                cost += item.count * item.attributes.cost
            }else if(item.services){
                cost += item.count * item.services.cost
            }
        });
        return cost;
    }

    return(
        <table className = {classnames.table}>
        <tbody>
            <tr>
                {tableItems.map((item,index) =>
                <th key = {index}>{item}</th>
                )}
            </tr>
          {orderItems.map((item) => 
            <tr key = {item.idOrderItem}>
                {item.attributes && 
                    <>
                        <td>{item.attributes.title}</td>
                        <td>{item.size.size}</td>
                        <td>{item.attributes.cost}</td>
                        <td>{item.count}</td>
                        <td>{item.count * item.attributes.cost}</td>
                    </>
                }
                {item.services && 
                    <>
                        <td>{item.services.title}</td>
                        <td>{getDate(item.date.date).date + " " + getDate(item.date.date).time}</td>
                        <td>{item.services.cost}</td>
                        <td>{item.count}</td>
                        <td>{item.count * item.services.cost}</td>
                    </>
                }
            </tr>
          )}
          <tr className={classnames.lastTr}>
            <td colSpan={tableItems.length}>
                Итого: {getTotalCost()}
            </td>
         </tr>
        </tbody>
        </table> 
    )
}