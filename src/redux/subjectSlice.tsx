import {create} from "zustand";
import { getSubject } from "../api/subjectsApi";

export interface SubjectType {
  subjects: any[];
  status: string;
  error: any;
  fetchSubjects : ()=>Promise<void>
}

export const useSubjectStore = create<SubjectType>((set) => ({
  subjects: [],
  status: "idle",
  error: null,
  fetchSubjects: async () => {
    set({ status: "pending" });
    try {
      const response = await getSubject();
      set({ subjects: response.data, status: "succeeded" });
    } catch (error: any) {
      set({ status: "failed", error: error.message });
    }
  },
}));


