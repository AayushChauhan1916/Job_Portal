import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading:false,
  adminJobs:[],
  singleAdminJob:null,
  searchJob:""
}

export const adminJobSlice= createSlice({
  name: 'AdminJob',
  initialState,
  reducers: {
   setAdminJob:(state,action)=>{
    state.adminJobs = action.payload;
   },
   setSearchJob:(state,action)=>{
    state.searchJob = action.payload
   }
  },
})

export const {setAdminJob,setSearchJob} = adminJobSlice.actions

export default adminJobSlice.reducer;