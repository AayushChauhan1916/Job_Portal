import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import Browse from "../components/Browse/Browse";
import Home from "@/components/Home/Home";
import Jobs from "@/components/Jobs/Jobs";
import Profile from "@/components/Profile/Profile";
import { createBrowserRouter } from "react-router-dom";
import JobDescription from "@/components/DescriptionJob/JobDescription";
import AdminCompany from "@/components/Admin/AdminCompany";
import RegisterCompany from "@/components/Admin/RegisterCompany";
import EditCompany from "@/components/Admin/EditCompany";
import PostedJobs from "@/components/Admin/PostedJobs";
import PostJob from "@/components/Admin/PostJob";
import Applicant from "@/components/Admin/Applicant";
import GetApplicant from "@/components/Admin/GetApplicant";
import ProtectedRoutes from "@/components/Admin/ProtectedRoutes";
import PageNotFound from "@/components/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/admin/company",
    element: (
      <ProtectedRoutes>
        <AdminCompany />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/register/company",
    element: (
      <ProtectedRoutes>
        <RegisterCompany />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/edit/company/:id",
    element: (
      <ProtectedRoutes>
        <EditCompany />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoutes>
        <PostedJobs />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/post/job",
    element: (
      <ProtectedRoutes>
        <PostJob />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/job/:id/applicants",
    element: (
      <ProtectedRoutes>
        <Applicant />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/admin/get/applicant",
    element: (
      <ProtectedRoutes>
        <GetApplicant />
      </ProtectedRoutes>
    ),
  },
  {
    path: "*", // Catch-all route for undefined paths
    element: <PageNotFound />,
  },
]);

export default router;