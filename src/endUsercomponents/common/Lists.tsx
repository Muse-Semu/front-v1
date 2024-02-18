type Props = {
  data:{}
}
const Lists = (props:Props) => {
  return (
    <div>
      <div className="gap-y-6 gap-x-3 grid grid-cols-1 sm:mr-3  xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-1 ">
        {props.data && props.data.map((subject, index) => (
          <div key={subject.id} className=" rounded-md  shadow-white shadow-sm">
            <div className="">
              <div
                className={`rounded-t-md p-2 ${
                  index % 3 === 0
                    ? "bg-green-500 "
                    : index % 3 === 2
                    ? "bg-orange-500"
                    : "bg-blue-500"
                }  font-extrabold`}
              >
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
}

export default Lists
