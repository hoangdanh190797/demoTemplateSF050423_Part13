import userAPI from 'services/userAPI'
import { createSlice, createAsyncThunk, PayloadAction, createAction } from '@reduxjs/toolkit'

const initialState = {
    isGetProfileUser: false,
    profileUser: {},
    newProfileUser: {},
    isPosAvatarFulfulled: false,
    // --- --- ---
    isGetListUserManagement: false,
    listUserManagement: [],
    // --- --- ---
    isGetListUserManagementTotal: false,
    listUserManagementTotal: [],
    // --- --- ---
    isPutUserEditManagement: false,
    userEditManagement: {},
    // --- --- ---
    isGetUserSearchManagement: false,
    listUserSearchManagement: []
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
export const putUserEditForManagement = createAsyncThunk('user/putUserEditForManagement', async (userEditManagement: any) => {
    const response = await userAPI.putUserEditForManagement(userEditManagement)
    return response.data.content;
})
export const getListUserManagement = createAsyncThunk('user/getListUserManagement', async (obj: any) => {
    const response = await userAPI.getListUserManagement(obj)
    return response.data.content;
})
export const getListUserManagementTotal = createAsyncThunk('user/getListUserManagementTotal', async (obj: any) => {
    const response = await userAPI.getListUserManagement(obj)
    return response.data.content;
})
export const deleteUserManagement = createAsyncThunk('user/deleteUserManagement', async (idUserDelete: any) => {
    const response = await userAPI.deleteUserManagement(idUserDelete)
    return response.data.content;
})
export const getUserSearchManagement = createAsyncThunk('user/getUserSearchManagement', async (nameUser: any) => {
    const response = await userAPI.getUserSearchManagement(nameUser)
    return response.data.content;
})

const UserSlices = createSlice({
    name: "user",
    initialState,
    reducers: {
        getInfoUserAfterUpAvt: (state) => {
            state.newProfileUser = state.profileUser
        },
        checkPostAvt: (state) => {
            state.isPosAvatarFulfulled = false
        }
    },
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
                state.isPosAvatarFulfulled = true;
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
            //--- --- --- getListUserManagementTotal
            .addCase(getListUserManagementTotal.pending, (state) => { })
            .addCase(getListUserManagementTotal.fulfilled, (state, action) => {
                state.isGetListUserManagementTotal = true;
                state.listUserManagementTotal = action.payload
            })
            .addCase(getListUserManagementTotal.rejected, (state, action) => { })
            //--- --- ---
            .addCase(putUserEditForManagement.pending, (state) => { })
            .addCase(putUserEditForManagement.fulfilled, (state, action) => {
                state.isPutUserEditManagement = true;
                state.userEditManagement = action.payload
            })
            .addCase(putUserEditForManagement.rejected, (state, action) => { })
            //--- --- ---
            .addCase(deleteUserManagement.pending, (state) => { })
            .addCase(deleteUserManagement.fulfilled, (state, action) => { })
            .addCase(deleteUserManagement.rejected, (state) => { })
            //--- --- ---
            .addCase(getUserSearchManagement.pending, (state) => { })
            .addCase(getUserSearchManagement.fulfilled, (state, aciton) => {
                state.isGetUserSearchManagement = true;
                state.listUserSearchManagement = aciton.payload
            })
            .addCase(getUserSearchManagement.rejected, (state) => { })
    },
});

export const { getInfoUserAfterUpAvt, checkPostAvt } = UserSlices.actions

export default UserSlices.reducer