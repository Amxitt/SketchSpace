import { HTTP_BACKEND } from "@/app/config";
import axios from "axios";

export const api =  axios.create({
    baseURL: HTTP_BACKEND});

        api.interceptors.request.use((config) => {
            let token = null;

            if(typeof window !== "undefined"){
             token = localStorage.getItem("token");
            }


    if (token) {
        config.headers.Authorization = token;
    }

    return config;
});
