import { createSlice, createAsyncThunk, PayloadAction, createAction } from "@reduxjs/toolkit";
import roomsAPI from "../../services/roomsAPI";

const initialState = {
      isGetRooms: false,
      rooms: [],
      //
      isGetRoomsByLocation: false,
      idGetLocation: '',
      arrGetLocation: [],
      roomsByLocation: [],
      //
      isGetRoomDetail: false,
      roomDetail: {},
      //
      isPostInfoBooking: false,
      isPostBookingRejected: false,
      infoBooking: {},
      //
      isGetListRoomManagement: false,
      listRoomManagement: [],
      //
      isGetListRoomManagementTotal: false,
      listRoomManagementTotal: [],
      //
      isPutRoomEditManagement: false,
      roomEditManagement: {},
      //
      isPostRoomNewManagement: false,
      roomNewManagement: {},
      //
      isDeleteRoomManagement: false,
      //
      istPostImageManagement: false,
}

export const getRooms = createAsyncThunk('rooms/getRooms', async () => {
      const response = await roomsAPI.getRooms();
      return response.data.content
})
//--- --- --- --- --- --- --- --- --- --- --- ---
export const getRoomsByLocation = createAsyncThunk('rooms/getRoomsByLocation', async (idLocation: any) => {
      const response = await roomsAPI.getRoomsByLocation(idLocation);
      return response.data.content
})
//--- --- --- --- --- --- --- --- --- --- --- ---
export const getRoomByIdForDetail = createAsyncThunk('rooms/getRoomByIdForDetail', async (idUser: any) => {
      const response = await roomsAPI.getRoomByIdForDetail(idUser);
      return response.data.content
})
//--- --- --- --- --- --- --- --- --- --- --- ---
export const postRoomBooking = createAsyncThunk('rooms/postRoomBooking', async (infoBooking: any) => {
      const response = await roomsAPI.postRoomBooking(infoBooking);
      return response.data.content
})
//--- --- --- --- --- --- --- --- --- --- --- ---
export const getListRoomManagement = createAsyncThunk('rooms/getListRoomManagement', async (objPage: any) => {
      const response = await roomsAPI.getListRoomManagement(objPage);
      return response.data.content
})
export const getListRoomManagementTotal = createAsyncThunk('rooms/getListRoomManagementTotal', async (objPage: any) => {
      const response = await roomsAPI.getListRoomManagement(objPage);
      return response.data.content
})
//--- --- --- --- --- --- --- --- --- --- --- ---
export const putRoomEditManagement = createAsyncThunk('rooms/putRoomEditManagement', async (roomEdit: any) => {
      const response = await roomsAPI.putRoomEditManagement(roomEdit);
      return response.data.content
})
//--- --- --- --- --- --- --- --- --- --- --- ---
export const postRoomNewManagement = createAsyncThunk('rooms/postRoomNewManagement', async (roomNew: any) => {
      const response = await roomsAPI.postNewRoomManagement(roomNew);
      return response.data.content
})
//--- --- --- --- --- --- --- --- --- --- --- ---
export const deleteRoomManagement = createAsyncThunk('rooms/deleteRoomManagement', async (idRoomDelete: any) => {
      const response = await roomsAPI.deleteRoomManagement(idRoomDelete);
      return response.data.content
})
//--- --- --- --- --- --- --- --- --- --- --- ---
export const postImageRoomManagement = createAsyncThunk('rooms/postImageRoomManagement', async (imageRoom: any) => {
      const response = await roomsAPI.postImageRoomManagement(imageRoom);
      return response.data.content
})

const RoomSlices = createSlice({
      name: "rooms",
      initialState,
      reducers: {
            getLocation: (state, action) => { },
            checkPostInfoBooking: (state) => {
                  state.isPostBookingRejected = false;
            },
            checkPostInfoBookingFulfiled: (state) => {
                  state.isPostInfoBooking = false
            }
      },
      extraReducers(builder) {
            builder
                  .addCase(getRooms.pending, (state) => { })
                  .addCase(getRooms.fulfilled, (state, action) => {
                        state.isGetRooms = true;
                        state.rooms = action.payload;
                  })
                  .addCase(getRooms.rejected, (state, action) => { })
                  //--- --- --- --- --- --- --- --- --- --- --- ---
                  .addCase(getRoomsByLocation.pending, (state) => { })
                  .addCase(getRoomsByLocation.fulfilled, (state, action) => {
                        state.isGetRoomsByLocation = true;
                        state.roomsByLocation = action.payload;
                  })
                  .addCase(getRoomsByLocation.rejected, (state, action) => { })
                  //--- --- --- --- --- --- --- --- --- --- --- ---
                  .addCase(getRoomByIdForDetail.pending, (state) => { })
                  .addCase(getRoomByIdForDetail.fulfilled, (state, action) => {
                        state.isGetRoomDetail = true;
                        state.roomDetail = action.payload;
                  })
                  .addCase(getRoomByIdForDetail.rejected, (state, action) => { })
                  //--- --- --- --- --- --- --- --- --- --- --- ---
                  .addCase(postRoomBooking.pending, (state) => { })
                  .addCase(postRoomBooking.fulfilled, (state, action) => {
                        state.isPostInfoBooking = true;
                        state.infoBooking = action.payload
                  })
                  .addCase(postRoomBooking.rejected, (state, action) => {
                        state.isPostBookingRejected = true;
                  })
                  //--- --- --- --- --- --- --- --- --- --- --- ---
                  .addCase(getListRoomManagement.pending, (state) => { })
                  .addCase(getListRoomManagement.fulfilled, (state, action) => {
                        state.isGetListRoomManagement = true;
                        state.listRoomManagement = action.payload;
                  })
                  .addCase(getListRoomManagement.rejected, (state, action) => { })
                  //--- --- --- --- --- --- --- --- --- --- --- ---
                  .addCase(getListRoomManagementTotal.pending, (state) => { })
                  .addCase(getListRoomManagementTotal.fulfilled, (state, action) => {
                        state.isGetListRoomManagementTotal = true;
                        state.listRoomManagementTotal = action.payload;
                  })
                  .addCase(getListRoomManagementTotal.rejected, (state, action) => { })
                  //--- --- --- --- --- --- --- --- --- --- --- ---
                  .addCase(putRoomEditManagement.pending, (state) => { })
                  .addCase(putRoomEditManagement.fulfilled, (state, action) => {
                        state.isPutRoomEditManagement = true;
                        state.roomDetail = action.payload;
                  })
                  .addCase(putRoomEditManagement.rejected, (state, action) => { })
                  //--- --- --- --- --- --- --- --- --- --- --- ---
                  .addCase(postRoomNewManagement.pending, (state) => { })
                  .addCase(postRoomNewManagement.fulfilled, (state, action) => {
                        state.isPostRoomNewManagement = true;
                        state.roomNewManagement = action.payload;
                  })
                  .addCase(postRoomNewManagement.rejected, (state, action) => { })
                  //--- --- --- --- --- --- --- --- --- --- --- ---
                  .addCase(deleteRoomManagement.pending, (state) => { })
                  .addCase(deleteRoomManagement.fulfilled, (state, action) => {
                        state.isDeleteRoomManagement = true;
                  })
                  .addCase(deleteRoomManagement.rejected, (state, action) => { })
                  //--- --- --- --- --- --- --- --- --- --- --- ---
                  .addCase(postImageRoomManagement.pending, (state) => { })
                  .addCase(postImageRoomManagement.fulfilled, (state, action) => {
                        state.istPostImageManagement = true;
                  })
                  .addCase(postImageRoomManagement.rejected, (state, action) => { })

      },
});

export const { checkPostInfoBooking, checkPostInfoBookingFulfiled } = RoomSlices.actions

export default RoomSlices.reducer