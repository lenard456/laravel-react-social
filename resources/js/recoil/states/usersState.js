import { atom } from "recoil";

const usersState = atom({
    key: 'v2.users',
    default: {}
})

export default usersState