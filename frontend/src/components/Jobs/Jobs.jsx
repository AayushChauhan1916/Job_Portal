import React, { useEffect, useState } from "react";
import Navbar from "../utils/Navbar";
import FilterCard from "./FilterCard";
import JobCard from "./JobCard";
import Footer from "../utils/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllJobs,
  getSearchQuery,
  setSearchJobQuery,
} from "@/redux/jobSlice";
import { motion } from "framer-motion";

const Jobs = () => {
  const allJobs = useSelector(getAllJobs);
  const dispatch = useDispatch();
  const [filterJob, setFilterJob] = useState(allJobs);

  const filterKey = useSelector(getSearchQuery);
  const [minSalary, maxSalary] = filterKey?.split("-").map(Number);

  useEffect(() => {
    if (filterKey) {
      const filteredJob = allJobs.filter((job) => {
        return (
          job?.title?.toLowerCase().includes(filterKey.toLowerCase()) ||
          job?.location?.toLowerCase().includes(filterKey?.toLowerCase()) ||
          job?.description?.toLowerCase().includes(filterKey?.toLowerCase()) ||
          (job?.salary >= minSalary && job?.salary <= maxSalary)
        );
      });
      setFilterJob(filteredJob);
    } else {
      setFilterJob(allJobs);
    }
  }, [filterKey]);

  useEffect(() => {
    return () => {
      dispatch(setSearchJobQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 flex flex-col justify-center items-center">
        <div className="md:grid  md:grid-cols-[25%,1fr] w-full">
          <FilterCard />
          <div className="flex justify-center gap-3 flex-wrap overflow-hidden overflow-y-auto h-[100vh]">
            <div className="mb-5 px-2">
              {filterJob.length == 0 ? (
                <span>Job Not Found</span>
              ) : (
                <div className="w-full grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-5">
                  {filterJob.map((job, idx) => {
                    return (
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                      >
                        <JobCard key={idx} job={job}></JobCard>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
