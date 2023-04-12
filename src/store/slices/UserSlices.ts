import { createSlice, createAsyncThunk, PayloadAction, createAction } from '@reduxjs/toolkit'
import userAPI from 'services/userAPI'

const initialState = {
    isGetProfileUser: false,
    profileUser: {},
    // --- --- ---
    isGetListUserManagement: false,
    listUserManagement: []
}

export const getUserByIdForProfile = createAsyncThunk('user/getUserByIdForProfile', async (idUser: any) => {
    const response = await userAPI.getUserByIdForProfile(idUser)
    return response.data.content;
})
export const putUserEditForProfile = createAsyncThunk('user/putUserEditForProfile', async (userNew: any) => {
    const response = await userAPI.putUserEditForProfile(userNew)
    return response.data.content;
})
export const postAvatarUserEditProfile = createAsyncThunk('user/postAvatarUserEditProfile', async (imgUser: any) => {
    const response = await userAPI.postAvatarUserEditProfile(imgUser)
    return response.data.content;
})
export const getListUserManagement = createAsyncThunk('user/getListUserManagement', async (obj:any) => {
    const response = await userAPI.getListUserManagement(obj)
    return response.data.content;
})

const UserSlices = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getUserByIdForProfile.pending, (state) => { })
            .addCase(getUserByIdForProfile.fulfilled, (state, action) => {
                state.isGetProfileUser = true;
                state.profileUser = action.payload
            })
            .addCase(getUserByIdForProfile.rejected, (state, aciton) => { })
            //--- --- ---
            .addCase(putUserEditForProfile.pending, (state) => { })
            .addCase(putUserEditForProfile.fulfilled, (state, action) => {
                state.profileUser = action.payload
            })
            .addCase(putUserEditForProfile.rejected, (state, action) => { })
            //--- --- ---
            .addCase(postAvatarUserEditProfile.pending, (state) => { })
            .addCase(postAvatarUserEditProfile.fulfilled, (state, action) => {
                state.profileUser = action.payload
            })
            .addCase(postAvatarUserEditProfile.rejected, (state, action) => { })
            //--- --- ---
            .addCase(getListUserManagement.pending, (state) => { })
            .addCase(getListUserManagement.fulfilled, (state, action) => {
                state.isGetListUserManagement = true;
                state.listUserManagement = action.payload
            })
            .addCase(getListUserManagement.rejected, (state, action) => { })
    },
});

export const { } = UserSlices.actions

export default UserSlices.reducer