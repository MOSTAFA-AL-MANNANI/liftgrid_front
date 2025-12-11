import React from "react";
import NavbarDriver from "../navbarDriver";
import { Footer } from "../lainding page/footer";
import HeaderWithTranslate from "../header";

export default function DriverLayout({ children }) {
  return (
    <>
      
      <NavbarDriver />
      <div className="">{children}</div>
      <Footer />
    </>
  );
}
