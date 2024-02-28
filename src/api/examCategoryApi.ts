import { baseUrl } from "./http-common";
import useAuthStore from "@/redux/authenticationSlice";

// ********************** EXAMS **************************************** //
const { accessToken, refreshToken }: any = useAuthStore.getState();

//********************** EXAM_CATEGORY ********************** //

// Get all exam_category list
export const getExamCategory = async () => {
  return await baseUrl
    .get("/exam_category", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
};

// Get single exam_category by Id
export const getExamCategoryById = async (id: any) => {
  return await baseUrl.get(`/exam_category/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

// Add new ExamCategory
export const addExamCategory = async (data: {}) => {
  return await baseUrl.post("/exam_category", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

// Delete ExamCategory
export const deleteExamCategory = async (categoryId: number) => {
  return await baseUrl.delete(`/exam_category/delete/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};
export const updateExamCategory = async (categoryId: number, data: {}) => {
  return await baseUrl.put(`/exam_category/update/${categoryId}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};
