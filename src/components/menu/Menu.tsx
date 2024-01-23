import { Link } from "react-router-dom";
import "./menu.scss";
import { menu } from "./menuConstanst";

const Menu = () => {
  return (
    <div className="  fixed  overflow-y-auto xl:w-[190px]   ">
      <div className="h-[350px]  overflow-y-auto  ">
        {menu
          .filter(
            (menu) =>
              menu.title === "main" ||
              menu.title === "lists" ||
              menu.title === "analytics"
          )
          .map((item) => (
            <div className="item " key={item.id}>
              <span className="title text-[12px] font-extralight uppercase hidden lg:block ">
                {item.title}
              </span>
              {item.listItems.map((listItem) => (
                <Link
                  to={listItem.url}
                  className=" listItem flex items-center hover:bg-slate-700 gap-2 p-2 mx-2  rounded-md capitalize "
                  key={listItem.id}
                >
                  <h1 className="text-xl" title={listItem.title}>{listItem.icon} </h1>
                  <span className="listItemTitle hidden lg:block">{listItem.title}</span>
                </Link>
              ))}
            </div>
          ))}
      </div>

      <div className="fixed left-1  bottom-10 lg:w-[205px] lg:p-2 border-y border-gray-500  ">
        {menu
          .filter((menu) => menu.title === "Maintenance")
          .map((item) => (
            <div className="item  " key={item.id}>
              {/* <span className="title">{item.title}</span> */}
              {item.listItems.map((listItem) => (
                <Link
                  to={listItem.url}
                  className="listItem flex items-center gap-2 p-2 rounded-md "
                  key={listItem.id}
                >
                  <h1>{listItem.icon}</h1>
                  <span className="listItemTitle hidden lg:block">
                    {listItem.title}
                  </span>
                </Link>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Menu;
