import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import { getUserAppliedJob } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";

const AppliedJobTable = () => {
    const navigate = useNavigate()
  const application = useSelector(getUserAppliedJob);
 
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full mx-2 md:mx-0  mb-10 overflow-y-auto overflow-x-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2">Date</TableHead>
            <TableHead className="px-4 py-2">Job Role</TableHead>
            <TableHead className="px-4 py-2">Company</TableHead>
            <TableHead className="px-4 py-2 text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {application?.length <= 0 ? (
            <p className="font-semibold animate-pulse text-xl text-blue-500">You have Not Applied Any Job Yet</p>
          ) : (
            application?.map((job, idx) => {
            
              return (
                <TableRow  key={idx} className="cursor-pointer" onClick={()=>navigate(`/description/${job?.job?._id}`)}>
                  <TableCell className="px-4 py-2">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-4 py-2">{job?.job?.title}</TableCell>
                  <TableCell className="px-4 py-2">
                    {job?.job?.company?.companyName}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-right">
                    {job?.status == "accepted" ? (
                      <Badge className='bg-green-400'>Accepted</Badge>
                    ) : job?.status == "rejected" ? (
                      <Badge variant="destructive">Rejected</Badge>
                    ) : (
                      <Badge className='bg-gray-400'>Pending</Badge>
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
