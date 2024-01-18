import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/users/Users";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/User";
import Product from "./pages/product/Product";

import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Subjects, { SingleSubject } from "./pages/subject/Subjects";
import Category from "./pages/category/Category";
import SingleExam from "./pages/exams/SingleExam";
import Exams from "./pages/exams/Exams";
import SingleCategory from "./pages/category/SingleCategory";
import Dashboard from "./endUsercomponents/subjects/Subjects";
import SubjectList from "./endUsercomponents/subjects/Subjects";
const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main ">
        <Navbar />
        <div className="grid grid-cols-6 gap-1  ">
          <div className="ml-2 overflow-y-auto col-span-1 top-5 h-screen  mt-5  ">
            <Menu />
          </div>
          <div className=" col-span-5 mr-4  ">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <SubjectList />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/exams",
          element: <Exams />,
        },
        {
          path: "/exams/:id",
          element: <SingleExam />,
        },
        {
          path: "/users/:id",
          element: <User />,
        },
        {
          path: "/products/:id",
          element: <Product />,
        },
        {
          path: "/subjects",
          element: <Subjects />,
        },
        {
          path: "subject/:id",
          element: <SingleSubject />,
        },
        {
          path: "/category",
          element: <Category />,
        },
        {
          path: "/examCategory/:id",
          element: <SingleCategory />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
