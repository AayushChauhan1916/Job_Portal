import { setSingleCompany } from "@/redux/companySlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const UseGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(
    () => {
      const fetchCompany = async () => {
        try {
          const res = await fetch(`/api/company/get/${companyId}`, {
            method: "GET",
            credentials: "include",
          });
          const resData = await res.json();
          if (resData.success) {
            dispatch(setSingleCompany(resData.company));
          } else {
            toast.error(resData.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message || error);
        }
      };
      fetchCompany();
    },
    [companyId],
    dispatch
  );
};

export default UseGetCompanyById;
