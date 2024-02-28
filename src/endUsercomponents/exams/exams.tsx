import { useEffect, useState } from "react";

import Loading from "../../components/loading/Loading";
import { slugs } from "../../constant";


import Lists from "../common/Lists";
import { Button } from "@/components/ui/button";
import useExamStore from "@/redux/examSlice";
import { useSubjectStore } from "@/redux/subjectSlice";
import useExamCategoryStore from "@/redux/examCategorySlice";

function Exams() {
  const [open, setOpen] = useState(false);

  const {exams,fetchExams,status} = useExamStore();
  const {subjects} = useSubjectStore();
  const {examCategorys }= useExamCategoryStore();

  useEffect(() => {
  
     fetchExams;
    
  }, []);

  return (
    <div className="products ">
      <div className="header sticky top-0 ">
        <h1 className="header-txt">Exams</h1>
        <Button variant="outline" onClick={() => setOpen(true)}>
           ADD
        </Button>
      </div>

      {status === "pending" ? (
        <Loading />
      ) : exams.length != 0 ? (
        <Lists data={exams} />
      ) : (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          Error occered while fetching data check you connection
        </div>
      )}
    </div>
  );
}

export default Exams;
