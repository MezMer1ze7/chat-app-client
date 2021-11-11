import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: undefined,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {

      state.user = action.payload
    },
    logoutUser: (state) => {
      state.user = undefined
    },
  }
})

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser } = userSlice.actions

export default userSlice.reducer