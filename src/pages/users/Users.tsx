import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import { useEffect, useState } from "react";
import Add from "../../components/crud/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  getUserStatus,
  selectAllusers,
} from "../../redux/userSlice";
import { columns } from "./Columns";
import Loading from "../../components/loading/Loading";
import { slugs } from "../../constant";
import { CircleFadingPlus } from "lucide-react";
import { MdArrowBack } from "react-icons/md";
// import { useQuery } from "@tanstack/react-query";

const Users = () => {
  const [open, setOpen] = useState(false);
  const users = useSelector(selectAllusers);
  const dispatch = useDispatch();
  const userStatus = useSelector(getUserStatus);
  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);
  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allusers"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/users").then(
  //       (res) => res.json()
  //     ),
  // });
  console.log("user:", users);

  return (
    <div className="users">
      <div className="header font-extrabold">
        <div className="flex gap-2 items-center">
          <h1 className="pl-3">Users</h1>
          <button
            className="normal-btn flex gap-2"
            onClick={() => setOpen(true)}
          >
            <CircleFadingPlus />
            <span>New</span>
          </button>
        </div>
        <div className="cursor-pointer">
          <MdArrowBack size={30} onClick={() => navigate(-1)} />
        </div>
      </div>
      {/* <DataTable slug="users" columns={columns} rows={users && users} /> */}
      {/* TEST THE API */}

      {userStatus === "pending" ? (
        <Loading />
      ) : users.length != 0 ? (
        <DataTable slug={slugs.USER} columns={columns} rows={users} />
      ) : (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          Error occered while fetching data check you connection
        </div>
      )}

      {open && <Add slug={slugs.USER} columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
