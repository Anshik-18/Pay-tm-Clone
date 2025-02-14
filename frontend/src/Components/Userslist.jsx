import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "./Buttons";

export default function UsersList(){
    const [users,SetUsers] = useState([])
    const [filter, Setfilter] = useState("")
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
        .then(response =>{
            SetUsers(response.data.user)
        })

    },[filter])

    return <div>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>

        <div className="my-2">
            <input onChange={(e)=>{
                Setfilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"/>

        </div>

        <div>
            {users.map(user=> <User user={user}/>)}
        </div>
    </div>

    function User({user}){
        const navigate = useNavigate();

        return <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.FirstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-ful">
                    <div>
                        {user.FirstName} {user.LastName}
                    </div>
                </div>
            </div>
    
            <div className="flex flex-col justify-center h-full">
                <Buttons onClick={(e)=>{
                    navigate("/send?id="+ user._id +"&name="+ user.FirstName)

                }} label={"Send Money"} />
            </div>
        </div>
    }
}