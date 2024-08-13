import { createSlice } from '@reduxjs/toolkit'
import { setSearchJob } from './AdminJobSlice';

const initialState = {
  loading:false,
  allJobs:[],
  singleJob:null,
  searchedJobs:""
}

export const jobSlice= createSlice({
  name: 'job',
  initialState,
  reducers: {
   setjobs:(state,action)=>{
    state.allJobs = action.payload;
   },
   setSingleJob:(state,action)=>{
    state.singleJob = action.payload;
   },
   setLoading:(state,action)=>{
    state.loading = action.payload;
   },
   setSearchJobQuery:(state,action)=>{
    state.searchedJobs = action.payload
   }
  },
})

export const getAllJobs = (state)=>state.job.allJobs;
export const getsingleJob = (state)=>state.job.singleJob;
export const getLoading = (state)=>state.job.loading;
export const getSearchQuery = (state)=>state.job.searchedJobs;

// Action creators are generated for each case reducer function
export const {setjobs,setSingleJob,setLoading,setSearchJobQuery} = jobSlice.actions


export default jobSlice.reducer;