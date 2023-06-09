import { configureStore } from '@reduxjs/toolkit'
import userOptionsReducer from '../features/userOptions/userOptionsSlice'
import sortingReducer from '../features/sorting/sortingSlice'

export const store = configureStore({
    reducer: {
        userOptions: userOptionsReducer,
        sorting: sortingReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;