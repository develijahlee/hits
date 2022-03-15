import { configureStore } from '@reduxjs/toolkit'
import removedReducer from './slices/removedSlice'

export const store = configureStore({
  reducer: { removed: removedReducer }
})