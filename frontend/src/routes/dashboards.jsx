import { Appbar } from "../Components/Appbar"
import { Balance } from "../Components/Balance"
import UsersList from "../Components/Userslist"


export const Dashboard = () => {
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={"10,000"} />
            
            <UsersList/>
        </div>
    </div>
}