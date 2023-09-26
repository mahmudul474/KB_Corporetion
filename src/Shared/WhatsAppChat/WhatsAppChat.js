import React from "react";
import queryString from "query-string";
import WhatsAppIcon from "./icon.png";

const WhatsAppChat = () => {
  const phoneNumber = "+8801322674654"; // Replace with your phone number
  const message = encodeURIComponent("");

  const handleClick = () => {
    const queryParams = queryString.stringify({
      phone: phoneNumber,
      text: message
    });
    const url = `https://wa.me/?${queryParams}`;
    const windowFeatures = "width=500,height=600,left=200,top=200";
    window.open(url, "_blank", windowFeatures);
  };

  const whatsappIconStyles = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: "9999"
  };
  return (
    <img
      src={WhatsAppIcon}
      alt="WhatsApp Chat"
      style={whatsappIconStyles}
      className="whatsapp-chat-icon cursor-pointer w-[50px] h-[50px] object-cover  rounded-md "
      onClick={handleClick}
    />
  );
};

export default WhatsAppChat;
