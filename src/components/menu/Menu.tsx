import { Link } from "react-router-dom";
import "./menu.scss";
import { menu } from "../../data.tsx";

const Menu = () => {
  return (
    <div className="menu grid fixed  overflow-y-auto lg:w-[200px] border-r border-gray-500  ">
      <div className="h-[350px]  overflow-y-auto  ">
        {menu
          .filter(
            (menu) =>
              menu.title === "main" ||
              menu.title === "lists" ||
              menu.title === "analytics"
          )
          .map((item) => (
            <div className="item  " key={item.id}>
              <span className="title">{item.title}</span>
              {item.listItems.map((listItem) => (
                <Link
                  to={listItem.url}
                  className=" listItem flex items-center gap-2 p-2 rounded-md font-bold "
                  key={listItem.id}
                >
                  <h1 className="text-xl">{listItem.icon}</h1>
                  <span className="listItemTitle">{listItem.title}</span>
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
                  <span className="listItemTitle">{listItem.title}</span>
                </Link>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Menu;
