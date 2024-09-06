import React from "react";
import Navbar from "../utils/Navbar";
import { Link } from "react-router-dom";
import { WineOff } from "lucide-react";
import Footer from "../utils/Footer";

const AboutUs = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="about-us-container bg-gray-50 p-8 md:p-16">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          About Us - JobGenie
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to <strong>JobGenie</strong>, your trusted companion in
          navigating the job market! At JobGenie, we believe that finding the
          perfect job shouldn't be a daunting task but an exciting journey
          toward achieving your career aspirations. Our platform is designed to
          connect talented individuals with leading companies, making job
          hunting seamless, efficient, and accessible.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-8 mb-4">
          Our Mission
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Our mission is to empower job seekers and recruiters alike by
          providing a dynamic and user-friendly platform that simplifies the
          hiring process. We aim to bridge the gap between employers and job
          seekers, fostering connections that lead to meaningful employment
          opportunities.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-8 mb-4">
          What We Offer
        </h2>
        <div className="mb-4">
          <h3 className="text-xl font-medium text-blue-500">For Job Seekers</h3>
          <p className="text-lg text-gray-700">
            Whether you're just starting your career or looking for a new
            challenge, JobGenie is here to help you find the right fit. Explore
            thousands of job listings, filter opportunities by salary, location,
            and industry, and apply directly with ease. Our platform also allows
            you to upload your resume, showcase your skills, and stay updated
            with the latest job openings.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-medium text-blue-500">For Recruiters</h3>
          <p className="text-lg text-gray-700">
            Finding the right talent can be a challenge, but not with JobGenie.
            Post your job openings, manage applications, and connect with
            potential candidates all in one place. Our streamlined recruitment
            process saves you time and effort, allowing you to focus on what
            truly matters—building your dream team.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-blue-600 mt-8 mb-4">
          Why Choose JobGenie?
        </h2>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
          <li>
            <strong>User-Centric Design:</strong> We prioritize your experience.
            Our intuitive platform is designed to be easy to navigate, making
            your job search or recruitment process hassle-free.
          </li>
          <li>
            <strong>Tailored Recommendations:</strong> Receive job suggestions
            or candidate matches that align with your specific needs and
            preferences.
          </li>
          <li>
            <strong>Secure & Trustworthy:</strong> We value your privacy and
            security. Our platform ensures that your personal information is
            protected at all times.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-600 mt-8 mb-4">
          Our Vision
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          We envision a world where job seekers find not just employment, but
          fulfillment. At JobGenie, we are committed to creating a positive
          impact by helping individuals discover opportunities that align with
          their skills, values, and goals. We strive to be the leading job
          portal that not only connects people with jobs but also inspires them
          to pursue their passions.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mt-8 mb-4">
          Join Us on This Journey
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Whether you're a job seeker or a recruiter, JobGenie is here to guide
          you every step of the way. Join our growing community and let us be
          your trusted partner in the job search journey.
        </p>

      </div>
      <Footer/>
    </div>
  );
};

export default AboutUs;
