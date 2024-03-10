import AuthUiWrapper from "../components/authUI/AuthUiWrapper";
import ModalWrapper from "./ModalWrapper";

const LoginModal = ({ onClose }) => {
  return (
    <ModalWrapper onClose={onClose}>
      <AuthUiWrapper />
    </ModalWrapper>
  );
};

export default LoginModal;
