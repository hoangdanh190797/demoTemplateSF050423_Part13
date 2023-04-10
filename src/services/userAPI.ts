import axios from "axios";
import { baseAPI } from "./baseAPI";



const userAPI = {
    getUserByIdForProfile: (idUser: any) => {
        return baseAPI.get(`/users/${idUser}`)
    },
    putUserEditForProfile: (user: any) => {
        let id = localStorage.getItem('idUser');
        return baseAPI.put(`/users/${id}`, user)
    },
    postAvatarUserEditProfile: (imgUser: any) => {
        let tokenUser = localStorage.getItem('accessToken');
        let headers = {}
        if(tokenUser){
            headers = {
                token: tokenUser,
            }
        }
        return baseAPI.post('/users/upload-avatar', imgUser, { headers })
    }
}



export default userAPI;