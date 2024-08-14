import React, { useEffect, useState } from "react";
import Navbar from "../utils/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import uploadImage from "@/helper/UploadImage";
import { useDispatch, useSelector } from "react-redux";
import { getLoading, getUser } from "@/redux/authSlice";
import { setLoading } from "@/redux/authSlice";
import { toast } from "sonner";
import Footer from "../utils/Footer";
import uploadFile from "@/helper/UploadImage";

const Signup = () => {
  const [image, setImage] = useState(null);
  const [role, setRole] = useState("student");
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
  }, []);

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

      const response = await fetch(`/api/user/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (responseData.success == true) {
        toast.success(responseData.message);
        navigate("/login");
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

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleRemoveImage = () => {
    setImage("");
  };

  return (
    <div>
      <Navbar className=""></Navbar>
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          className="w-full md:w-1/2 border border-gray-200 rounded-md my-10 p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label className="" htmlFor="name">
              Full Name
            </Label>
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
                // pattern: {
                //   value:
                //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                //   message: `at least 8 characters\n
                //   - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                //   - Can contain special characters`,
                // },
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
                  value === formValues.password || "password does not matched",
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
            <Button className="w-full my-4">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Please Wait...
            </Button>
          ) : (
            <Button className="w-full my-4" type="Submit">
              Sign up
            </Button>
          )}
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
