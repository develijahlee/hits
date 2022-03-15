import { configureStore } from '@reduxjs/toolkit'
import removedReducer from './slices/removedSlice'
import toggleRemovedReducer from './slices/toggleRemovedSlice'

export const store = configureStore({
  reducer: {
    removed: removedReducer,
    toggleRemoved: toggleRemovedReducer
  }
})