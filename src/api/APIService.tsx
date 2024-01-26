import { baseUrl } from "./http-common";

// ********************** EXAMS **************************************** //

// Get all exam list
export const getExams = async () => {
  return await baseUrl.get("/exam").then((res) => res.data);
};

// Get Single exam by id
export const getExamById = async (id: number) => {
  return await baseUrl.get(`/exam/${id}`);
};

// Add new Exam
export const addExam = async (data: number) => {
  const exam = await baseUrl.post("/exam", data).then((res) => {
    res.data;
  });
  return exam;
};

// Delete Exam
export const deleteExam = async (examId: number) => {
  return await baseUrl.delete(`exam/delete/${examId}`);
};

// Update the exam
export const updateExam = async (examId: number, exam: {}) => {
  return await baseUrl.put(`exam/update/${examId}`, exam);
};

// Get Exams by ExamCategory
export const getExamsByCategory = async (categoryId: number) => {
  return await baseUrl.get(`exam/category/${categoryId}`);
};

// Get exams by Subject
export const getExamsBySubject = async (subjectId: number) => {
  return await baseUrl.get(`exam/subject/${subjectId}`);
};

// Get all exam questions
export const getExamQuestions = async (examId: number) => {
  return await baseUrl.get(`exam/${examId}/questions`);
};

// **********************END EXAMS **************************************** //

//********************** EXAM_CATEGORY ********************** //

// Get all exam_category list
export const getExamCategory = () => {
  return baseUrl.get("/exam_category").then((res) => res.data);
};

// Get single exam_category by Id
export const getExamCategoryById = async (id: number) => {
  return await baseUrl.get(`/exam_category/${id}`);
};

// Add new ExamCategory
export const addExamCategory = async (data: {}) => {
  return await baseUrl.post("/exam_category", data);
};

// Delete ExamCategory
export const deleteExamCategory = async (categoryId: number) => {
  return await baseUrl.delete(`/exam_category/delete/${categoryId}`);
};
export const updateExamCategory = async (categoryId: number, data: {}) => {
  return await baseUrl.put(`/exam_category/update/${categoryId}`, data);
};

//********************** END EXAM_CATEGORY ********************** //

// ********************** SUBJECT ********************** //
export const getSubject = async () => {
  return await baseUrl.get("/subject").then((res) => res.data);
};

export const getSubjectById = async (id: number) => {
  return await baseUrl.get(`/subject/${id}`);
};

export const addSubject = async (data: {}) => {
  const subject = await baseUrl.post("/subject", data).then((res) => res.data);
  return subject;
};

// Update subject
export const updateSubject = async (subjectId: number, data: {}) => {
  return await baseUrl.put(`/subject/update/${subjectId}`, data);
};

// Delete subject
export const deleteSubject = async (subjectId: number) => {
  return await baseUrl.delete(`subject/delete/${subjectId}`);
};

// ********************** END SUBJECT ********************** //

// ********************** USER ********************** //

export const addUser = async (data: {}) => {
  const user = await baseUrl.post("/user", data).then((res) => res.data);
  return user;
};

// ********************** END USER ********************** //

// localhost: 8082 / api / question / category;

// ********************** QUESTION ********************** //

// Add new question
export const addQuestion = (data: {}) => {
  return baseUrl.post(`/question`);
};
// Get question
export const getQuestions = () => {
  return baseUrl.get("/question");
};
// Get single questiob
export const getQuestionById = (id: number) => {
  return baseUrl.get(`/question/${id}`);
};

// Update the question
export const updateQuestion = (id: number, data: {}) => {
  return baseUrl.put(`/question/${id}`, data);
};

export const deleteQuestion = (id: number) => {
  return baseUrl.delete(`/question/${id}`);
};

// ********************** END QUESTION ********************** //


//********************** QUESTION_CATEGORY ********************** //

// Get all exam_category list
export const getQuestionCategory = () => {
  return baseUrl.get("/question/category").then((res) => res.data);
};

// Get single question_category by Id
export const getQuestionCategoryById = async (id: number) => {
  return await baseUrl.get(`/question_category/${id}`);
};

// Add new QuestionCategory
export const addQuestionCategory = async (data: {}) => {
  return await baseUrl.post("/question_category", data);
};

// Delete QuestionCategory
export const deleteQuestionCategory = async (categoryId: number) => {
  return await baseUrl.delete(`/question_category/delete/${categoryId}`);
};
export const updateQuestionCategory = async (categoryId: number, data: {}) => {
  return await baseUrl.put(`/question_category/update/${categoryId}`, data);
};

//********************** END question_CATEGORY ********************** //



