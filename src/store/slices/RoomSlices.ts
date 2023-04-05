import { createSlice, createAsyncThunk, PayloadAction, createAction } from "@reduxjs/toolkit";
import roomsAPI from "../../services/roomsAPI";

const initialState = {
    isGetRooms:false,
    rooms:[],
    //
    isGetRoomsByPosition:false,
    idGetPosition: '',
    arrGetPosition:[],
    roomsByPosition: [],
}

export const getRooms = createAsyncThunk('rooms/getRooms', async() => {
    try {
        const response = await roomsAPI.getRooms();
        return response.data.content
    } catch (error) {
        
    }
})
//--- --- --- --- --- --- --- --- --- --- --- ---
export const getRoomsByPosition = createAsyncThunk('rooms/getRoomsByPosition', async(value) => {
    try {
        const response = await roomsAPI.getRoomsByPosition(value);
        return response.data
    } catch (error) {
        
    }
})

const RoomSlices = createSlice({
  name: "rooms",
  initialState,
  reducers: {
        getPosition:(state, action) => {
            
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
      .addCase(getRoomsByPosition.pending,(state)=>{})
      .addCase(getRoomsByPosition.fulfilled,(state, action)=>{
            state.isGetRoomsByPosition = true;
            state.roomsByPosition = action.payload;
      })
      .addCase(getRoomsByPosition.rejected,(state, action)=>{})
  },
});

export const {} = RoomSlices.actions

export default RoomSlices.reducer