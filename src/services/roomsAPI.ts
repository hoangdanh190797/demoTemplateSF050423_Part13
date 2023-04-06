import axios from 'axios'
import { baseAPI } from './baseAPI';

const roomsAPI = {
    getRooms: () => {
        return baseAPI.get('/phong-thue');
    },
    getRoomsByLocation:(getLocation:any) => {
        return baseAPI.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${getLocation}`);
    }
}

export default roomsAPI;