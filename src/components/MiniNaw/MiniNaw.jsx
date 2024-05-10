import "./MiniNaw.css";

import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { ALL_DATA } from "../../Query/get_all";

// icons
import { RiHomeFill } from "react-icons/ri";
import { MdOutlineFavorite } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

const MiniNaw = () => {
  const miniNav = useRef(null);

  const accessAToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const cottage = ALL_DATA.useCottage();

  const favoriteCottage =
    cottage?.data?.length &&
    cottage?.data?.filter((e) => e.isLiked === true)?.length;

  return (
    <div
      ref={miniNav}
      className={accessAToken && refreshToken ? "wrap-nav" : "wrap-nav d-none"}
    >
      <div className="mini-naw">
        <NavLink to="/" className={"miniNavLink"}>
          <RiHomeFill size={28} />
        </NavLink>

        <NavLink to="/home/favorite" className="favorite miniNavLink">
          <MdOutlineFavorite size={30} />
          <span
            className={
              favoriteCottage ? "favarite-num-mini" : "favarite-num-mini d-none"
            }
          >
            {favoriteCottage}
          </span>
        </NavLink>

        <NavLink to="/home/add-new" className={"miniNavLink"}>
          <FaCirclePlus size={28} />
        </NavLink>

        <NavLink to="/home/profile" className={"miniNavLink"}>
          <FaUserCircle size={28} />
        </NavLink>
      </div>
    </div>
  );
};

export default MiniNaw;
