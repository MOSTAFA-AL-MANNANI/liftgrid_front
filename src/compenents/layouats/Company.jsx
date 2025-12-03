import React from "react";
import NavbarCompany from "../company/navbarComapny";
import { Footer } from "../lainding page/footer";

export default function CompanyLayout({ children }) {
  return (
    <>
      <NavbarCompany />
      <div className="pt-20">{children}</div>
      <Footer />
    </>
  );
}
