import React from "react";
import NavbarCompany from "../company/navbarComapny";
import { Footer } from "../lainding page/footer";
import HeaderWithTranslate from "../header";

export default function CompanyLayout({ children }) {
  return (
    <>
      
      <NavbarCompany />
      <div className="">{children}</div>
      <Footer />
    </>
  );
}
