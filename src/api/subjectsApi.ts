import { baseUrl } from "./http-common";
import useAuthStore from "@/redux/authenticationSlice";

const { accessToken, refreshToken }: any = useAuthStore.getState();

// ********************** SUBJECT ********************** //
export const getSubject = async () => {
  console.log("@subject token is : ", accessToken);
  return await baseUrl
    .get("/subject", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
    
};

export const getSubjectById = async (id: number) => {
  return await baseUrl.get(`/subject/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

export const addSubject = async (data: {}) => {
  const subject = await baseUrl
    .post("/subject", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
   
  return subject;
};

export const getSubjectChapter = async (id: number) => {
  return await baseUrl.get(`/subject/${id}/chapters`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};
// Update subject
export const updateSubject = async (subjectId: number, data: {}) => {
  return await baseUrl.put(`/subject/update/${subjectId}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

// Delete subject
export const deleteSubject = async (subjectId: number) => {
  return await baseUrl.delete(`subject/delete/${subjectId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};
