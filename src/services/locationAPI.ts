import axios from "axios";
import { baseAPI } from "./baseAPI";

const locationAPI = {
    getLocation: () => {
        return baseAPI.get('/vi-tri')
    }
}

export default locationAPI;