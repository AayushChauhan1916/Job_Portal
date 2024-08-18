import React, { useEffect, useState } from "react";
import Navbar from "../utils/Navbar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/redux/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getsingleJob, setSingleJob } from "@/redux/jobSlice";
import { getLoading, setLoading } from "@/redux/jobSlice";
import JobDescriptionSkeleton from "./JobDescriptionSkeleton";
import { toast } from "sonner";

const JobDescription = () => {
  const { id } = useParams();
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const job = useSelector(getsingleJob);
  const isLoading = useSelector(getLoading);
  const [isApplied, setIsApplied] = useState(false);
  const navigate = useNavigate();

  const handleApplyJob = async () => {
    if(!user){
      toast.error("please login first...");
      navigate("/login");
      return;
    }
    try {
      const res = await fetch(`/api/application/apply/${id}`, {
        method: "POST",
        credentials: "include",
      });
      const resData = await res.json();
      if (resData.success) {
        setIsApplied(true);
        dispatch(
          setSingleJob({
            ...job,
            application: [...job.application, { applicant: user?._id }],
          })
        );
        toast.success(resData.message);
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      toast.error(error.message || error);
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/job/get/${id}`, {
          method: "POST",
          credentials: "include",
        });
        const responseData = await response.json();
        if (responseData.success) {
          dispatch(setSingleJob(responseData.job));
          const fetchedJob = responseData.job;
          const initiallyApplied = await fetchedJob?.application?.some(
            (item) => item.applicant == user?._id
          );
          setIsApplied(initiallyApplied);
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchJob();
  }, [id, user?._id, dispatch]);

  return (
    <div>
      <Navbar />
      {isLoading == true ? (
        <JobDescriptionSkeleton />
      ) : (
        <div className="max-w-6xl mx-auto my-10 px-4">
          <h1 className="font-bold  text-xl text-center md:text-start">
            {job?.company?.companyName}
          </h1>
          <div className="flex items-center flex-col gap-2 md:flex-row">
            <div className="flex items-center gap-4 mt-4">
              <Badge className={`text-blue-700 font-bold`} variant="ghost">
                {job?.position}
              </Badge>
              <Badge className={`text-[#F83002] font-bold`} variant="ghost">
                {job?.jobType}
              </Badge>
              <Badge className={`text-[#7209b7] font-bold`} variant="ghost">
                {job?.salary}
              </Badge>
            </div>
            <Button
              disabled={isApplied}
              className={`rounded-b-lg sm:ml-2 self-start md:ml-auto ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#7209b7] hover:bg-[#4e087c]"
              }`}
              onClick={isApplied ? null : handleApplyJob}
            >
              {isApplied ? "Applied" : "Apply Now"}
            </Button>
          </div>
          <h1 className="border-b-2 border-b-gray-300 my-5 py-2">
            {job?.title}
          </h1>
          <div className="my-4">
            <h1 className="font-bold my-1">
              Positions:{" "}
              <span className="pl-4 font-normal text-gray-800">
                {job?.position}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Location:{" "}
              <span className="pl-4 font-normal text-gray-800">
                {job?.location}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Description:{" "}
              <span className="pl-4 font-normal text-gray-800">
                {job?.description} 
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Experience:{" "}
              <span className="pl-4 font-normal text-gray-800">
                {job?.experienceLevel} &nbsp;year
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Salary:{" "}
              <span className="pl-4 font-normal text-gray-800">
                {" "}
                {job?.salary} CTC
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Total Application:{" "}
              <span className="pl-4 font-normal text-gray-800">
                {job?.application?.length}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Posted Date:{" "}
              <span className="pl-4 font-normal text-gray-800">
                {job?.createdAt.split("T")[0]}
              </span>
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDescription;
