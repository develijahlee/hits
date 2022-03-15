import { createSlice } from '@reduxjs/toolkit'

export const toggledRemovedSlice = createSlice({
  name: 'toggleRemoved',
  initialState: { active: false },
  reducers: {
    changeToggleRemoved: (state) => {
      state.active = !state.active
    },
  }
})

export const { changeToggleRemoved } = toggledRemovedSlice.actions
export default toggledRemovedSlice.reducer  