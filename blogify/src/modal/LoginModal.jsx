import LoginUI from "../components/loginUI/LoginUI";
import ModalWrapper from "./ModalWrapper";

const LoginModal = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose}>
      <LoginUI />
    </ModalWrapper>
  );
};

export default LoginModal;
