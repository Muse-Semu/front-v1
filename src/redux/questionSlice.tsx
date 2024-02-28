import {create} from "zustand";
import axios from "axios"; // Assuming you're using axios for HTTP requests
import { baseUrl } from "@/api/http-common";
import { getQuestions } from "@/api/questionsApi";

export interface QuestionType {
  questions: any[];
  status: string;
  error: any;
  fetchQuestions:()=>Promise<void>
}

const useQuestionStore = create<QuestionType>((set) => ({
  questions: [],
  status: "idle",
  error: null,
  fetchQuestions: async () => {
    try {
      set({ status: "pending" });
      const response = await getQuestions(); // Assuming baseUrl is defined somewhere
      set({ questions: response.data, status: "succeeded" });
    } catch (error) {
      set({ status: "failed", error: "Error" });
    }
  },
}));


export default useQuestionStore;
