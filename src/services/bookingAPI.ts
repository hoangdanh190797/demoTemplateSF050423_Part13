import { baseAPI } from "./baseAPI";

const bookingAPI = {
    getListBookingManagement: () => {
        return baseAPI.get('/dat-phong')
    },
    getByIDBookingManagement: (idBooking: any) => {
        return baseAPI.get(`/dat-phong/${idBooking}`)
    }

}

export default bookingAPI;