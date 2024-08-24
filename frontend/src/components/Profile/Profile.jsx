import React, { useEffect, useState } from "react";
import Navbar from "../utils/Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import AppliedJobTable from "./AppliedJobTable";
import Footer from "../utils/Footer";
import UpdateProfileDailog from "./UpdateProfileDailog";
import { useSelector } from "react-redux";
import { getUser } from "@/redux/authSlice";
import UseGetUserAppliedJob from "@/hooks/UseGetUserAppliedJob";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  UseGetUserAppliedJob();
  const [editOpen, setEditOpen] = useState(false);
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const userProfileImage =
    user?.profile?.profilePhoto?.url || "https://github.com/shadcn.png";

  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast.error("please login first");
    }else if(user.role != "student"){
      toast.error("page does not exists");
      navigate("/")
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 relative">
        <div className="flex flex-col md:flex-row items-center gap-4 ">
          <Avatar className="cursor-pointer h-24 w-24">
            <AvatarImage src={userProfileImage} alt="@shadcn" />
          </Avatar>
          <div className="flex flex-col">
            <h1 className="font-medium text-xl self-center md:self-start">
              {user?.fullName}
            </h1>
            <p className="text-gray-700 text-sm self-center">
              {user?.profile?.bio}
            </p>
          </div>
          <Button
            onClick={() => {
              setEditOpen(true);
            }}
            className="md:ml-auto mr-0"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-4">
          <div className="flex items-start gap-3  my-2">
            <Mail className="hidden md:block" />
            <a href={`mailto:${user?.email}`}>{user?.email}</a>
          </div>

          <div className="flex items-start gap-3 my-2">
            <Contact className="hidden md:block" />
            <p>
              <a href="tel:+91 7060457474" className="">
                {user?.phoneNumber}
              </a>
            </p>
          </div>
          <div>
            <h1>Skills</h1>
            <div className="flex items-center gap-2">
              {user?.profile?.skills?.length != 0 ? (
                user?.profile?.skills.map((item, idx) => {
                  return (
                    <Badge className="cursor-pointer" key={idx}>
                      {item}
                    </Badge>
                  );
                })
              ) : (
                <span>Not Applicable</span>
              )}
            </div>
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label className="text-md font-bold">Resume</Label>
          {user?.profile?.resume?.url ? (
            <a
              href={user.profile.resume.url}
              target="_blank"
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user.profile.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl">
        <h1 className="text-bold text-center text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDailog editOpen={editOpen} setEditOpen={setEditOpen} />
      <Footer></Footer>
    </div>
  );
};

export default Profile;
