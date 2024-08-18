import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronDown } from "lucide-react"; // Ensure you have this package installed
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setSearchJobQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Pune", "Banglore", "Mumbai", "Noida","Indore"],
  },
  {
    filterType: "Industry",
    array: ["FrontEnd", "BackEnd", "Data Science"],
  },
  {
    filterType: "Salary",
    array: ["1-3 Lakh", "3-5 Lakh", "5-10 Lakh", "10-20 Lakh","20-90 Lakh"],
  },
];

const FilterCard = () => {
  const [openFilter, setOpenFilter] = useState(null);
  const dispatch = useDispatch();

  const handleToggle = (filterType) => {
    setOpenFilter(openFilter === filterType ? null : filterType);
  };

  const handleFilterValue = (value) => {
    const salaryMap = {
      "1-3 Lakh": "100000-300000",
      "3-5 Lakh": "300001-500000",
      "5-10 Lakh": "500001-1000000",
      "10-20 Lakh": "1000001-2000000",
      "20-90 Lakh": "2000001-9000000",
    };
    const mappedValue = salaryMap[value] || value;
    dispatch(setSearchJobQuery(mappedValue));
  };

  return (
    <div className="w-full bg-white rounded-md p-4">
      <h1 className="font-bold text-lg mb-3 sm:text-xl">Filter Jobs</h1>
      <hr className="mb-3" />
      <div className="space-y-4">
        {filterData.map((data, idx) => (
          <div key={idx}>
            <Button
              variant="outline"
              size="icon"
              className="flex items-center font-bold text-lg sm:text-xl w-full text-left"
              onClick={() => handleToggle(data.filterType)}
            >
              {data.filterType}
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform ${
                  openFilter === data.filterType ? "rotate-180" : ""
                }`}
              />
            </Button>
            {openFilter === data.filterType && (
              <RadioGroup
                onValueChange={handleFilterValue}
                className="space-y-2 mt-2"
              >
                {data.array.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 my-2">
                    <RadioGroupItem value={item} />
                    <Label>{item}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;
