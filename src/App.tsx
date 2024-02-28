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
import { useDispatch, useSelector } from "react-redux";
import Questions from "./pages/questions/Questions";
import SingleSubject from "./pages/subject/SingleSubject";
import { useEffect, useState } from "react";
import SignUp from "./pages/login/Register";
// import {
//   access_token,
//   authActions,
//   refresh_token,
// } from "./redux/authenticationSlice";
import Layout from "./Layout";
import PageNotFound from "./pages/PagesNotFund";
import { generateToken} from "./api/authApi";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import useAuthStore, { accountData, accountStatus } from "./redux/authenticationSlice";
import { getUserDetail } from "./api/userApi";

function App() {
  const {accessToken,refreshToken,refreshTokenSuccess,account,user,userData} = useAuthStore.getState();
  const refresh = async () => {
    if (!refreshToken) {
      console.log("Loggin again");
      window.location.href = "/login";
    }
    if (!accessToken) {
      await generateToken().then((res) => {
        console.log("Refresh token on working ", res.data.access_token);
        refreshTokenSuccess(res.data.access_token);
        account(user);
      });
    }
  };

   useEffect(() => {
     if (accessToken) {
       getUserDetail(user, accessToken).then((res) => {
         account(res.data);
         console.log("Token", userData);
       });
     }
   }, [accessToken]);

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
