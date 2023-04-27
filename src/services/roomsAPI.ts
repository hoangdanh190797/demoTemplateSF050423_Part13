import axios from 'axios'
import baseAPI from './baseAPI';

const roomsAPI = {
    getRooms: () => {
        return baseAPI.get('/phong-thue');
    },
    getRoomsByLocation: (getLocation: any) => {
        return baseAPI.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${getLocation}`);
    },
    getRoomByIdForDetail: (id: any) => {
        return baseAPI.get(`/phong-thue/${id}`)
    },
    postRoomBooking: (infoBooking: any) => {
        return baseAPI.post('/dat-phong', infoBooking)
    },
    getListRoomManagement: (obj: { pageIndex: any, pageSize: any }) => {
        return baseAPI.get(`/phong-thue/phan-trang-tim-kiem?pageIndex=${obj.pageIndex}&pageSize=${obj.pageSize}`)
    },
    putRoomEditManagement: (infoRoomEdit: any) => {
        let idRoomEdit = localStorage.getItem('idRoomEdit')
        let tokenUser = localStorage.getItem('accessToken')
        //, { headers: { token: tokenUser } }
        return baseAPI.put(`/phong-thue/${idRoomEdit}`, infoRoomEdit)
    },
    postNewRoomManagement: (infoRoomNew: any) => {
        let tokenUser = localStorage.getItem('accessToken')
        //, { headers: { token: tokenUser } }
        return baseAPI.post('/phong-thue', infoRoomNew)
    },
    deleteRoomManagement: (idRoomDelete: any) => {
        let tokenUser = localStorage.getItem('accessToken')
        //, { headers: { token: tokenUser } }
        return baseAPI.delete(`/phong-thue/${idRoomDelete}`)
    },
    postImageRoomManagement: (imageRoom: any) => {
        let tokenUser = localStorage.getItem('accessToken')
        let idRoomEdit = localStorage.getItem('idRoomEdit')
        //, { headers: { token: tokenUser } }
        return baseAPI.post(`/phong-thue/upload-hinh-phong?maPhong=${idRoomEdit}`, imageRoom)
    }
}
export default roomsAPI;