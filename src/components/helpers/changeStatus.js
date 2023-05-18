import axios from "axios";
import { getRequestConfig } from "./getRequestConfig";
import { accept, reject } from "../../Constant";

export const changeStatus = async(idStatement, status, setStatement) =>{

    let message;
    if(status === accept){
      message = "Вы действительно хотите принять заявку?"
    } else if(status === reject){
      message  = "Вы действительно хотите отклонить заявку?"
    }
    if(window.confirm(message)){
        await axios.put(`http://localhost:8080/api/statements/${status}/${idStatement}`, {}, getRequestConfig())
        .then((result) => {
          console.log(result.data);
          setStatement(result.data);
          alert("Успешно");
        })
        .catch((error) =>{ 
          console.log(error);
          if(error.response.data){
            alert(error.response.data.message)
         }else{
            alert("Ошибка при изменении статуса заявки. Возможно данные заявки некорректны");
          }
            
        })
    };

}