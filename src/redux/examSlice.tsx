import { getExams } from "@/api/examsApi";
import { create } from "zustand";

export interface ExamState {
  questions: any[];
  exams: any[];
  status: string;
  error: any;
  fetchExams: () => Promise<void>;
}

const useExamStore = create<ExamState>((set) => ({
  exams: [],
  questions: [],
  status: "idle",
  error: null,
  fetchExams: async () => {
    try {
      set({ status: "pending" });
      const response = await getExams();
      set({ exams: response ? [...response] : [], status: "succeeded" });
    } catch (error: any) {
      set({ status: "failed", error: "Error" });
    }
  },
}));

export default useExamStore;
