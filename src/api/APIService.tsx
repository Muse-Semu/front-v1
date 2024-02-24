import Cookies from "js-cookie";
import { baseUrl } from "./http-common";

// ********************** EXAMS **************************************** //
const access_token = Cookies.get("access_token")||null
const refresh_token = Cookies.get("refresh_token")||null;
// Get all exam list
export const getExams = async () => {
  
  return await baseUrl
    .get("/exam", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
};

// Get Single exam by id
export const getExamById = async (id: any) => {
  return await baseUrl.get(`/exam/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};

// Add new Exam
export const addExam = async (data:{}) => {

  console.log("***********",data);
  
  const exam = await baseUrl
    .post("/exam",JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    })
    
  return exam;
};

// Delete Exam
export const deleteExam = async (examId: number) => {
  return await baseUrl.delete(`exam/delete/${examId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};

// Update the exam
export const updateExam = async (examId: number, exam: {}) => {
  return await baseUrl.put(`exam/update/${examId}`, exam, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};

// Get Exams by ExamCategory
export const getExamsByCategory = async (categoryId: number) => {
  return await baseUrl.get(`exam/category/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};

// Get exams by Subject
export const getExamsBySubject = async (subjectId: number) => {
  return await baseUrl.get(`exam/subject/${subjectId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};

// Get all exam questions
export const getExamQuestions = async (examId: number) => {
  return await baseUrl.get(`exam/${examId}/questions`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};



//********************** EXAM_CATEGORY ********************** //

// Get all exam_category list
export const getExamCategory = async () => {
  
  return await baseUrl
    .get("/exam_category", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
};

// Get single exam_category by Id
export const getExamCategoryById = async (id: any) => {
  return await baseUrl.get(`/exam_category/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};

// Add new ExamCategory
export const addExamCategory = async (data: {}) => {
  return await baseUrl.post("/exam_category", data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};

// Delete ExamCategory
export const deleteExamCategory = async (categoryId: number) => {
  return await baseUrl.delete(`/exam_category/delete/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};
export const updateExamCategory = async (categoryId: number, data: {}) => {
  return await baseUrl.put(`/exam_category/update/${categoryId}`, data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};


// ********************** SUBJECT ********************** //
export const getSubject = async () => {
  console.log("@subject token is : ",access_token)
  return await baseUrl
    .get("/subject", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
};

export const getSubjectById = async (id: number) => {
  
  return await baseUrl.get(`/subject/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};

export const addSubject = async (data: {}) => {
  const subject = await baseUrl
    .post("/subject", data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
  return subject;
};

export const getSubjectChapter =async (id:number)=>{
  return await baseUrl.get(`/subject/${id}/chapters`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
}
// Update subject
export const updateSubject = async (subjectId: number, data: {}) => {
  return await baseUrl.put(`/subject/update/${subjectId}`, data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};

// Delete subject
export const deleteSubject = async (subjectId: number) => {
  return await baseUrl.delete(`subject/delete/${subjectId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};

// ********************** CHAPTERS ********************** //
export const addChapter = async (data:{})=>{

  console.log("Token @ add chapter : ",access_token);
  
  return await baseUrl.post(`chapters/`,data,{
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  
  })
}

export const editChapter = async (id:number,data:{})=>{
  return await baseUrl.put(`/chapters/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
}

export const deleteChapter= async(id:number)=>{
  return await baseUrl.delete(`/chapters/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
}

export const questionsInChapter = async(id)=>{
  return await baseUrl.get(`chapters/${id}/questions`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
}

// ********************** USER ********************** //

export const addUser = async (data: {}) => {
  const user = await baseUrl
    .post("/user", data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
  return user;
};

export const getUserDetail = async (email: string) => {
  console.log("Recieved token @ detail",access_token);
  return await baseUrl.get(`/user/detail/${email}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getUserById = async (id: number, token: string) => {
  console.log("Recieved Token", token);
  return await baseUrl.get(`/user/get/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getAllUser = async (token: any) => {
  console.log("Recieved token ", token);
  return await baseUrl.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// ********************** END USER ********************** //

// localhost: 8082 / api / question / category;

// ********************** QUESTION ********************** //

// Add new question
export const addQuestion = (data: {}) => {
  return baseUrl.post(`/question`, data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};
// Get question
export const getQuestions = () => {
  return baseUrl.get("/question", {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};
// Get single questiob
export const getQuestionById = (id: number) => {
  return baseUrl.get(`/question/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};

// Update the question
export const updateQuestion = (id: number, data: {}) => {
  return baseUrl.put(`/question/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};

export const deleteQuestion = (id: number) => {
  return baseUrl.delete(`/question/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};

// ********************** END QUESTION ********************** //

//********************** QUESTION_CATEGORY ********************** //

// Get all exam_category list
export const getQuestionCategory = async () => {
  return await baseUrl
    .get("/question/category", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
};

// Get single question_category by Id
export const getQuestionCategoryById = async (id: number) => {
  return await baseUrl.get(`/question_category/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};

// Add new QuestionCategory
export const addQuestionCategory = async (data: {}) => {
  return await baseUrl.post("/question_category", data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};

// Delete QuestionCategory
export const deleteQuestionCategory = async (categoryId: number) => {
  return await baseUrl.delete(`/question_category/delete/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};
export const updateQuestionCategory = async (categoryId: number, data: {}) => {
  return await baseUrl.put(`/question_category/update/${categoryId}`, data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
};


//********************** AUTHENTICATION ********************** //
export const login = async (data: {}) => {
  return await baseUrl.post("/auth/authenticate", data);
};

export const register = async (data: {}) => {
  return await baseUrl.post("/auth/register", data);
};

export const getNewAccessToken = async () => {
  return await baseUrl.post(`/auth/refresh_token`, refresh_token, {
    headers: {
      Authorization: `Bearer ${refresh_token}`,
      "Content-Type": "application/json",
    },
  });
};

export const generateToken = async () => {
  return await baseUrl.post(`/auth/refresh_token`, refresh_token, {
    headers: {
      Authorization: `Bearer ${refresh_token}`,
      "Content-Type": "application/json",
    },
  });
};

export const logout = async ()=>{
  
  return await baseUrl.post("/auth/logout", access_token, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
}