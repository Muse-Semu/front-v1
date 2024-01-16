import { baseUrl } from "./http-common";

export const getExams = async () => {
  const result = await baseUrl.get("/exam").then((res) => res.data);
  return result;
};

export const getExamById = async (id) => {
  // console.log(id);
  
  
  return await baseUrl.get(`/exam/${id}`);
};

export const addExam = async (data: {}) => {
  const exam = await baseUrl.post("/exam", data).then((res) => {
    res.data;
  });
  return exam;
};



export const getExamCategory = async () => {
  console.log("Exam category fetched");
  const result = await baseUrl.get("exam/category").then((res) => res.data);
  return result;
};
export const addCategory = async (data: {}) => {
  const category = await baseUrl
    .post("exam/category", data)
    .then((res) => res.data);
  return category;
};

export const getSubject = async () => {
  const result = await baseUrl
    .get("/subject")
    .then((res) => res.data)
    .catch((e) => console.log(e.message()));
  return result;
};

export const getSubjectById = async (id) => {
  const result = await baseUrl.get(`/subject/${id}`).then((res) => {
    res.data;
  });
  return result;
};

export const addSubject = async (data: {}) => {
  const subject = await baseUrl.post("/subject", data).then((res) => res.data);
  return subject;
};

export const addUser = async (data: {}) => {
  const user = await baseUrl.post("/user", data).then((res) => res.data);
  return user;
};
