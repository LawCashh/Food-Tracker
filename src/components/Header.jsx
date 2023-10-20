import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../App";

function Header() {
  const { userInfo } = useContext(AppContext);
  return (
    <nav className="h-16 bg-cyan-500">
      <ul className="flex h-16 items-center justify-start bg-cyan-500">
        <NavLink to="/home" className="mx-10">
          Home
        </NavLink>
        <NavLink to="/food-diary" className="mx-5">
          Food Diary
        </NavLink>
        <NavLink to="/profile" className="ml-auto mr-10">
          Profile
        </NavLink>
      </ul>
    </nav>
  );
}

export default Header;