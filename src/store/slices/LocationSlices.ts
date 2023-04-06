import { createSlice, createAsyncThunk, PayloadAction, createAction } from '@reduxjs/toolkit'
import locationAPI from '../../services/locationAPI';

const initialState = {
    isGetLocation: false,
    location: [],
}

export const getLocation = createAsyncThunk('location/getLocation', async() => {
    try {
        const response = await locationAPI.getLocation();
        return response.data.content
    } catch (error) {
        
    }
})

const LocationSlices = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers(builder) {
      builder
      .addCase(getLocation.pending, (state)=>{})
      .addCase(getLocation.fulfilled, (state, action)=>{
            state.isGetLocation = true;
            state.location = action.payload;
      })
      .addCase(getLocation.rejected, (state, action)=>{})
  },
});

export const {} = LocationSlices.actions

export default LocationSlices.reducer