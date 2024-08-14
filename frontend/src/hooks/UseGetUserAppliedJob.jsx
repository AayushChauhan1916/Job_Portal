import { setUserAppliedJOb } from "@/redux/authSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const UseGetUserAppliedJob = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/application/get/appliedjob`, {
          method: "GET",
          credentials: "include",
        });
        const responseData = await response.json();
        if (responseData.success) {
          dispatch(setUserAppliedJOb(responseData.applications));
        }
      } catch (error) {
        toast.error(error.message || "something went wrong");
      }
    };
    fetchJob();
  }, []);
};

export default UseGetUserAppliedJob;
