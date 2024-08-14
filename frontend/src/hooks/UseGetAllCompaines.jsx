import { getUser } from "@/redux/authSlice";
import { setAllCompanies } from "@/redux/companySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const UseGetAllCompaines = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(`/api/company/get`, {
          method: "GET",
          credentials: "include",
        });
        const resData = await res.json();
        if (resData.success) {
          dispatch(setAllCompanies(resData.companies));
        } else {
          toast.error(resData.message);
        }
      } catch (error) {
        toast.error(error.message || error);
      }
    };
    fetchCompany();
  }, [dispatch, user?._id]);
};

export default UseGetAllCompaines;
