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
    putUserEditForManagement: (userEdit: any) => {
        let idUserEdit = localStorage.getItem('idUserEdit') ;
        console.log(idUserEdit);
        return baseAPI.put(`/users/${idUserEdit}`, userEdit)
    },
    getListUserManagement: (obj:{pageIndex:any, pageSize:any}) => {
        return baseAPI.get(`/users/phan-trang-tim-kiem?pageIndex=${obj.pageIndex}&pageSize=${obj.pageSize}`)
    },
    deleteUserManagement: (idUserDelete: any) => {
        return baseAPI.delete(`/users?id=${idUserDelete}`)
    },
    getUserSearchManagement:(nameUser: any) => {
        return baseAPI.get(`/users/search/${nameUser}`)
    }
}



export default userAPI;