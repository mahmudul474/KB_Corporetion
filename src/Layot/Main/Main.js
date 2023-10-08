import React, { useEffect } from "react";
import Navbar from "../../Shared/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import WhatsAppChat from "../../Shared/WhatsAppChat/WhatsAppChat";
import QrCode from "../../Shared/QrCode/QrCode";

export default function Main() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <QrCode></QrCode>
      <WhatsAppChat />

      <Footer></Footer>
    </>
  );
}
