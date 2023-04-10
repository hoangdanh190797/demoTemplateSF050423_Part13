import { configureStore } from '@reduxjs/toolkit'
import RoomSlices from './slices/RoomSlices'
import LocationSlices from './slices/LocationSlices'
import AuthSlices from './slices/AuthSlices'
import UserSlices from './slices/UserSlices'
import CommentsSlices from './slices/CommentsSlices'

export const store = configureStore({
  reducer: {
    rooms: RoomSlices,
    location: LocationSlices,
    auth: AuthSlices,
    user: UserSlices,
    comments: CommentsSlices,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch