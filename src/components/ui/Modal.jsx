import { useOutsideClick } from "@/hooks/useOutsideClick";
import { createContext, useContext, useState, cloneElement } from "react";

import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return <ModalContext.Provider value={{ openName, open, close }}>{children}</ModalContext.Provider>;
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm transition-all duration-500">
      <div className="flex h-full items-center justify-center p-4">
        <div
          ref={ref}
          className="max-h-full w-full max-w-6xl overflow-y-auto rounded-lg bg-white p-12 shadow-2xl transition-all duration-500"
        >
          <button
            onClick={close}
            className="absolute top-5 right-8 rounded-sm border-none bg-transparent p-1 text-gray-500 transition-all duration-200 hover:bg-gray-100"
          >
            <HiXMark className="h-6 w-6" />
          </button>
          <div>{cloneElement(children, { onClose: close, onCloseModal: close })}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
