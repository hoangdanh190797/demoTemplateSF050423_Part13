import { createSlice, createAsyncThunk, PayloadAction, createAction } from "@reduxjs/toolkit";
import roomsAPI from "../../services/roomsAPI";

const initialState = {
    isGetRooms:false,
    rooms:[],
    //
    isGetRoomsByLocation:false,
    idGetLocation: '',
    arrGetLocation:[],
    roomsByLocation: [],
}

export const getRooms = createAsyncThunk('rooms/getRooms', async() => {
    try {
        const response = await roomsAPI.getRooms();
        return response.data.content
    } catch (error) {
        
    }
})
//--- --- --- --- --- --- --- --- --- --- --- ---
export const getRoomsByLocation = createAsyncThunk('rooms/getRoomsByLocation', async(value) => {
    try {
        const response = await roomsAPI.getRoomsByLocation(value);
        return response.data
    } catch (error) {
        
    }
})

const RoomSlices = createSlice({
  name: "rooms",
  initialState,
  reducers: {
        getLocation:(state, action) => {
            
        }
  },
  extraReducers(builder) {
      builder
      .addCase(getRooms.pending,(state)=>{})
      .addCase(getRooms.fulfilled,(state, action)=>{
            state.isGetRooms = true;
            state.rooms = action.payload;
      })
      .addCase(getRooms.rejected,(state, action)=>{})
      //--- --- --- --- --- --- --- --- --- --- --- ---
      .addCase(getRoomsByLocation.pending,(state)=>{})
      .addCase(getRoomsByLocation.fulfilled,(state, action)=>{
            state.isGetRoomsByLocation = true;
            state.roomsByLocation = action.payload;
      })
      .addCase(getRoomsByLocation.rejected,(state, action)=>{})
  },
});

export const {} = RoomSlices.actions

export default RoomSlices.reducer