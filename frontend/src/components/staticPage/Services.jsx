import React from 'react';
import Footer from '../utils/Footer';
import Navbar from '../utils/Navbar';

const Services = () => {
  return (
    <div>
        <Navbar/>
         <div className="services-container bg-gray-50 py-16 px-8 md:px-16">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">Our Services</h1>
      
      {/* Services for Job Seekers */}
      <section className="service-section mb-16">
        <div className="service-content">
          <h2 className="text-3xl font-semibold text-blue-600 mb-4">For Job Seekers</h2>
          <p className="text-lg text-gray-700 mb-6">
            At JobGenie, we provide a comprehensive suite of services to assist job seekers in finding the right opportunities effortlessly.
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-3">
            <li><strong>Job Search:</strong> Explore a wide range of job listings tailored to your skills and preferences.</li>
            <li><strong>Resume Upload:</strong> Apply quickly with an easy resume upload feature.</li>
            <li><strong>Personalized Recommendations:</strong> Get job suggestions based on your profile and interests.</li>
            <li><strong>Skill Showcase:</strong> Highlight your key skills to stand out to employers.</li>
            <li><strong>Application Tracking:</strong> Monitor the status of your job applications in real-time.</li>
          </ul>
        </div>
      </section>

      {/* Services for Recruiters */}
      <section className="service-section mb-16">
        <div className="service-content">
          <h2 className="text-3xl font-semibold text-blue-600 mb-4">For Recruiters</h2>
          <p className="text-lg text-gray-700 mb-6">
            JobGenie simplifies the recruitment process, helping you connect with the best talent in the market.
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-3">
            <li><strong>Job Posting:</strong> Reach thousands of potential candidates with easy job postings.</li>
            <li><strong>Applicant Management:</strong> Manage your applicants efficiently with our intuitive dashboard.</li>
            <li><strong>Candidate Search:</strong> Access a vast database of resumes to find your ideal hire.</li>
            <li><strong>Company Branding:</strong> Enhance your employer brand to attract top talent.</li>
           
          </ul>
        </div>
      </section>

      
    </div>
    <Footer/>
    </div>
   
  );
};

export default Services;
