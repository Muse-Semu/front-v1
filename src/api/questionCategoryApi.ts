import { baseUrl } from "./http-common";
import useAuthStore from "@/redux/authenticationSlice";

const { accessToken, refreshToken }: any = useAuthStore.getState();

//********************** QUESTION_CATEGORY ********************** //

// Get all exam_category list
export const getQuestionCategory = async () => {
  return await baseUrl
    .get("/question/category", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
};

// Get single question_category by Id
export const getQuestionCategoryById = async (id: number) => {
  return await baseUrl.get(`/question_category/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

// Add new QuestionCategory
export const addQuestionCategory = async (data: {}) => {
  return await baseUrl.post("/question_category", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

// Delete QuestionCategory
export const deleteQuestionCategory = async (categoryId: number) => {
  return await baseUrl.delete(`/question_category/delete/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};
export const updateQuestionCategory = async (categoryId: number, data: {}) => {
  return await baseUrl.put(`/question_category/update/${categoryId}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};
