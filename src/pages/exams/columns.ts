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
    field: "givenTime",
    type: "number",
    headerName: "Given Time",
    width: 100,
  },
  {
    field: "examYear",
    type: "number",
    headerName: "Exam Year",
    width: 100,
  },
  {
    field: "examCategory",
    headerName: "Category",
    type: "number",
    width: 200,
    renderCell: (params) => {
      const category = params.row.examCategory;
      return category ? category.title : "-";
    },
  },
  {
    field: "subject",
    headerName: "Subject",
    type: "number",
    width: 200,
    renderCell: (params) => {
      const subject = params.row.subject;
      return subject ? subject.title : "-";
    },
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 100,
    type: "string",
  },
  {
    field: "active",
    headerName: "Is Active",
    width: 100,
    type: "boolean",
  },
  {
    field: "description",
    headerName: "Desciption",
    width: 0,
    type: "string",
  },
];

export const otherfields = [
  {
    image: "image",
    headerName: "Image",
    placeholder: "upload image here",
    type: "file",
  },
];
