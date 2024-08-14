import React, { useEffect, useState } from "react";
import Navbar from "../utils/Navbar";
import ApplicantTable from "./ApplicantTable";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "@/redux/ApplicationSlice";
import Footer from "../utils/Footer";

const Applicant = () => {
  const [isStatusChange, setStatusChange] = useState(false);
  const allJobs = useSelector((state) => state.job.allJobs);
  const { id } = useParams();
  const dispatch = useDispatch();
  const applicants = useSelector((state) => state.application.applicants);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await fetch(`/api/application/${id}/applicants`, {
          method: "GET",
          credentials: "include",
        });
        const resData = await res.json();
        if (resData.success) {
          dispatch(setApplicants(resData.job));
        } else {
          toast.error(resData.message);
        }
      } catch (error) {
        toast.error(error.message || "An unexpected error occurred.");
      }
    };

    fetchApplicants();
  }, [allJobs, dispatch, isStatusChange, id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 min-h-[80vh]">
        <h1 className="font-bold text-xl my-5">
          Applicants ({applicants?.length || 0})
        </h1>
        {applicants?.length > 0 ? (
          <ApplicantTable
            isStatusChange={isStatusChange}
            setStatusChange={setStatusChange}
          />
        ) : (
          <p className="text-center text-gray-500">No applicants found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Applicant;
