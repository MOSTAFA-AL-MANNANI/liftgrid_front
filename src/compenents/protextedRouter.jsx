// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, type }) {
  // type = "driver" | "company"
  const token = type === "driver" 
    ? localStorage.getItem("driverToken") 
    : localStorage.getItem("companyToken");

  if (!token) {
    // إعادة التوجيه إلى صفحة تسجيل الدخول المناسبة
    return <Navigate to={type === "driver" ? "/" : "/"} replace />;
  }

  return children;
}
