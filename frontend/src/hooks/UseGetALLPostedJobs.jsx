import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAdminJob } from "@/redux/AdminJobSlice";

const UseGetALLPostedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/job/get/admin/job`, {
          method: "POST",
          credentials: "include",
        });
        const responseData = await response.json();
        if (responseData.success) {
          dispatch(setAdminJob(responseData.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJob();
  }, []);
};

export default UseGetALLPostedJobs;
