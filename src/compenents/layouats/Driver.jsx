import React from "react";
import NavbarDriver from "../navbarDriver";
import { Footer } from "../lainding page/footer";

export default function DriverLayout({ children }) {
  return (
    <>
      <NavbarDriver />
      <div className="pt-20">{children}</div>
      <Footer />
    </>
  );
}
