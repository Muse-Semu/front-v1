import { getQuestionCategory } from "@/api/questionCategoryApi";
import {create }from "zustand";

// Define the Zustand store
export interface QuestionCategoryStore {
  questionCategorys: any[];
  status: string;
  error: any;
  fetchQuestionCategory: () => Promise<void>;
}

// Create the Zustand store
const useQuestionCategoryStore = create<QuestionCategoryStore>((set) => ({
  questionCategorys: [],
  status: "idle",
  error: null,

  fetchQuestionCategory: async () => {
    set({ status: "pending" });
    try {
      const questionCategorys = await getQuestionCategory();
      set({ questionCategorys, status: "succeeded" });
    } catch (error) {
      set({ status: "failed", error: "Error" });
    }
  },
}));



export default useQuestionCategoryStore;
