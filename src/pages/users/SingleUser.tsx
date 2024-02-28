import React, { useEffect, useState } from "react";

import { slugs } from "../../constant";
import { useParams } from "react-router-dom";
import { getUserById } from "../../api/userApi";
import useAuthStore from "@/redux/authenticationSlice";
import UpdateUser from "./UpdateUser";
import { columns } from "./Columns";
// import { access_token } from "@/redux/authenticationSlice";


const SingleUser = () => {
  const { id } = useParams();
  const [editBox, setEditBox] = useState(false);
  const [singleUser, setSingleUser] = useState();
  const {accessToken} = useAuthStore()
  // console.log(id);

  useEffect(() => {
    getUserById(id, accessToken).then((res) => {
      setSingleUser(res.data);
    });
  }, []);

  console.log("Single User", singleUser);
  return (
    <div className="">
      <div className="grid gap-3">
        <div className="header p-3 "> User Information </div>
        {singleUser && (
          <div className="box-c">
            <div>
              <h1>
                {singleUser.email} {singleUser.id}
              </h1>
            </div>
            <div>{/* <h1>{singleUser.User.title}</h1> */}</div>
            <div>
              <h1>{singleUser.firstName}</h1>
            </div>
            <div>{singleUser.role}</div>
            <div>
              <button className="edit-btn" onClick={() => setEditBox(true)}>
                Update
              </button>
            </div>
            <div>
              {editBox && (
                <UpdateUser
                  id={singleUser.id}
                  title={singleUser.title}
                  slug={slugs.EXAM_CATEGORY}
                  columns={columns}
                  setEditBox={setEditBox}
                  editbaleUser={singleUser}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleUser;
