import React, { useEffect, useState } from "react";

import { slugs } from "../../constant";
import { useParams } from "react-router-dom";
import { getUserById } from "../../api/APIService";
import { access_token } from "../../service/localStorage";


const SingleUser = () => {
  const { id } = useParams();
  const [editBox, setEditBox] = useState(false);
  const [singleUser, setSingleUser] = useState();
  // console.log(id);

  useEffect(() => {
    getUserById(id, access_token).then((res) => {
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
