import { useState } from "react"
import BottomWarning from "../Components/Bottomwarning"
import Buttons from "../Components/Buttons"
import Headers from "../Components/headers"
import InputBox from "../Components/Inputbox"
import SubHeaders from "../Components/Subheading"
import axios from "axios"


export const  Signup = ()=>{
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [UserName, setUsername] = useState("")
    const [Password, setPassword] = useState("")
    return <div className="bg-slate-300  h-screen flex justify-center">
      <div className="flex flex-col justify center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Headers label ={"Sign up"}/>
            <SubHeaders label={"Enter your information to create an account"}/>
            <InputBox onChange = {e=>{
                setFirstName(e.target.value)
            }}label={"First name"} placeholder={"John"}/>

            <InputBox   onChange = {e=>{
                setLastName(e.target.value)
            }} label={"Last name"} placeholder={"DON"}/>

            <InputBox  onChange = {e=>{
                setUsername(e.target.value)
            }} label={"Email"} placeholder={"john12@gmail.com"}/>

            <InputBox onChange = {e=>{
                setPassword(e.target.value)
            }} label={"Password "} placeholder={"12456"}/>

            <div className="pt-4">
                <Buttons onClick = {async()=>{
                     const response  =  await axios.post("http://localhost:3000/api/v1/user/signup",{
                        UserName,
                        Password,
                        FirstName,
                        LastName
                        
                    })
                    localStorage.setItem("token",response.data.token)
                }}  label={"Sign Up"} />
            </div>

            <BottomWarning label={"Already have an account?"}  buttonText ={"Sign in"}  to ={"/signin"}/>
        </div>
      </div>
    </div>
}