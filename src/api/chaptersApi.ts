import { baseUrl } from "./http-common";
import useAuthStore from "@/redux/authenticationSlice";

const { accessToken, refreshToken }: any = useAuthStore.getState();

// ********************** CHAPTERS ********************** //
export const addChapter = async (data: {}) => {
  console.log("Token @ add chapter : ", accessToken);

  return await baseUrl.post(`chapters/`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

export const editChapter = async (id: number, data: {}) => {
  return await baseUrl.put(`/chapters/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

export const deleteChapter = async (id: number) => {
  return await baseUrl.delete(`/chapters/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

export const questionsInChapter = async (id:any) => {
  return await baseUrl.get(`chapters/${id}/questions`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};
