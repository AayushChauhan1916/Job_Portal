import React from "react";
import { Badge } from "@/components/ui/badge";
import { Ghost } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";

const LatestJobsCard = ({ job }) => {
  const cardImage = job?.company?.logo?.url || "https://github.com/shadcn.png";
  return (
    <Link to={`description/${job._id}`}>
      <div className="flex flex-col p-5 rounded-md shadow-lg hover:shadow-2xl bg-white border border-gray-100 cursor-pointer m-2 min-h-[230px]">
        <div className="flex items-center gap-2 my-2">
          <Button size="icon" variant="outline" className="p-6">
            <Avatar className="cursor-pointer">
              <AvatarImage src={cardImage} alt="@shadcn" />
            </Avatar>
          </Button>
          <div>
            <h1 className="font-md text-lg">{job?.company?.companyName}</h1>
            <p className="text-sm text-gray-500">{job?.location}</p>
          </div>
        </div>
        <div className="flex-grow">
          <h1 className="font-bold text-lg my-2">{job?.title}</h1>
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
      </div>
    </Link>
  );
};

export default LatestJobsCard;
