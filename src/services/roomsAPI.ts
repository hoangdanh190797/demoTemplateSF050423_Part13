import axios from 'axios'
import { baseAPI } from './baseAPI';

const roomsAPI = {
    getRooms: () => {
        return baseAPI.get('/phong-thue');
    },
    getRoomsByLocation:(getLocation:any) => {
        return baseAPI.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${getLocation}`);
    },
    getRoomByIdForDetail:(id: any) => {
        return baseAPI.get(`/phong-thue/${id}`)
    },
    postRoomBooking:(infoBooking: any) => {
        return baseAPI.post('/dat-phong', infoBooking)
    },
    getListRoomManagement: (obj:{ pageIndex: any, pageSize: any}) =>{
        return baseAPI.get(`/phong-thue/phan-trang-tim-kiem?pageIndex=${obj.pageIndex}&pageSize=${obj.pageSize}`)
    }
}
export default roomsAPI;