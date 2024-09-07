import React, { useEffect, useState } from "react";
import Navbar from "../utils/Navbar";

import JobCard from "../Jobs/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs, getSearchQuery, setSearchJobQuery } from "@/redux/jobSlice";

const Browse = () => {
  const searchJob = useSelector(getSearchQuery);
  const allJobs = useSelector(getAllJobs);
  const [localSearchJob, setLocalSearchJob] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const searchedJob = allJobs.filter((job) => {
      if (!searchJob) {
        return true;
      }
      return (
        job?.title?.toLowerCase().includes(searchJob.toLowerCase()) ||
        job?.company?.companyName
          ?.toLowerCase()
          .includes(searchJob.toLowerCase()) ||
        job?.description?.toLowerCase().includes(searchJob.toLowerCase())
      );
    });
    setLocalSearchJob(searchedJob);
    dispatch(setSearchJobQuery(""));
  }, []);

 

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 flex flex-col justify-center items-center ">
        <h1 className="font-bold text-xl my-10 ">
          Search Results ({localSearchJob?.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {localSearchJob?.map((job, idx) => {
            return <JobCard key={idx} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
