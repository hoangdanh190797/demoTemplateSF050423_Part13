import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import bookingAPI from 'services/bookingAPI'
const initialState = {
  isGetListBookingManagement: false,
  listBookingManagement: [],
  //
  isGetByIdBookingManagement: false,
  infoBooking: {},
  //
  isPutEditBookingManagement: false,
  //
  isDeleteBookingRejected: false,
  isDeleteBookingManagement: false,
  //
  isGetBookingByIdUser: false,
  infoBookingByIdUser: [],
}

export const getListBookingManagement = createAsyncThunk('booking/getListBookingManagement', async () => {
  const response = await bookingAPI.getListBookingManagement();
  return response.data.content;
})
export const getByIDBookingManagement = createAsyncThunk('booking/getByIDBookingManagement', async (idBooking: any) => {
  const response = await bookingAPI.getByIDBookingManagement(idBooking);
  return response.data.content;
})
export const putEditBookingManagement = createAsyncThunk('booking/putEditBookingManagement', async (infoRoomEdit: any) => {
  const response = await bookingAPI.putEditBookingManagement(infoRoomEdit);
  return response.data.content
})
export const deleteBookingManagement = createAsyncThunk('booking/deleteBookingManagement', async (idBookingDelete: any) => {
  const response = await bookingAPI.deleteBookingManagement(idBookingDelete)
  return response.data.content
})
export const getBookingByIdUser = createAsyncThunk('booking/getBookingByIdUser', async (idUser: any) => {
  const response = await bookingAPI.getBookingByIdUser(idUser)
  return response.data.content
})

const BookingSlices = createSlice({
  name: "booking",
  initialState,
  reducers: {
    checkDeleteBooking:(state) => {
      state.isDeleteBookingManagement = false;
      state.isDeleteBookingRejected = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getListBookingManagement.pending, (state) => { })
      .addCase(getListBookingManagement.fulfilled, (state, action) => {
        state.isGetListBookingManagement = true;
        state.listBookingManagement = action.payload
      })
      .addCase(getListBookingManagement.rejected, (state, action) => { })
      //--- --- ---
      .addCase(getByIDBookingManagement.pending, (state) => { })
      .addCase(getByIDBookingManagement.fulfilled, (state, action) => {
        state.isGetByIdBookingManagement = true;
        state.infoBooking = action.payload
      })
      .addCase(getByIDBookingManagement.rejected, (state, action) => { })
      //--- --- ---
      .addCase(putEditBookingManagement.pending, (state) => { })
      .addCase(putEditBookingManagement.fulfilled, (state, action) => {
        state.isPutEditBookingManagement = true;
      })
      .addCase(putEditBookingManagement.rejected, (state, action) => { })

      //--- --- ---
      .addCase(deleteBookingManagement.pending, (state) => { })
      .addCase(deleteBookingManagement.fulfilled, (state, action) => {
        state.isDeleteBookingManagement = true;
      })
      .addCase(deleteBookingManagement.rejected, (state, action) => {
          state.isDeleteBookingRejected = true;
       })
      //--- --- ---
      .addCase(getBookingByIdUser.pending, (state) => { })
      .addCase(getBookingByIdUser.fulfilled, (state, action) => {
        state.isGetBookingByIdUser = true;
        state.infoBookingByIdUser = action.payload
      })
      .addCase(getBookingByIdUser.rejected, (state, action) => { })
  },
});

export const { checkDeleteBooking } = BookingSlices.actions

export default BookingSlices.reducer