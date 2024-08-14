import React, { useState } from "react";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setAuthUser } from "@/redux/authSlice";
import uploadImage from "@/helper/UploadImage";
import { toast } from "sonner";

const UpdateProfileDailog = ({ editOpen, setEditOpen }) => {
  const [isLoading, setLoading] = useState(false);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [resume, setResume] = useState();

  const MAX_FILE_SIZE = 1048576;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleResume = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      setResume(null);
      toast.success("File size too large. Maximum is 1MB.");
    } else {
      setResume(file);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let resumeUrl;
      if (resume) {
        resumeUrl = await uploadImage(resume);
        if (resumeUrl.secure_url) {
          let resumeResponse = {
            url: resumeUrl.secure_url,
            public_id: resumeUrl.public_id,
          };
          data.resume = resumeResponse;
        } else {
          toast.error(resumeUrl.message);
          return;
        }
      }

      const response = await fetch(`/api/user/update`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (responseData.success) {
        dispatch(setAuthUser(responseData.user));
        toast.success(responseData.message);
        setEditOpen(false);
        reset();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
      reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={editOpen}>
        <DialogContent
          onInteractOutside={() => {
            setEditOpen(false);
          }}
        >
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Please update your profile information below.
          </DialogDescription>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Label className="mb-1" htmlFor="fullName">
              Full Name
            </Label>
            <Input
              className="col-span-3"
              id="fullName"
              type="text"
              placeholder={user?.fullName}
              {...register("fullName")}
            />
            <Label className="mb-1" htmlFor="email">
              Email
            </Label>
            <Input
              className="col-span-3"
              id="email"
              type="text"
              placeholder={user?.email}
              {...register("email")}
            />
            <Label className="mb-1" htmlFor="number">
              number
            </Label>
            <Input
              className="col-span-3"
              id="number"
              type="text"
              placeholder={user?.phoneNumber}
              {...register("number")}
            />
            <Label className="mb-1" htmlFor="bio">
              bio
            </Label>
            <Input
              className="col-span-3"
              id="bio"
              type="text"
              placeholder={user?.profile?.bio}
              {...register("bio")}
            />
            <Label className="mb-1" htmlFor="skills">
              skills
            </Label>
            <Input
              className="col-span-3"
              id="skills"
              type="text"
              placeholder={user?.profile?.skills || "html,CSS,Java"}
              {...register("skills")}
            />
            <div className="text-[12px] text-red-500">
              *please separate skill with ","
            </div>
            <Label className="mb-1" htmlFor="resume">
              {user?.profile?.resume?.url
                ? "Change Resume"
                : "Upload Your Resume"}
            </Label>
            <Input
              className="col-span-3 cursor-pointer"
              id="resume"
              type="file"
              accept="application/pdf"
              onChange={handleResume}
            />
            <DialogFooter>
              {isLoading ? (
                <Button className="w-full my-4">
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Please
                  Wait...
                </Button>
              ) : (
                <Button className="w-full my-4" type="Submit">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDailog;
