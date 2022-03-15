import { createSlice } from '@reduxjs/toolkit'

const initialState = ""

export const removedSlice = createSlice({
  name: 'removed',
  initialState: { value: initialState },
  reducers: {
    changeRemoved: (state, action) => {
      state.value = action.payload
    },
  }
})

export const { changeRemoved } = removedSlice.actions
export default removedSlice.reducer  