import React, { useEffect, useState } from "react";
import Navbar from "../utils/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import Footer from "../utils/Footer";
import UseGetALLPostedJobs from "../../hooks/UseGetALLPostedJobs";
import PostedJobTable from "./PostedJobTable";
import { useDispatch } from "react-redux";
import { setSearchJob } from "@/redux/AdminJobSlice";
import { useNavigate } from "react-router-dom";

const PostedJobs = () => {
  UseGetALLPostedJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchJob, setSearch] = useState("");
  useEffect(() => {
    dispatch(setSearchJob(searchJob));
  }, [searchJob]);

  return (
    <div>
      <Navbar />
      <div className=" max-w-6xl mx-auto my-10 min-h-[100vh] px-3 md:px-0">
        <div className="flex flex-col gap-4 md:flex-row items-center justify-between my-5">
          <Input
            className="md:w-fit"
            placeholder="filter by title and company name"
            onChange={(e) => setSearch(e.target.value)}
          ></Input>
          <Button
            className=" w-full md:w-fit "
            onClick={() => navigate("/admin/post/job")}
          >
            Post a new job
          </Button>
        </div>
        <PostedJobTable></PostedJobTable>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default PostedJobs;
