import React from "react";
import { Label } from "../ui/label";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Contact, Mail, MoveLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const GetApplicant = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.applicant;
  const userProfileImage =
    user?.profile?.profilePhoto?.url || "https://github.com/shadcn.png";

 

  return (
    <div>
      <Navbar />
      {user ? (
        <div className="max-w-5xl min-h-[70vh] mx-auto bg-white  border border-gray-200 rounded-2xl my-5 p-8 relative">
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
                  +91 7060457474
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
            {user?.profile?.resume?.url != "" ? (
              <a
                href={user.profile.resume.url}
                target="_blank"
                className="text-blue-500 w-full hover:underline cursor-pointer"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center my-16 max-w-6xl mx-auto">
            <Button variant="outline" className="w-1/2" onClick={()=>navigate("/admin/jobs")}><MoveLeft className="mr-3"></MoveLeft>Back</Button>
            <h1 className="font-semibold text-blue-500 animate-bounce mt-10 text-3xl">No user Found !!!</h1>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GetApplicant;
