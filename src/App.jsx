import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginDriver from "./compenents/loginDrive";
import RegisterDriver from "./compenents/register";
import ForgotPassword from "./compenents/forgetPassword";
import VerifyCode from "./compenents/verfycode";
import ResetPassword from "./compenents/resetpassword";
import UpdateProfile from "./compenents/updateDrive";
import Dashbord from "./compenents/dashbord";


function App() {


  return (
    <>
          <BrowserRouter>
      <Routes>

        {/* صفحة تسجيل الدخول */}
        <Route path="/driver/login" element={<LoginDriver />} />

        {/* صفحة إنشاء الحساب */}
        <Route path="/driver/register" element={<RegisterDriver />} />

        {/* صفحة نسيان كلمة السر */}
        <Route path="/driver/forgot-password" element={<ForgotPassword />} />

        {/* صفحة التحقق من رمز إعادة التعيين */}
        <Route path="/driver/verify-reset" element={<VerifyCode />} />

        {/* صفحة إعادة تعيين كلمة السر */}
        <Route path="/driver/reset-password" element={<ResetPassword />} />

        {/* صفحة الملف الشخصي */}
        <Route path="/driver/profile" element={<UpdateProfile />} />

        {/* لوحة التحكم الخاصة بالسائق */}
        <Route path="/driver/dashboard" element={<Dashbord />} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
