import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { getAllCompanies } from "@/redux/companySlice";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const companies = useSelector(getAllCompanies);
  const navigate = useNavigate();
  const filterCompanyName = useSelector((state)=>state.company.filterCompanyName);
  const [filterCompany , setfilterCompany] = useState(companies);

  useEffect(()=>{
    const filteredCompany = companies.length>0 && companies.filter((company)=>{
      if(!filterCompanyName){
        return true;
      }
      return company?.companyName?.toLowerCase().includes(filterCompanyName.toLowerCase());
    })
    setfilterCompany(filteredCompany)
  },[filterCompanyName,companies])

  return (
    <div>
      <Table>
        <TableCaption>Companies Registered By You</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { filterCompany.length>0 && filterCompany?.map((company) => {
            return (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={
                        company?.logo?.url
                          ? company?.logo?.url
                          : " https://github.com/shadcn.png"
                      }
                      alt="@shadcn"
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{company?.companyName}</TableCell>
                <TableCell>{new Date(company.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-30">
                      <div
                        className="flex justify-center items-center gap-4 cursor-pointer"
                        onClick={() =>
                          navigate(`/admin/edit/company/${company?._id}`)
                        }
                      >
                        <Edit2 size={20} />
                        <span>Edit</span>
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

export default CompaniesTable;
