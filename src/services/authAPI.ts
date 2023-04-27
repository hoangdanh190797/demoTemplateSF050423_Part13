import axios from 'axios';
import baseAPI from './baseAPI';

const authAPI = {
    postUserSignin: (userCurrent: any) => {
        return baseAPI.post('auth/signin', userCurrent)
    },
    postUserSignup: (userCurrent: any) => {
        return baseAPI.post('auth/signup', userCurrent)
    }
}

export default authAPI;