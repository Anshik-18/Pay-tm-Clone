import axios from "axios"
import { useEffect, useState } from "react"


export const Balance = ({ value }) => {
   const[balance,setbalance] = useState(0)
   useEffect(()=>{
       const response = axios.get("http://localhost:3000/api/v1/account/get",{
           headers: {
               Authorization: "Bearer " + localStorage.getItem("token")
           }
       }).then(response=>{
            setbalance(response.data.balance )
   
       })
   },[])
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
}