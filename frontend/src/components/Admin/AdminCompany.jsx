import React, { useEffect, useState } from "react";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UseGetAllCompaines from "@/hooks/UseGetAllCompaines";
import { useDispatch } from "react-redux";
import { setFilterCompany } from "@/redux/companySlice";

const AdminCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const[searchCompany,setSearchCompany] = useState("");
  useEffect(()=>{
    dispatch(setFilterCompany(searchCompany))
  },[searchCompany])
  UseGetAllCompaines();
  return (
    <div>
      <Navbar />
      <div className=" max-w-6xl mx-auto my-10 min-h-[100vh] px-3 md:px-0">
        <div className="flex flex-col gap-4 md:flex-row items-center justify-between my-5">
          <Input className="md:w-fit" placeholder="filter by name" onChange={(e)=>setSearchCompany(e.target.value)}></Input>
          <Button className=" w-full md:w-fit " onClick={() => navigate("/admin/register/company")}>
            New Company
          </Button>
        </div>
        <CompaniesTable></CompaniesTable>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AdminCompany;
