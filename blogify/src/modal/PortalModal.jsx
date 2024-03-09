import { useEffect } from "react";
import { createPortal } from "react-dom";

const PortalModal = ({ children }) => {
  const mountElement = document.querySelector("#portalModal");
  const elementDiv = document.createElement("div");
  useEffect(() => {
    mountElement.appendChild(elementDiv);
    return () => {
      mountElement.removeChild(elementDiv);
    };
  }, [mountElement, elementDiv]);
  return createPortal(children, elementDiv);
};

export default PortalModal;
