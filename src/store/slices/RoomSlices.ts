import { createSlice, createAsyncThunk, PayloadAction, createAction } from "@reduxjs/toolkit";
import roomsAPI from "../../services/roomsAPI";

const initialState = {
    isGetRooms:false,
    rooms:[],
    //
    isGetRoomsByLocation:false,
    idGetLocation: '',
    arrGetLocation:[],
    roomsByLocation:[],
    //
    isGetRoomDetail:false,
    roomDetail:{},
    //
    isPostInfoBooking: false,
    infoBooking:{},
    //
    isGetListRoomManagement: true,
    listRoomManagement:[],
}

export const getRooms = createAsyncThunk('rooms/getRooms', async() => {
        const response = await roomsAPI.getRooms();
        return response.data.content
})
//--- --- --- --- --- --- --- --- --- --- --- ---
export const getRoomsByLocation = createAsyncThunk('rooms/getRoomsByLocation', async(idLocation:any) => {
        const response = await roomsAPI.getRoomsByLocation(idLocation);
        return response.data.content
})
//--- --- --- --- --- --- --- --- --- --- --- ---
export const getRoomByIdForDetail = createAsyncThunk('rooms/getRoomByIdForDetail', async(idUser: any) => {
        const response = await roomsAPI.getRoomByIdForDetail(idUser);
        return response.data.content
    })
//--- --- --- --- --- --- --- --- --- --- --- ---
export const postRoomBooking = createAsyncThunk('rooms/postRoomBooking', async(infoBooking: any) => {
      const response = await roomsAPI.postRoomBooking(infoBooking);
      return response.data.content
})
//--- --- --- --- --- --- --- --- --- --- --- ---
export const getListRoomManagement = createAsyncThunk('rooms/createAsyncThunk', async(objPage: any) => {
      const response = await roomsAPI.getListRoomManagement(objPage);
      return response.data.content
})

const RoomSlices = createSlice({
  name: "rooms",
  initialState,
  reducers: {
        getLocation:(state, action) => {}
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
      //--- --- --- --- --- --- --- --- --- --- --- ---
      .addCase(getRoomByIdForDetail.pending, (state) => {})
      .addCase(getRoomByIdForDetail.fulfilled, (state, action) => {
            state.isGetRoomDetail = true;
            state.roomDetail = action.payload;
      })
      .addCase(getRoomByIdForDetail.rejected, (state, action) => {})
      //--- --- --- --- --- --- --- --- --- --- --- ---
      .addCase(postRoomBooking.pending, (state) => {})
      .addCase(postRoomBooking.fulfilled, (state, action) => {
            state.isPostInfoBooking = true;
            state.infoBooking = action.payload
      })
      .addCase(postRoomBooking.rejected, (state, action) => {})
      //--- --- --- --- --- --- --- --- --- --- --- ---
      .addCase(getListRoomManagement.pending, (state) => {})
      .addCase(getListRoomManagement.fulfilled, (state, action) => {
            state.isGetListRoomManagement = true;
            state.listRoomManagement = action.payload;
      })
      .addCase(getListRoomManagement.rejected, (state, action) => {})
  },
});

export const {} = RoomSlices.actions

export default RoomSlices.reducer