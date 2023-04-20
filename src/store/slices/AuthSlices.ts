import { createSlice, createAsyncThunk, PayloadAction, createAction } from '@reduxjs/toolkit'
import authAPI from 'services/authAPI';
import axios, { AxiosError } from 'axios';

declare interface initialState {
    isSignIn: boolean
    //
    isStatusSignin: boolean,
    userCurrent: any,
    roleUser: string,
    //
    isSignInpRejected?: boolean,
    isStatusSignup: boolean,
    //use userCurrent agin
    //
    isError: boolean,
    error: any,
    //
    isSignupRejected?:boolean
}

const initialState: initialState = {
    isSignIn: false,
    //
    isStatusSignin: false,
    userCurrent: {},
    roleUser: '',
    //
    isSignInpRejected: undefined,
    isStatusSignup: false,
    //
    isError: false,
    error: {},
    //
    isSignupRejected: undefined,
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

export const postUserSignup = createAsyncThunk('auth/postUserSignup', async (user: any) => {
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
        checkSignUpRejected: (state) => {
            state.isSignupRejected = false
        },
        checkSignUpFulfilled: (state) => {
            state.isStatusSignup = false
        },
        checkSignInRejected: (state) => {
            state.isSignInpRejected = false
        }
    },
    extraReducers(builder) {
        builder
            .addCase(postUserSignin.pending, (state) => {
                state.isSignIn = true;
            })

            .addCase(postUserSignin.fulfilled, (state, action) => {
                state.isStatusSignin = true;
                state.userCurrent = action.payload;
                state.isSignInpRejected = true;

            })
            .addCase(postUserSignin.rejected, (state, action) => {
                state.isStatusSignin = false;
                state.isError = true;
                state.error = action.payload;
                state.isSignInpRejected = true;
            })
            //
            .addCase(postUserSignup.pending, (state) => { })
            .addCase(postUserSignup.fulfilled, (state, action) => {
                state.isStatusSignup = true;
                state.userCurrent = action.payload;
            })
            .addCase(postUserSignup.rejected, (state, action) => { 
                state.isSignupRejected = true;
            })
    },
});

export const { signOut, checkSignInRejected, checkSignUpRejected, checkSignUpFulfilled } = AuthSlices.actions

export default AuthSlices.reducer