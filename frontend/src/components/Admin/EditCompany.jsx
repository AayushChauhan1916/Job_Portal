import React, { useState, useEffect } from "react";
import Navbar from "../utils/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { getLoading, getSingleCompany, setLoading } from "@/redux/companySlice";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import uploadFile from "@/helper/UploadImage";
import UseGetCompanyById from "@/hooks/UseGetCompanyById";
import Footer from "../utils/Footer";

const EditCompany = () => {
  const company = useSelector(getSingleCompany);
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const isLoading = useSelector(getLoading);
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue, // Add setValue to control form input
  } = useForm();

  // call hook
  UseGetCompanyById(id);

  if (company) {
    // Set form fields with existing company data
    setValue("companyName", company?.companyName);
    setValue("description", company?.description);
    setValue("website", company?.website);
    setValue("location", company?.location);
  }

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleRemoveImage = () => {
    setImage("");
  };

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      let logo;
      let imageInfo;

      if (image) {
        imageInfo = await uploadFile(image);
        logo = {
          public_id: imageInfo.public_id,
          url: imageInfo.secure_url,
        };

        data.logo = logo;
      }

      const response = await fetch(`/api/company/update/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (responseData.success == true) {
        toast.success(responseData.message);
        navigate("/admin/company");
      } else {
        toast.error(responseData.message);
      }
      reset();
      setImage("");
    } catch (error) {
      toast.error(error.message || error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-16 px-3 md:px-0">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Button
            variant="outline"
            className="flex items-center gap-2 font-semibold text-gray-500"
            onClick={() => navigate("/admin/company")}
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>

          <h1 className="font-bold text-xl text-center">
            Edit Company Details
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-2">
            <Label className="" htmlFor="companyName">
              Company Name
            </Label>
            <Input
              className="mt-1"
              id="companyName"
              type="text"
              {...register("companyName", {
                required: "Company name is required",
              })}
            />
            {errors.companyName && (
              <p className="text-red-600 text-sm">
                {errors.companyName.message}
              </p>
            )}
          </div>
          <div className="my-2">
            <Label className="" htmlFor="description">
              Description
            </Label>
            <Input
              className="mt-1"
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
            <Label className="" htmlFor="website">
              Website
            </Label>
            <Input
              className="mt-1"
              id="website"
              type="text"
              {...register("website", { required: "Website is required" })}
            />
            {errors.website && (
              <p className="text-red-600 text-sm">{errors.website.message}</p>
            )}
          </div>
          <div className="my-2">
            <Label className="" htmlFor="location">
              Location
            </Label>
            <Input
              className="mt-1"
              id="location"
              type="text"
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && (
              <p className="text-red-600 text-sm">{errors.location.message}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Label
              htmlFor="profile"
              className="flex justify-center items-center gap-5 mt-2"
            >
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : company?.logo?.url || "https://github.com/shadcn.png"
                  }
                  alt="@shadcn"
                />
              </Avatar>
              <span className="text-md hover:cursor-pointer">
                {image ? "Change Company Logo" : "Select Company Logo"}
              </span>

              <span className="text-red-500 text-sm block md:inline-block">
                {image ? "" : "Not Mandatory*"}
              </span>
            </Label>
            {image && (
              <X className="cursor-pointer" onClick={handleRemoveImage}></X>
            )}
            <input
              type="file"
              onChange={handleImage}
              id="profile"
              className="hidden"
            />
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
      <Footer/>
    </div>
  );
};

export default EditCompany;
