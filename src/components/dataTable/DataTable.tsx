import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ConfirmBox from "../messages/ConfirmBox";
import { boxAction } from "../../redux/boxSlice";
import { Cell } from "recharts";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
};

const DataTable = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const confirmBox = useSelector(state=>state.box.isConfirmBox)
    
  // TEST THE API

  // const queryClient = useQueryClient();
  // // const mutation = useMutation({
  // //   mutationFn: (id: number) => {
  // //     return fetch(`http://localhost:8800/api/${props.slug}/${id}`, {
  // //       method: "delete",
  // //     });
  // //   },
  // //   onSuccess: ()=>{
  // //     queryClient.invalidateQueries([`all${props.slug}`]);
  // //   }
  // // });

  const handleDelete = (id: number) => {
   dispatch(boxAction.showConfirmBox(confirmBox))
   
   console.log(id,confirmBox);
   

  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="action" >
          <button onClick={()=>navigate(`/${props.slug}/${params.row.id}`)} >
            <img src="/view.svg" alt="" />
          </button>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        onCellClick={(params)=>{navigate(`/${props.slug}/${params.row.id}`)
         console.log(props.slug);
        }}
        
      />
      {confirmBox && (
        <ConfirmBox message={{ type: "error", msg: "Are you sure to " }} />
      )}
    </div>
  );
};

export default DataTable;
