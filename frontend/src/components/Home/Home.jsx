import React, { useEffect } from "react";
import Navbar from "../utils/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "../utils/Footer";
import UseGetAllJob from "@/hooks/UseGetAllJob";
import { useSelector } from "react-redux";
import { getUser } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
  const user = useSelector(getUser);
  const isRecruiter = user?.role === "recruiter";
  const navigate = useNavigate();
  useEffect(() => {
    if (isRecruiter) {
      navigate("/admin/company");
    } else {
      navigate("/");
    }
  }, []);
  UseGetAllJob();
  return (
    <>
      <Navbar></Navbar>
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </>
  );
};

export default Home;
