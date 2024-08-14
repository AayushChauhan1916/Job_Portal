import { setjobs } from "@/redux/jobSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const UseGetAllJob = async () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/job/get/alljob`, {
          method: "POST",
        });
        const responseData = await response.json();
        if (responseData.success) {
          dispatch(setjobs(responseData.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJob();
  }, []);
};

export default UseGetAllJob;
