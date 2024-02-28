import create from "zustand";
import { getExamCategory, getExamCategoryById } from "@/api/examCategoryApi";

interface ExamCategoryStore {
  examCategorys: any[];
  singleExamCategory: any;
  status: string;
  error: any;
  fetchExamCategory: () => Promise<void>;
  getSingleExamCategory: (id: any) => Promise<void>;
}

const useExamCategoryStore = create<ExamCategoryStore>((set) => ({
  examCategorys: [],
  singleExamCategory: {},
  status: "idle",
  error: null,

  fetchExamCategory: async () => {
    set({ status: "pending" });
    try {
      const response = await getExamCategory();
      set({ examCategorys: [...response], status: "succeeded" });
    } catch (error) {
      set({ status: "failed", error: "Error" });
    }
  },

  getSingleExamCategory: async (id: any) => {
    set({ status: "pending" });
    try {
      const response = await getExamCategoryById(id).then((res) => res.data);
      set({ singleExamCategory: response, status: "succeeded" });
    } catch (error) {
      set({ status: "failed", error: "Error" });
    }
  },
}));

export default useExamCategoryStore;
