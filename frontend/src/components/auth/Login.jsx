import React, { useEffect, useState } from "react";
import Navbar from "../utils/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { getLoading, getUser, setAuthUser } from "@/redux/authSlice";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [role, setRole] = useState("student");
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const [verified, setVerified] = useState(false);

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
    data.role = role;
    dispatch(setLoading(true));
    try {
      const response = await fetch(`/api/user/login`, {
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
        dispatch(setAuthUser(responseData.user));
        navigate("/");
      } else if (responseData.isSend == true) {
        setVerified(true);
        reset();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error.message || error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex items-center justify-center lg:w-7xl max-w-7xl mx-auto px-4">
        <form
          className="w-full md:w-1/2 border border-gray-200 rounded-md my-10 p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              className="mt-1"
              type="email"
              name="email"
              placeholder="Email"
              {...register("email", {
                required: "email missing",
                pattern: {
                  value:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="my-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                className="mt-1 focus-visible:ring-offset-0"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <Link
                to="/forgot-password"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 text-sm"
              >
                Forgot?
              </Link>
            </div>
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between my-5">
            <RadioGroup
              className="flex items-center justify-between gap-4"
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
          {verified && (
            <div className="h-10 mb-2 bg-red-400 flex items-center justify-center rounded-md text-white">
              <p className="font-semibold">
                A verification link has been sent to your email.
              </p>
            </div>
          )}
          {isLoading ? (
            <Button className="w-full my-4">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Please Wait...
            </Button>
          ) : (
            <Button className="w-full my-4" type="Submit">
              Login
            </Button>
          )}

          <span className="text-sm">
            Don't have an account?
            <Link to="/signup" className="text-blue-600 ml-1 animate-pulse">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
