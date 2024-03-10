import { useState } from "react";
import LoginUI from "./LoginUI";
import RegisterUI from "./RegisterUI";

const AuthUiWrapper = () => {
  const [showUI, setShowUI] = useState(true);
  return showUI ? (
    <LoginUI onSwap={() => setShowUI(false)} />
  ) : (
    <RegisterUI onSwap={() => setShowUI(true)} />
  );
};

export default AuthUiWrapper;
