import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const ListedJobs = ({ job }) => {
  const navigate = useNavigate();
  const calculateDayAgo = (mongoDbTime) => {
    const mongoTime = new Date(mongoDbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - mongoTime;
    const perfectDay = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
    return perfectDay;
  };

  const jobPostedDate = calculateDayAgo(job.createdAt);

  const cardImage = job?.company?.logo?.url || "https://github.com/shadcn.png"

  return (
    <div className="flex flex-col p-5 rounded-md shadow-xl bg-white border-gray-200 max-w-xs h-[340px]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {jobPostedDate === 0 ? (
            <span>Today</span>
          ) : (
            <span>{jobPostedDate} day ago</span>
          )}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button size="icon" variant="outline" className="p-6">
          <Avatar className="cursor-pointer">
            <AvatarImage src={cardImage} alt="@shadcn" />
          </Avatar>
        </Button>
        <div className="flex-1">
          <h1 className="font-md text-lg line-clamp-1 overflow-hidden">{job?.company?.companyName}</h1>
          <p className="text-sm text-gray-500">{job.location}</p>
        </div>
      </div>
      <div className="flex-1">
        <h1 className="font-bold text-lg my-2 line-clamp-1 overflow-hidden">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Badge className={`text-blue-700 font-bold`} variant="ghost">
          {job?.position}
        </Badge>
        <Badge className={`text-[#F83002] font-bold`} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={`text-[#7209b7] font-bold`} variant="ghost">
          {job.salary} CTC
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${job._id}`)}
        >
          Details
        </Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
};

export default ListedJobs;
