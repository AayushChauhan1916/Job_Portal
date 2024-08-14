import React, { useState } from "react";
import Navbar from "../utils/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const RegisterCompany = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const handleCompanyName = (e) => {
    setCompanyName(e.target.value);
  };
  const handleRegisterCompany = async () => {
    if (companyName.length < 1) {
      toast.error("Please mention your company name");
      return;
    }
    try {
      const res = await fetch(`/api/company/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName }),
      });
      const resData = await res.json();
      if (resData.success) {
        dispatch(setSingleCompany(resData.company));
        const companyId = resData.company._id;
        toast.success(resData.message);
        navigate(`/admin/edit/company/${companyId}`);
      } else {
        toast.error(resData.message);
      }
    } catch (err) {
      toast.error(err.message || err);
    }
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-4xl mx-auto px-3 md:px-0">
        <div className="my-10">
          <h1 className="font-bold text-2xl ">Your Company Name</h1>
          <p className="text-gray-500">
            Mention Your Company Name... You can Edit this later
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          name="company"
          className="my-2"
          placeholder="JobCarrier,Microsoft"
          value={companyName}
          onChange={handleCompanyName}
          required
        ></Input>
        <div className="flex items-center gap-2 my-10">
          <Button variant="outline" onClick={() => navigate("/admin/company")}>
            {" "}
            Cancel
          </Button>
          <Button onClick={handleRegisterCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompany;
