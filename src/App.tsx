import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./pages/users/Users";

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
import { useDispatch } from "react-redux";
import Questions from "./pages/questions/Questions";
import SingleSubject from "./pages/subject/SingleSubject";
import { useEffect, useState } from "react";
import SignUp from "./pages/login/Register";
import {
  access_token,
  authActions,
  refresh_token,
} from "./redux/authenticationSlice";
import Layout from "./Layout";
import PageNotFound from "./pages/PagesNotFund";
import { getNewAccessToken } from "./api/APIService";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function App() {
  const dispatch = useDispatch()
  const refresh = async () => {
    if (!refresh_token) {
      console.log("Loggin again");
      window.location.href = "/login";
    }
    if (!access_token) {
      await getNewAccessToken().then((res) => {
        console.log("Refresh token on working ", res.data.access_token);
        Cookies.set("access_token", res.data.access_token);
        const user = jwtDecode(res.data.access_token)?.sub;
        dispatch(
          authActions.loginSuccess({
            user: user,
            accessToken: res.data.access_token,
          })
        );
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(refresh, 100000);
    return () => clearInterval(interval);
  }, []);

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
      path: `${slugs.LOGIN}/${slugs.SIGNUP}`,
      element: <SignUp />,
    },
    {
      path: `*`,
      element: <PageNotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
