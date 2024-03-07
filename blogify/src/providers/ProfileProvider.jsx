import { useState } from "react";
import { ProfileContext } from "../context";

const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState({});
  return (
    <ProfileContext.Provider value={{ user, setUser }}>
      {children}
    </ProfileContext.Provider>
  );
};
export default ProfileProvider;
