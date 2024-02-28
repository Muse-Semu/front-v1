import { baseUrl } from "./http-common";
import useAuthStore from "@/redux/authenticationSlice";

const { accessToken, refreshToken }: any = useAuthStore.getState();

// ********************** QUESTION ********************** //

// Add new question
export const addQuestion = (data: {}) => {
  return baseUrl.post(`/question`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};
// Get question
export const getQuestions = () => {
  return baseUrl.get("/question", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};
// Get single questiob
export const getQuestionById = (id: number) => {
  return baseUrl.get(`/question/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

// Update the question
export const updateQuestion = (id: number, data: {}) => {
  return baseUrl.put(`/question/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

export const deleteQuestion = (id: number) => {
  return baseUrl.delete(`/question/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};
