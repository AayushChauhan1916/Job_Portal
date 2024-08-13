import React from "react";
import LatestJobsCard from "./LatestJobsCard";
import { useSelector } from "react-redux";
import { getAllJobs } from "@/redux/jobSlice";
import { Loader2 } from "lucide-react";
import SkeletonCard from "./SkeletonCard";

const jobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  const allJobs = useSelector(getAllJobs);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
      <h1 className="text-4xl font-bold mb-6">
        <span className="text-[#6a38c2]">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJobs.length <= 0
          ? [1, 2, 3, 4, 5, 6].map((idx) => {
              return <SkeletonCard key={idx}></SkeletonCard>;
            })
          : allJobs
              .slice(0, 6)
              .map((job) => <LatestJobsCard key={job._id} job={job} />)}
      </div>
    </div>
  );
};

export default LatestJobs;
