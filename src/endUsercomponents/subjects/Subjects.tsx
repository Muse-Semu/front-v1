import { subjects } from "./SubjectList";

const SubjectList = () => {
  return (
    <div className=" h-screen shadow-gray-700 shadow-lg p-4">
      <div className="mb-4">
        <div className=" bg-inherit">
          <h1 className="rounded-t-md py-2 border-b border-gray-700 font-extrabold text-2xl">
            Subjects
          </h1>
        </div>
      </div>
      <div className="gap-3 grid grid-cols-1 sm:mr-3  xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-1 ">
        {subjects.map((subject) => (
          <div className=" rounded-md w-full shadow-white shadow">
            <div className="">
              <div className=" rounded-t-md p-2 bg-gray-700 font-extrabold ">
                <h1 className="">{subject.title}</h1>
              </div>
              <div className="p-2 ">
                <p>{subject.description}</p>
                <p>Chapters : {subject.chapters.length}</p>
                <p>Exams : 4</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;
