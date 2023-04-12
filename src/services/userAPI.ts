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
    },
    getListUserManagement: (obj:{pageIndex:any, pageSize:any}) => {
        return baseAPI.get(`/users/phan-trang-tim-kiem?pageIndex=${obj.pageIndex}&pageSize=${obj.pageSize}`)
    }
}



export default userAPI;