import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchJobQuery } from "@/redux/jobSlice";

const category = [
  "FrontEnd Developer",
  "BackEnd Developer",
  "Data Science",
  "Graphic Designer",
  "Full Stack Developer",
  "AI & ML",
  "Data Analyst",
  "Human Resource",
  "Django Developer",
  "Software Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchJobQuery(query));
    navigate("/browse");
  };

  return (
    <div className="relative w-full">
      <Carousel className="w-full max-w-4xl mx-auto my-8">
        <CarouselContent>
          {category.map((cat, idx) => (
            <CarouselItem
              className=" sm:basis-1/2 md:basis-1/3 lg:basis-1/4 p-2"
              key={idx}
            >
              <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="w-full rounded-full">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-2 transform  z-10" />
        <CarouselNext className="absolute top-1/2 right-2 transform  z-10  " />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
