import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, Menu, User2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setLogout } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfileImage =
    user?.profile?.profilePhoto?.url || "https://github.com/shadcn.png";

  const handleLogout = async () => {
    try {
      const response = await fetch(`/api/user/logout`, {
        method: "GET",
        credentials: "include",
      });
      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData.message);
        dispatch(setLogout());
        navigate("/");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error?.message || error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-white sticky top-0 z-50 shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">
            Job<span className="text-[#F83662]">Genie</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex font-medium items-center gap-5">
            {user && user?.role == "recruiter" ? (
              <>
                <li className="cursor-pointer">
                  <Link to="/admin/company">Companies</Link>
                </li>
                <li className="cursor-pointer">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li className="cursor-pointer">
                  <Link to="/">Home</Link>
                </li>
                <li className="cursor-pointer">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="cursor-pointer">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={userProfileImage} alt="@shadcn" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 sm:w-80">
                <div className="flex items-center gap-4 p-4">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={userProfileImage} alt="@shadcn" />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user?.fullName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col p-4 gap-2">
                  {user?.role == "student" && (
                    <Link to="/profile">
                      <Button
                        variant="link"
                        className="flex items-center gap-2"
                      >
                        <User2 />
                        View Profile
                      </Button>
                    </Link>
                  )}

                  <Link>
                    <Button
                      variant="link"
                      className="flex items-center gap-2"
                      onClick={handleLogout}
                    >
                      <LogOut />
                      Logout
                    </Button>
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <SideMenu isOpen={menuOpen} toggleMenu={toggleMenu} user={user} />
    </div>
  );
};

const SideMenu = ({ isOpen, toggleMenu, user }) => {
  // const user = useSelector(getUser);
  const dispatch2 = useDispatch();
  const navigate2 = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch(`/api/user/logout`, {
        method: "GET",
        credentials: "include",
      });
      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData.message);
        dispatch2(setLogout());
        navigate2("/");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error?.message || error);
    }
  };
  return (
    <div
      className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={toggleMenu}
    >
      <div
        className={`fixed left-0 top-0 h-full bg-white w-72 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold">
            Job<span className="text-[#F83662]">Genie</span>
          </h1>
          <button onClick={toggleMenu} className="focus:outline-none">
            <X size={24} />
          </button>
        </div>
        <ul className="flex flex-col gap-4 p-4">
          {user && user?.role == "recruiter" ? (
            <>
              {" "}
              <li className="cursor-pointer">
                <Link to="/admin/company">Companies</Link>
              </li>
              <li className="cursor-pointer">
                <Link to="/admin/jobs">Jobs</Link>
              </li>
            </>
          ) : (
            <>
              <li className="cursor-pointer">
                <Link to="/">Home</Link>
              </li>
              <li className="cursor-pointer">
                <Link to="/jobs">Jobs</Link>
              </li>
              <li className="cursor-pointer">
                <Link to="/browse">Browse</Link>
              </li>
            </>
          )}

          {user ? (
            <div className="flex flex-col gap-2">
              {user?.role == "student" && (
                <Link to="/profile">
                  <Button variant="link" className="flex items-center gap-2">
                    <User2 />
                    View Profile
                  </Button>
                </Link>
              )}
              <Link>
                <Button
                  variant="link"
                  className="flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut />
                  Logout
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
