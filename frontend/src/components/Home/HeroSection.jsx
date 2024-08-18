import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setSearchJobQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchJobQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center px-2 md:px-0">
      <div className="flex flex-col gap-5 my-10">
        <span className="px-4 py-2 rounded-full bg-gray-100 text-[#f83002] mx-auto font-medium">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold">
          Search,Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p>
          Unlock your potential with a platform designed to bridge the gap
          between opportunity and talent.
        </p>
        <div className="flex lg:w-[40%] md:w-[60%] sm:w-full shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full"
            placeholder="Find Your Dream Jobs"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#6A38c2]"
          >
            <Search className="h-4 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
