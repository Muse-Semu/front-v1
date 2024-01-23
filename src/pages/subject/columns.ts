import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 10 },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    width: 250,
  },

  {
    field: "description",
    headerName: "Desciption",
    width: 200,
    type: "string",
  },
];
