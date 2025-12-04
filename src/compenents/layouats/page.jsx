import React from "react";
import { Navbar } from "../lainding page/navbar";
import { Footer } from "../lainding page/footer";

export default function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="pt-20">{children}</div>
      <Footer />
    </>
  );
}
