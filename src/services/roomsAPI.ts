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
        return baseAPI.post('https://airbnbnew.cybersoft.edu.vn/api/dat-phong', infoBooking)
    }
}
export default roomsAPI;