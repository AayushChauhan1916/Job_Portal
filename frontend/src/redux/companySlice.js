import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  singleCompany: null,
  companies:[],
  filterCompanyName:""
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setLoading:(state,action)=>{
      state.loading = action.payload
    },
    setAllCompanies:(state,action)=>{
      state.companies = action.payload
    },
    setFilterCompany:(state,action)=>{
      state.filterCompanyName = action.payload;
    }
  },
});

export const getSingleCompany = (state)=>state.company.singleCompany;
export const getLoading = (state)=>state.company.loading;
export const getAllCompanies = (state)=>state.company.companies;

export const { setSingleCompany,setLoading, setAllCompanies,setFilterCompany } = companySlice.actions;

export default companySlice.reducer;
