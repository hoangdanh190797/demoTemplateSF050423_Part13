import axios from "axios";
import { baseAPI } from "./baseAPI";



const userAPI = {
    getUserByIdForProfile: (idUser: any) => {
        return baseAPI.get(`/users/${idUser}`)
    },
    putUserEditForProfile: (user: any) => {
        let id = localStorage.getItem('idUser');
        return baseAPI.put(`/users/${id}`, user)
    }
}

export default userAPI;