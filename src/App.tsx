import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/users/Users";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import Product from "./pages/product/Product";

import "./index.css";
import { QueryClient } from "@tanstack/react-query";
import Subjects, { SingleSubject } from "./pages/subject/Subjects";
import SingleExam from "./pages/exams/SingleExam";
import Exams from "./pages/exams/Exams";
import SubjectList from "./endUsercomponents/subjects/Subjects";
import SingleUser from "./pages/users/SingleUser";
import { slugs } from "./constant";
import ExamCategory from "./pages/category/ExamCategory";
import SingleExamCategory from "./pages/category/SingleExamCategory";
import { useSelector } from "react-redux";
import Questions from "./pages/questions/Questions";

function App() {
  const box = useSelector((state)=>state.box.isOpen)
  const Layout = () => {
    return (
      <div className="main ">
        <Navbar />
       
        <div className="grid grid-cols-6 gap-1  ">
          <div className="ml-2  col-span-1 top-5 mt-5 h-screen ">
            <Menu />
          </div>
          <div className=" col-span-5 mr-4 mt-3  ">
            <Outlet />
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
          path: `${slugs.EXAM}/`,
          element: <Exams />,
        },
        {
          path: `/${slugs.EXAM}/:id`,
          element: <SingleExam />,
        },
        {
          path: `/${slugs.USER}/:id`,
          element: <SingleUser />,
        },
        {
          path: "/products/:id",
          element: <Product />,
        },
        {
          path: `/${slugs.SUBJECT}`,
          element: <Subjects />,
        },
        {
          path: `/${slugs.SUBJECT}/:id`,
          element: <SingleSubject />,
        },
        {
          path: `/${slugs.EXAM_CATEGORY}`,
          element: <ExamCategory />,
        },
        {
          path: `/${slugs.EXAM_CATEGORY}/:id`,
          element: <SingleExamCategory />,
        },
        {
          path: `/${slugs.EXAM}/:id/${slugs.QUESTION}`,
          element: <Questions />,
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
