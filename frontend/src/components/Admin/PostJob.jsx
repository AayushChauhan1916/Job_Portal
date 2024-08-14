import React, { useEffect, useState } from "react";
import Navbar from "../utils/Navbar";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { getAllCompanies } from "@/redux/companySlice";
import { toast } from "sonner";
import Footer from "../utils/Footer";

const PostJob = () => {
  const companies = useSelector(getAllCompanies);
  const isLoading = false;
  const navigate = useNavigate();
  const [selectCompany, setSelectCompany] = useState();
  console.log(selectCompany);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue, // Add setValue to control form input
  } = useForm();

  const onSubmit = async (data) => {
    if (!selectCompany) {
      toast.error("Please first select the company");
      return;
    }
    data.companyId = selectCompany;
    try {
      const res = await fetch(`/api/job/post`, {
        method: "Post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (resData.success) {
        toast.success(resData.message);
        navigate("/admin/jobs");
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      toast.error(error.message || message);
    }
  };

  useEffect(() => {
    if (companies.length < 1) {
      toast.error("Please register company before post a job");
      navigate("/admin/register/company");
    }
  }, [companies]);

  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-xl mx-auto my-16 px-3 md:px-0">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Button
            variant="outline"
            className="flex items-center gap-2 font-semibold text-gray-500"
            onClick={() => navigate("/admin/jobs")}
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>

          <h1 className="font-bold text-xl text-center">Post New Job</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-2">
            <Label className="" htmlFor="title">
              Role
            </Label>
            <Input
              className="mt-1 focus-visible:ring-0 focus-visible:ring-offset-0"
              id="title"
              type="text"
              {...register("title", {
                required: "title is required",
              })}
            />
            {errors.title && (
              <p className="text-red-600 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="my-2">
            <Label className="" htmlFor="description">
              Description
            </Label>
            <Input
              className="mt-1  focus-visible:ring-0 focus-visible:ring-offset-0"
              id="description"
              type="text"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-600 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="my-2">
            <Label className="" htmlFor="requirements">
              Requirements
            </Label>
            <Input
              className="mt-1  focus-visible:ring-0 focus-visible:ring-offset-0"
              id="requirements"
              type="text"
              {...register("requirements", {
                required: "requirements is required",
              })}
            />
            {errors.requirements && (
              <p className="text-red-600 text-sm">
                {errors.requirements.message}
              </p>
            )}
          </div>
          <div className="my-2">
            <Label className="" htmlFor="location">
              Location
            </Label>
            <Input
              className="mt-1  focus-visible:ring-0 focus-visible:ring-offset-0"
              id="location"
              type="text"
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && (
              <p className="text-red-600 text-sm">{errors.location.message}</p>
            )}
          </div>
          <div className="flex gap-3">
            <div className="my-2">
              <Label className="" htmlFor="experienceLevel">
                ExperienceLevel
              </Label>
              <Input
                className="mt-1  focus-visible:ring-0 focus-visible:ring-offset-0"
                id="experienceLevel"
                type="number"
                {...register("experienceLevel", {
                  required: "experienceLevel is required",
                })}
              />
              {errors.experienceLevel && (
                <p className="text-red-600 text-sm">
                  {errors.experienceLevel.message}
                </p>
              )}
            </div>
            <div className="my-2">
              <Label className="" htmlFor="salary">
                Salary
              </Label>
              <Input
                className="mt-1  focus-visible:ring-0 focus-visible:ring-offset-0"
                id="salary"
                type="number"
                {...register("salary", { required: "salary is required" })}
              />
              {errors.salary && (
                <p className="text-red-600 text-sm">{errors.salary.message}</p>
              )}
            </div>
          </div>

          <div className="my-2">
            <Label className="" htmlFor="jobType">
              JobType
            </Label>
            <Input
              className="mt-1  focus-visible:ring-0 focus-visible:ring-offset-0"
              id="jobType"
              type="text"
              {...register("jobType", { required: "jobType is required" })}
            />
            {errors.jobType && (
              <p className="text-red-600 text-sm">{errors.jobType.message}</p>
            )}
          </div>
          <div className="my-2">
            <Label className="" htmlFor="position">
              Position
            </Label>
            <Input
              className="mt-1  focus-visible:ring-0 focus-visible:ring-offset-0"
              id="position"
              type="number"
              {...register("position", { required: "position is required" })}
            />
            {errors.position && (
              <p className="text-red-600 text-sm">{errors.position.message}</p>
            )}
          </div>
          <div className="my-2">
            <Label htmlFor="position">Company</Label>
            {companies.length > 0 && (
              <Select onValueChange={(value) => setSelectCompany(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => {
                    return (
                      <SelectItem key={company._id} value={company._id}>
                        {company.companyName}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          </div>

          {isLoading ? (
            <Button className="w-full mt-5">
              <Loader2 className="animate-spin">Please Wait...</Loader2>
            </Button>
          ) : (
            <Button className="w-full mt-5">Submit</Button>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PostJob;
