import { baseAPI } from "./baseAPI";

const bookingAPI = {
    getListBookingManagement: () => {
        return baseAPI.get('/dat-phong')
    },
    getByIDBookingManagement: (idBooking: any) => {
        return baseAPI.get(`/dat-phong/${idBooking}`)
    },
    putEditBookingManagement: (infoBookingEdit: any) => {
        let idRoomEdit = localStorage.getItem('idRoomEdit')
        return baseAPI.put(`/dat-phong/${idRoomEdit}`, infoBookingEdit)
    },
    deleteBookingManagement: (idBookingDelete:any) => {
        return baseAPI.delete(`/dat-phong/${idBookingDelete}`)
    }

}

export default bookingAPI;