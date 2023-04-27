import { configureStore } from '@reduxjs/toolkit'
import AuthSlices from './slices/AuthSlices'
import UserSlices from './slices/UserSlices'
import RoomSlices from './slices/RoomSlices'
import LocationSlices from './slices/LocationSlices'
import CommentsSlices from './slices/CommentsSlices'
import BookingSlices from './slices/BookingSlices'


const store = configureStore({
  reducer: {
    auth: AuthSlices,
    user: UserSlices,
    rooms: RoomSlices,
    location: LocationSlices,
    comments: CommentsSlices,
    booking: BookingSlices,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store