import BottomWarning from "../Components/Bottomwarning"
import Buttons from "../Components/Buttons"
import Headers from "../Components/headers"
import InputBox from "../Components/Inputbox"
import SubHeaders from "../Components/Subheading"


export const   Signin = ()=>{
     return <div className="bg-slate-300  h-screen flex justify-center">
          <div className="flex flex-col justify center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Headers label ={"Sign in"}/>
                <SubHeaders label={"Enter your information to login to your account"}/>
                <InputBox label={"Email"} placeholder={"john12@gmail.com"}/>
                <InputBox label={"Password "} placeholder={"12456"}/>
                
                <div className="pt-4">
                    <Buttons label={"Sign in"} />
                </div>
                <BottomWarning label={"Don't have  an account?"}  buttonText ={"Sign up"}  to ={"/signup"}/>
            </div>
          </div>
        </div>

}