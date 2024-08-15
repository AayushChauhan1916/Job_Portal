import React, { useState } from "react";
import {
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TableBody } from "@mui/material";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Loader2, MoreHorizontal, Pen } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const shortlisting = ["Accepted", "Rejected"];

const ApplicantTable = ({ isStatusChange, setStatusChange }) => {
  const [statusLoading, setStatusLoading] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const navigate = useNavigate();

  const applicants = useSelector((state) => {
    return state.application.applicants;
  });

  const statusHandler = async (status, id) => {
    setStatusLoading(true);
    setCurrentItemId(id);
    try {
      const res = await fetch(
        `/api/application/status/${id}/update`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      const resData = await res.json();
      if (resData.success) {
        toast.success(resData.message);
        setStatusChange(!isStatusChange);
      } else {
        throw new Error(resData.message || "Failed to fetch applicants");
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setStatusLoading(false);
      setCurrentItemId(null);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>
          {applicants?.length > 0 ? (
            "A List of Applied Users"
          ) : (
            <h1 className="font-bold text-2xl animate-bounce text-blue-500">
              No Applicant
            </h1>
          )}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.length > 0 &&
            applicants?.map((item, idx) => {
              return (
                <TableRow className="cursor-pointer" key={idx}>
                  <TableCell
                    onClick={() =>
                      navigate("/admin/get/applicant", {
                        state: { applicant: item?.applicant },
                      })
                    }
                  >
                    {item?.applicant?.fullName}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate("/admin/get/applicant", {
                        state: { applicant: item?.applicant },
                      })
                    }
                  >
                    {item?.applicant?.email}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate("/admin/get/applicant", {
                        state: { applicant: item?.applicant },
                      })
                    }
                  >
                    {item?.applicant?.phoneNumber}
                  </TableCell>
                  <TableCell>
                    <a
                      className="text-blue-600"
                      target="_blank"
                      href={item?.applicant?.profile?.resume?.url}
                    >
                      {item?.applicant?.profile?.resume?.url
                        ? "Resume"
                        : "No Resume"}
                    </a>
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate("/admin/get/applicant", {
                        state: { applicant: item?.applicant },
                      })
                    }
                  >
                    {new Date(item?.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {statusLoading && currentItemId === item._id ? (
                      <Loader2 className="animate-spin"></Loader2>
                    ) : (
                      <>
                        {item?.status === "pending" ? (
                          <div className="relative">
                            <Popover>
                              <PopoverTrigger>
                                <div className="flex items-center gap-2">
                                  <h1 className="font-semibold">Pending</h1>
                                  <Pen
                                    size={22}
                                    className="cursor-pointer"
                                    
                                  />
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-32">
                                {shortlisting?.map((status, idx) => {
                                  return (
                                    <div
                                      onClick={() =>
                                        statusHandler(status, item._id)
                                      }
                                      key={idx}
                                      className="flex w-fit items-center justify-center my-2 cursor-pointer"
                                    >
                                      <span className="border-b-2">
                                        {status}
                                      </span>
                                    </div>
                                  );
                                })}
                              </PopoverContent>
                            </Popover>
                          </div>
                        ) : (
                          <>
                            {item?.status === "accepted" ? (
                              <p className="font-semibold text-green-500">
                                Accepted
                              </p>
                            ) : (
                              <p className="font-semibold text-red-500">
                                Rejected
                              </p>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantTable;
