import { useEffect, useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { getExamCategory, getSubject } from "../../api/APIService";
import { useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 10 },
  // {
  //   field: "img",
  //   headerName: "Image",
  //   width: 100,
  //   renderCell: (params) => {
  //     return <img src={params.row.img || "/noavatar.png"} alt="" />;
  //   },
  // },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    width: 250,
  },

  {
    field: "createdAt",
    headerName: "Created At",
    width: 100,
    type: "string",
  },

  {
    field: "description",
    headerName: "Desciption",
    width: 0,
    type: "string",
  },
];

function Category() {
  const [open, setOpen] = useState(false);
  const [examCategory, setExamCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getExamCategory().then((res) => {
      setExamCategory(res);
      setIsLoading(false);
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  const box = useSelector((state) => state.box.isOpen);
  console.log(box);
  return (
    <div className="products ">
      <div className="header font-extrabold ">
        <h1 className="header-txt">Exam Category</h1>
        <button
          className="px-3 py-2 cursor-pointer rounded-md border"
          onClick={() => setOpen(true)}
        >
          Add New Exam Category
        </button>
      </div>

      {/* <DataTable slug="products" columns={columns} rows={subject} /> */}
      {/* TEST THE API */}

      {isLoading ? (
        <Loading />
      ) : examCategory.length != 0 ? (
        <DataTable slug="examCategory" columns={columns} rows={examCategory} />
      ) : (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          Error occered while fetching data check you connection
        </div>
      )}

      {open && (
        <Add
          slug="exam_category"
          examCategory={[]}
          subject={[]}
          columns={columns}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}

export default Category;
