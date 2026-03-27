import { UserInfoType } from "@/app/signin/page";
import { api } from "@/lib/axios";

export function signin(data: UserInfoType){ //signin
    return api.post('signin', data)
}

export function signup(data: UserInfoType){//signup
    return api.post('signup', data)
}