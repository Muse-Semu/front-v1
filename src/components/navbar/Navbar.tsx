import "./navbar.scss";

const Navbar = ({user}) => {
  return (
    <div className="navbar sticky top-0 bg-inherit z-20 shadow-md mb-7">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>Yegna</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user">
          {/* <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          /> */}
          <span>{user?.username}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
