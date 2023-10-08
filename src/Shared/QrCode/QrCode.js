import React from "react";
import qr from "./qr.png";

const QrCode = () => {
  const whatsappIconStyles = {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    zIndex: "9999"
  };
  return (
    <img
      src={qr}
      alt="WhatsApp Chat"
      style={whatsappIconStyles}
      className="whatsapp-chat-icon cursor-pointer w-[100px] h-[100px] object-cover  rounded-md "
    />
  );
};

export default QrCode;
