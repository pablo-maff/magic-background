import { createSlice } from '@reduxjs/toolkit'

const colorSlice = createSlice({
  name: 'color',
  initialState: '',
  reducers: {
    setColor(state, action) {
      return action.payload
    },
  },
})

export const { setColor } = colorSlice.actions
export default colorSlice.reducer
