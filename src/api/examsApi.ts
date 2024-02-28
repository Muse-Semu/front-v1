const { accessToken, refreshToken }: any = useAuthStore.getState();
import { baseUrl } from "./http-common";
import useAuthStore from "@/redux/authenticationSlice";
export const getExams = async () => {
  return await baseUrl
    .get("/exam", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
};

// Get Single exam by id
export const getExamById = async (id: any) => {
  return await baseUrl.get(`/exam/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

// Add new Exam
export const addExam = async (data: {}) => {
  console.log("***********", data);

  const exam = await baseUrl.post("/exam", JSON.stringify(data), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return exam;
};

// Delete Exam
export const deleteExam = async (examId: number) => {
  return await baseUrl.delete(`exam/delete/${examId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

// Update the exam
export const updateExam = async (examId: number, exam: {}) => {
  return await baseUrl.put(`exam/update/${examId}`, exam, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

// Get Exams by ExamCategory
export const getExamsByCategory = async (categoryId: number) => {
  return await baseUrl.get(`exam/category/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

// Get exams by Subject
export const getExamsBySubject = async (subjectId: number) => {
  return await baseUrl.get(`exam/subject/${subjectId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

// Get all exam questions
export const getExamQuestions = async (examId: number) => {
  return await baseUrl.get(`exam/${examId}/questions`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};
