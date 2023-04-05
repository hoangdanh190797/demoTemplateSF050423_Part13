import axios from 'axios'
import { baseAPI } from './baseAPI';

const roomsAPI = {
    getRooms: () => {
        return baseAPI.get('/phong-thue');
    },
    getRoomsByPosition:(getPosition:any) => {
        return baseAPI.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${getPosition}`);
    }
}

export default roomsAPI;