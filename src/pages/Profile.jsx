import { useContext } from "react";
import { AppContext } from "../App";

function Profile() {
  const { userInfo, updateUserInfo } = useContext(AppContext);
  return <main className="flex-1">Profile</main>;
}

export default Profile;
