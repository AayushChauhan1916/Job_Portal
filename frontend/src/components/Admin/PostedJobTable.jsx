import UseGetALLPostedJobs from "@/hooks/UseGetALLPostedJobs";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useNavigate } from "react-router-dom";

const PostedJobTable = () => {
  const navigate = useNavigate();
  const jobs = useSelector((state) => state.adminjob.adminJobs);
  const searchJob = useSelector((state) => state.adminjob.searchJob);
  const [filterjobs, setJobs] = useState(jobs);

  useEffect(() => {
    const filteredCompany =
      jobs.length > 0 &&
      jobs.filter((job) => {
        if (!searchJob) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(searchJob.toLowerCase()) ||
          job?.company?.companyName
            .toLowerCase()
            .includes(searchJob.toLowerCase())
        );
      });
    setJobs(filteredCompany);
  }, [searchJob, jobs]);

  return (
    <div>
      <Table>
        <TableCaption>Jobs Posted By You</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterjobs.length>0 && filterjobs.map((job) => {
            return (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.companyName}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>
                  {new Date(job.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-30">
                      <div
                        className="flex justify-center items-center gap-4 cursor-pointer"
                        onClick={() => navigate(`/admin/job/${job?._id}/applicants`)}
                      >
                        <Eye size={20} />
                        <span>Applicant</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostedJobTable;
