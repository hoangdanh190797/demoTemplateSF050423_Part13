import axios from "axios";
import { baseAPI } from "./baseAPI";

const locationAPI = {
    getLocation: () => {
        return baseAPI.get('/vi-tri')
    },
    getLocationByIDManagement: (idLocation: any) => {
        return baseAPI.get(`/vi-tri/${idLocation}`)
    },
    postLocationManagement: (infoLocation: any) => {
        let tokenUser = localStorage.getItem('accessToken')
        return baseAPI.post(`/vi-tri`, infoLocation, { headers: { token: tokenUser } })
    },
    getListLocationManagement: (obj: { pageIndex: any, pageSize: any }) => {
        return baseAPI.get(`/vi-tri/phan-trang-tim-kiem?pageIndex=${obj.pageIndex}&pageSize=${obj.pageSize}`)
    },
    putLocationByIDManagement: (locationEdit: any) => {
        let idLocationEdit = localStorage.getItem('idLocationEdit');
        let tokenUser = localStorage.getItem('accessToken');
        return baseAPI.put(`vi-tri/${idLocationEdit}`, locationEdit, { headers: { token: tokenUser } })
    },
    deleteLocationManagement: (idLocationDelete: any) => {
        let tokenUser = localStorage.getItem('accessToken');
        return baseAPI.delete(`/vi-tri/${idLocationDelete}`, { headers: { token: tokenUser } })
    },
    postImageForLocation: (imageLocation: any) => {
        let tokenUser = localStorage.getItem('accessToken');
        let idLocationEdit = localStorage.getItem('idLocationEdit');
        return baseAPI.post(`/vi-tri/upload-hinh-vitri?maViTri=${idLocationEdit}`,imageLocation, { headers: { token: tokenUser } })
    }
}

export default locationAPI;