import React, { useEffect, useState } from "react";
import Navbar from "../utils/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import uploadFile from "@/helper/UploadImage";
import { useDispatch, useSelector } from "react-redux";
import { getLoading, getUser, setLoading } from "@/redux/authSlice";
import Footer from "../utils/Footer";
import Modal from "./SignupModal";

const Signup = () => {
  const [image, setImage] = useState(null);
  const [role, setRole] = useState("student");
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      data.role = role;
      let profilePhoto;
      let imageInfo;

      if (image) {
        imageInfo = await uploadFile(image);
        profilePhoto = {
          public_id: imageInfo.public_id,
          url: imageInfo.secure_url,
        };

        data.profile = profilePhoto;
      }

      const response = await fetch(
        `/api/user/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();
      if (responseData.success) {
        setModalMessage(responseData.message);
        setIsModalOpen(true);
      } else {
        setModalMessage(responseData.message);
        setIsModalOpen(true);
      }
      reset();
      setImage(null);
    } catch (error) {
      setModalMessage(error.message || error);
      setIsModalOpen(true);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleModalOk = () => {
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          className="w-full md:w-1/2 border border-gray-200 rounded-md my-10 p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              className="mt-1"
              id="name"
              type="text"
              placeholder="Your Sweet Name"
              {...register("fullName", { required: "missing" })}
            />
            {errors.fullName && (
              <p className="text-red-600 text-sm">{errors.fullName.message}</p>
            )}
          </div>
          <div className="my-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              className="mt-1"
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "missing",
                pattern: {
                  value:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="my-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              className="mt-1"
              type="number"
              placeholder="Phone Number "
              {...register("phoneNumber", {
                required: "missing",
                maxLength: { value: 10, message: "Enter valid number" },
                minLength: { value: 10, message: "Enter valid number" },
              })}
            />
            {errors.phoneNumber && (
              <p className="text-red-600 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div className="my-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              className="mt-1"
              type="password"
              placeholder="password"
              {...register("password", {
                required: "missing",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                  message: `at least 8 characters\n
                  - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                  - Can contain special characters`,
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="my-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              className="mt-1"
              type="password"
              placeholder="confirm password"
              name="confirmPassword"
              {...register("confirmPassword", {
                validate: (value, formValues) =>
                  value === formValues.password || "password does not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup
              className="flex items-center justify-between gap-4 my-5"
              defaultValue="student"
              onValueChange={(value) => setRole(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="r1" />
                <Label className="cursor-pointer" htmlFor="r1">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recruiter" id="r2" />
                <Label className="cursor-pointer" htmlFor="r2">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center gap-3">
            <Label
              htmlFor="profile"
              className="flex justify-center items-center gap-5"
            >
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : "https://github.com/shadcn.png"
                  }
                  alt="@shadcn"
                />
              </Avatar>
              <span className="text-md hover:cursor-pointer">
                {image ? "Change Profile Image" : "Select Profile Image"}
              </span>
              <span className="text-sm text-gray-500">
                {image ? image.name : ""}
              </span>
            </Label>
            <input
              type="file"
              id="profile"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
            {image && (
              <button
                onClick={handleRemoveImage}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            )}
          </div>
          <Button
            className="my-4 flex items-center gap-3 w-full"
            type="submit"
          >
            {isLoading && <Loader2 className="animate-spin" />} Sign Up
          </Button>
          <div className="text-sm flex ">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline ml-2">
              Login
            </Link>
          </div>
        </form>
      </div>
      <Footer />
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
        onOk={handleModalOk}
      />
    </div>
  );
};

export default Signup;
