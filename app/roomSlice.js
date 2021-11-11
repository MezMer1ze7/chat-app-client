import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  rooms: [],
}

export const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    allRooms: (state, action) => {
        state.rooms = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { allRooms } = roomSlice.actions

export default roomSlice.reducer