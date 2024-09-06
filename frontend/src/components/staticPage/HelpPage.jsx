// HelpPage.js
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";

const HelpPage = () => {
  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
          Help & Support
        </h1>

        <div className="max-w-4xl w-full flex flex-col gap-10">
          {/* FAQ Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="group">
                <summary className="font-semibold text-lg cursor-pointer">
                  How do I reset my password?
                </summary>
                <p className="mt-2 text-gray-600">
                  To reset your password, go to the login page, click on "Forgot
                  Password," and follow the instructions.
                </p>
              </details>
              <details className="group">
                <summary className="font-semibold text-lg cursor-pointer">
                  How can I contact support?
                </summary>
                <p className="mt-2 text-gray-600">
                  You can contact support by emailing us at &nbsp;
                  <a
                    href="mailto:aayushchauhan1916@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    click here
                  </a>
                  .
                </p>
              </details>
              <details className="group">
                <summary className="font-semibold text-lg cursor-pointer">
                  How do I track application status?
                </summary>
                <p className="mt-2 text-gray-600">
                  To track your application status, visit the "Profile Section"
                  in the Navbar.
                </p>
              </details>
            </div>
          </div>

          {/* Support Information Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-4">Additional Support</h2>

            <p className="text-gray-600 mb-4">
              Follow us on our social media platforms for updates and tips:
            </p>
            <div className="flex gap-4 text-2xl text-gray-600 justify-center items-center">
              <a
                href="https://www.linkedin.com/in/aayush-chauhan1916/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                <Linkedin className="w-8 h-8"/>
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <Twitter className="w-8 h-8"/>
              </a>
              <a
                href="https://www.instagram.com/nishkarsh.rajput/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-600 transition-colors"
              >
                <Instagram className="w-8 h-8"/>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default HelpPage;
