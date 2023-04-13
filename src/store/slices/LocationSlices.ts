import { createSlice, createAsyncThunk, PayloadAction, createAction } from '@reduxjs/toolkit'
import locationAPI from '../../services/locationAPI';

const initialState = {
    isGetLocation: false,
    location: [],
    //--- --- ---
    isGetListLocationManagement: false,
    listLocationManagement: [],
    //--- --- ---
    isGetLocationByIDManagement: false,
    locationByIDManagement: {},
    //--- --- ---
    isPostLocationManagement: false,
    newLocation: {},
    //--- --- ---
    isPutLocationManagement: false,
    editLocation: {},
    //--- --- ---
    isPostImageLocationManagement: false,
    postImageLocation: {},
}

export const getLocation = createAsyncThunk('location/getLocation', async () => {
    const response = await locationAPI.getLocation();
    return response.data.content
})

export const getListLocationManagement = createAsyncThunk('location/getListLocationManagement', async (objPage: any) => {
    const response = await locationAPI.getListLocationManagement(objPage);
    return response.data.content
})

export const getLocationByIDManagement = createAsyncThunk('location/getLocationByIDManagement', async (idLocation: any) => {
    const response = await locationAPI.getLocationByIDManagement(idLocation);
    return response.data.content
})

export const postLocationManagement = createAsyncThunk('location/postLocationManagement', async (infoLocation: any) => {
    const response = await locationAPI.postLocationManagement(infoLocation);
    return response.data.content
})

export const putLocationByIDManagement = createAsyncThunk('location/putLocationByIDManagement', async (locationEdit: any) => {
    const response = await locationAPI.putLocationByIDManagement(locationEdit);
    return response.data.content
})

export const deleteLocationManagement = createAsyncThunk('location/deleteLocationManagement', async (idLocationDelete: any) => {
    const response = await locationAPI.deleteLocationManagement(idLocationDelete)
    return response.data.content
})

export const postImageForLocation = createAsyncThunk('location/postImageForLocation', async (imageLocation: any) => {
    const response = await locationAPI.postImageForLocation(imageLocation)
    return response.data.content
})

const LocationSlices = createSlice({
    name: "location",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getLocation.pending, (state) => { })
            .addCase(getLocation.fulfilled, (state, action) => {
                state.isGetLocation = true;
                state.location = action.payload;
            })
            .addCase(getLocation.rejected, (state, action) => { })
            // --- --- ---
            .addCase(getListLocationManagement.pending, (state) => { })
            .addCase(getListLocationManagement.fulfilled, (state, aciton) => {
                state.isGetListLocationManagement = true;
                state.listLocationManagement = aciton.payload;
            })
            .addCase(getListLocationManagement.rejected, (state, action) => { })
            // --- --- ---
            .addCase(getLocationByIDManagement.pending, (state) => { })
            .addCase(getLocationByIDManagement.fulfilled, (state, action) => {
                state.isGetLocationByIDManagement = true;
                state.locationByIDManagement = action.payload
            })
            .addCase(getLocationByIDManagement.rejected, (state, aciton) => { })
            // --- --- ---
            .addCase(postLocationManagement.pending, (state) => { })
            .addCase(postLocationManagement.fulfilled, (state, action) => {
                state.isPostLocationManagement = true;
                state.newLocation = action.payload
            })
            .addCase(postLocationManagement.rejected, (state, action) => { })
            // --- --- ---
            .addCase(putLocationByIDManagement.pending, (state) => { })
            .addCase(putLocationByIDManagement.fulfilled, (state, aciton) => {
                state.isPutLocationManagement = true;
                state.editLocation = aciton.payload
            })
            .addCase(putLocationByIDManagement.rejected, (state, action) => { })
            // --- --- ---
            .addCase(postImageForLocation.pending, (state) => { })
            .addCase(postImageForLocation.fulfilled, (state, action) => {
                state.isPostImageLocationManagement = true;
                state.postImageLocation = action.payload;
            })
            .addCase(postImageForLocation.rejected, (state, action) => { })
    },
});

export const { } = LocationSlices.actions

export default LocationSlices.reducer