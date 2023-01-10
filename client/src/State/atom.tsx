
import { CreateNewAutheticator, CreateNewCatsStatus, CreateNewClient, CreateNewUserList } from "Components/Utils/Functions";
import {atom} from "recoil"

export const UserState = atom({
    key:"UserState",
    default: CreateNewAutheticator()
})
export const UsersListState = atom({
    key:"UsersListState",
    default: CreateNewUserList()
})

export const CatsStatus = atom({
    key:"CatsStatus",
    default: [CreateNewCatsStatus()]
})

export const ClientsState = atom({
    key:"ClientsState",
    default: {data:[CreateNewClient()],total:0}
})

export const AlertState = atom({
    key:"AlertState",
    default: false
})
export const AlertMessage = atom({
    key:"AlertMessage",
    default: {title:"",body:"",type:""},

})

