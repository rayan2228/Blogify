import Img from "../components/layouts/Img";
import PortalModal from "./PortalModal";
import closeIcon from "../assets/icons/close.svg";
const ModalWrapper = ({ onClose, children }) => {
  return (
    <PortalModal>
      <section className="fixed top-0 left-0 z-50 grid w-full h-full place-items-center bg-slate-800/50 backdrop-blur-sm">
        <div className="relative w-6/12 p-4 mx-auto border rounded-lg shadow-lg bg-slate-900 border-slate-600/50 shadow-slate-400/10">
          {children}
          <div onClick={onClose}>
            {" "}
            <Img
              src={closeIcon}
              alt="Close"
              className="absolute w-8 h-8 cursor-pointer right-2 top-2"
            />
          </div>
        </div>
      </section>
    </PortalModal>
  );
};

export default ModalWrapper;
