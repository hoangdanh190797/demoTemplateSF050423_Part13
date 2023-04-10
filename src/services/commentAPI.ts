import axios from "axios";
import { baseAPI } from "./baseAPI";

const commentsAPI = {
    getCommentsByIDRoom: (idRoom: any) => {
        return baseAPI.get(`/binh-luan/lay-binh-luan-theo-phong/${idRoom}`)
    },
    postCommentsByIDRoom: (contentComment: any) => {
        let tokenUser = localStorage.getItem('accessToken');
        return baseAPI.post('/binh-luan', contentComment, {headers:{token:`${tokenUser}`}})
    }
}

export default commentsAPI;