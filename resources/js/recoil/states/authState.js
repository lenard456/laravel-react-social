import { Cache } from "@/js/utils";
import { atom } from "recoil";

const authState = atom({
    key: 'v2.auth',
    default: {
        currentUserId: null,
        isAuthenticated: Cache.get('isAuthenticated', false)
    }
})

export default authState