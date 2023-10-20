import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../App";

function Header() {
  const { userInfo } = useContext(AppContext);
  return (
    <nav className="h-16 bg-cyan-500">
      <ul className="flex h-16 items-center justify-start bg-cyan-500">
        <NavLink to="/home" className="mx-5 sm:mx-10">
          Home
        </NavLink>
        <NavLink to="/food-diary" className="mx-0 sm:mx-5">
          Food Diary
        </NavLink>
        <NavLink
          to="/profile"
          className="ml-auto mr-10 flex h-[90%] flex-col items-center justify-center"
        >
          <div className=" rounded-full border-[0.5px] border-gray-700 bg-slate-300 p-[0.4rem] text-center text-sm">{`${userInfo.firstName.slice(
            0,
            1,
          )}.${userInfo.lastName.slice(0, 1)}`}</div>
          <span className=" text-xs font-bold text-purple-800">{`${userInfo.todaysCalories}/${userInfo.dailyCalories}`}</span>
        </NavLink>
      </ul>
    </nav>
  );
}

export default Header;
