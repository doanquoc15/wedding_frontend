import Image from "next/image";
import React from "react";
import { Modal } from "@mui/material";

import ClosePopup from "@/statics/svg/ic-close.svg";
import { ModalProps } from "@/types/common";

const ModalPopup: React.FC<ModalProps | any> = ({
  open,
  setOpen,
  title,
  children,
  closeModal,
  style,
  styleParent,
  isBtnClose = true,
  sx,
}) => {
  const handleClose = () => {
    setOpen(false);
    closeModal && closeModal();
  };
  React.useEffect(() => {
    setOpen(open);
  }, [open, setOpen]);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="bg-[rgba(0,0,0,0.3)]"
      sx={{
        fontSize: "14px",
        ...sx,
      }}
      onClose={() => handleClose()}
    >
      <div
        className={`focus:border-0 focus:outline-none absolute top-1/2 left-1/2 bg-white
      translate-y-[-50%] translate-x-[-50%] bg-clr-white rounded-[5px] overflow-auto max-h-[90vh] ${styleParent}`}
      >
        <div className="w-full">
          <header className="flex justify-between bg-[#F5F6F6] z-[1000]  shadow-[4px_4px_7px_rgba(0,0,0,0.08)] py-3 px-4">
            <span className="text-[16px] text-clr-gray-500 font-bold">
              {title}
            </span>
            {isBtnClose && (
              <span onClick={() => handleClose()} className="cursor-pointer">
                <Image src={ClosePopup} alt="close popup" />
              </span>
            )}
          </header>
          <div className={`${style}`}>{children}</div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPopup;
