import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading:false,
  user:null,
  userAppliedJob:[]
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading:(state,action)=>{
        state.loading=action.payload;
    },
    setAuthUser:(state,action)=>{
      state.user = action.payload;
    },
    setLogout:(state,action)=>{
      state.user = null;
    },
    setUserAppliedJOb:(state,action)=>{
      state.userAppliedJob = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLoading,setAuthUser,setLogout,setUserAppliedJOb } = authSlice.actions

export const getLoading = (state) => state.auth.loading;
export const getUser = (state) => state.auth.user;
export const getUserAppliedJob = (state)=>state.auth.userAppliedJob;

export default authSlice.reducer;