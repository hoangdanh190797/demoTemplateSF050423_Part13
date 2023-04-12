import { createSlice, createAsyncThunk, PayloadAction, createAction } from '@reduxjs/toolkit'
import authAPI from 'services/authAPI';
import axios, { AxiosError } from 'axios';

declare interface initialState {
    //
    isStatusSignin: boolean,
    userCurrent: any,
    roleUser: string,
    //
    isStatusSignup: boolean,
    //use userCurrent agin
    //
    isError: boolean,
    error: any
}

const initialState: initialState = {
    isStatusSignin: false,
    userCurrent: {},
    roleUser: '',
    //
    isStatusSignup: false,
    //
    isError: false,
    error: {},
}

export const postUserSignin = createAsyncThunk('auth/postSignin', async (user: any, thunkAPI) => {
    try {
        const response = await authAPI.postUserSignin(user);
        return response.data.content
    } catch (error: any) {
        const errorObject = {
            message: 'Request failed',
            status: error.response?.status || null,
            data: error.response?.data || null,
        };
        return thunkAPI.rejectWithValue(errorObject);
    }
});

export const postUserSignup = createAsyncThunk('auth/postUserSignup', async(user: any) => {
    const response = await authAPI.postUserSignup(user);
    return response.data.content
})

const AuthSlices = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signOut: (state) => {
            localStorage.removeItem("accessToken");
            state.isStatusSignin = false;
            state.userCurrent = {};
        },
    },
    extraReducers(builder) {
        builder
            .addCase(postUserSignin.pending, (state) => { })
            .addCase(postUserSignin.fulfilled, (state, action) => {
                state.isStatusSignin = true;
                state.userCurrent = action.payload;
            })
            .addCase(postUserSignin.rejected, (state, action) => {
                state.isStatusSignin = false;
                state.isError = true;
                state.error = action.payload
            })
            //
            .addCase(postUserSignup.pending, (state) => {})
            .addCase(postUserSignup.fulfilled, (state, action) => {
                state.isStatusSignup = true;
                state.userCurrent = action.payload;
            })
            .addCase(postUserSignup.rejected, (state, action) => {})
    },
});

export const { signOut } = AuthSlices.actions

export default AuthSlices.reducer