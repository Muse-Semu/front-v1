import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Users from "./pages/users/Users";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import Product from "./pages/product/Product";

import "./index.css";
import Subjects from "./pages/subject/Subjects";
import SingleExam from "./pages/exams/SingleExam";
import Exams from "./pages/exams/Exams";
import SubjectList from "./endUsercomponents/subjects/Subjects";
import SingleUser from "./pages/users/SingleUser";
import { slugs } from "./constant";
import ExamCategory from "./pages/category/ExamCategory";
import SingleExamCategory from "./pages/category/SingleExamCategory";
import { useDispatch, useSelector } from "react-redux";
import Questions from "./pages/questions/Questions";
import SingleSubject from "./pages/subject/SingleSubject";
import { useEffect } from "react";
import Home from "./pages/home/Home";
import { access_token, refresh_token } from "./service/localStorage";

function App() {
  const currentUser = useSelector((state: any) => state.authentication.user);
  const authenticated = useSelector(
    (state: any) => state.authentication.isAuthenticated
  );
  const access_token = useSelector(
    (state: any) => state.authentication.access_token
  );
  const dispatch = useDispatch();
  console.log(currentUser, authenticated);

  const acess = localStorage.getItem("access_token");

  console.log("Access token", acess);

  const ProtectedRoute = ({ role }) => {
    if (!authenticated) {
      return <Navigate to="/login" replace={true} />;
    }
    else if(authenticated) {
      return <Outlet />;
    }
  };

  const Layout = () => {
    return (
      <div className="main ">
        <Navbar user={currentUser} />

        <div className="grid grid-cols-6 gap-1  ">
          <div className="ml-2  col-span-1 top-5 mt-5 h-screen ">
            <Menu />
          </div>
          <div className=" col-span-5 mr-4 mt-3  ">
            <ProtectedRoute role={currentUser?.role} />
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
          path: `${slugs.USER}/`,
          element: <Users />,
        },
        {
          path: `${slugs.USER}/:id`,
          element: <SingleUser />,
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
    {
      path: "/register",
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
