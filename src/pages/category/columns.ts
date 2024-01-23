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
