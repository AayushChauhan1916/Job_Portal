import React from "react";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 ">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          {/* Company Info */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">Job Genie</h3>
            <p className="text-gray-400 max-w-sm">
              Helping you find the best job opportunities in the industry. Join
              us to take your career to the next level.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400">
              Email:{" "}
              <a
                href="mailto:aayushchauhan1916@gmail.com"
                className="text-blue-400 hover:underline"
              >
                aayushchauhan1916@gmail.com
              </a>
            </p>
            <p className="text-gray-400">
              Phone:{" "}
              <a
                href="tel:+91 7060457474"
                className="text-blue-400 hover:underline"
              >
                +91 7060457474
              </a>
            </p>
          </div>

          {/* Useful Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Useful Links</h3>
            <ul className="text-gray-400">
              <li className="mb-2">
                <Link
                  to="/aboutus"
                  className="hover:text-white"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/services"
                  className="hover:text-white"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Services
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/help"
                  className="hover:text-white"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center justify-center md:justify-start gap-4">
            <a
              href="https://github.com/AayushChauhan1916"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500"
            >
              <Github className="w-8 h-8" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400"
            >
              <Twitter className="w-8 h-8" />
            </a>
            <a
              href="https://www.linkedin.com/in/aayush-chauhan1916/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-700"
            >
              <Linkedin className="w-8 h-8" />
            </a>
            <a
              href="https://www.instagram.com/nishkarsh.rajput/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500"
            >
              <Instagram className="w-8 h-8" />
            </a>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Job Genie. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
