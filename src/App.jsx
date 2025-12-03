import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginDriver from "./compenents/loginDrive";
import RegisterDriver from "./compenents/register";
import ForgotPassword from "./compenents/forgetPassword";
import VerifyCode from "./compenents/verfycode";
import ResetPassword from "./compenents/resetpassword";
import UpdateProfile from "./compenents/updateDrive";
import Dashbord from "./compenents/dashbord";
import LoginCompany from "./compenents/company/loginCompany";
import CompanyForm from "./compenents/company/register";
import UpdateCompany from "./compenents/company/updateCompany";
import ForgotPasswordCompany from "./compenents/company/forgetPassword";
import VerifyCodeCompany from "./compenents/company/verfycode";
import ResetPasswordCompany from "./compenents/company/resetpassword";
import DashbordCompany from "./compenents/company/dashbord";
import CompanyJobsList from "./compenents/company/joblist";
import AddJob from "./compenents/company/addjob";
import JobDetail from "./compenents/company/jobDetail";
import DriverJobsList from "./compenents/DriverJobs";
import DriverApplicationsStatus from "./compenents/driverjobsstatus";
import JobApplicationsForCompany from "./compenents/company/JobApplicationsForCompany";
import CompanyUpdateApplicationStatus from "./compenents/company/CompanyUpdateApplicationStatus";
import CompanyApplicationsList from "./compenents/company/CompanyApplicationsList";



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
        <Route path="/driver/jobs" element={<DriverJobsList />} />
        <Route path="/driver/applications-status" element={<DriverApplicationsStatus />} />





                {/* صفحة تسجيل الدخول */}
        <Route path="/company/login" element={<LoginCompany />} />

        {/* صفحة إنشاء الحساب */}
        <Route path="/company/register" element={<CompanyForm />} />

        {/* صفحة نسيان كلمة السر */}
        <Route path="/company/forgot-password" element={<ForgotPasswordCompany />} />

        {/* صفحة التحقق من رمز إعادة التعيين */}
        <Route path="/company/verify-reset" element={<VerifyCodeCompany />} />

        {/* صفحة إعادة تعيين كلمة السر */}
        <Route path="/company/reset-password" element={<ResetPasswordCompany />} />

        {/* صفحة الملف الشخصي */}
        <Route path="/company/profile" element={<UpdateCompany />} />

        {/* لوحة التحكم الخاصة بالشركة */}
        <Route path="/company/dashboard" element={<DashbordCompany />} />


        <Route path="/company/job" element={<CompanyJobsList />} />
        <Route path="/company/job/add" element={<AddJob />} />
        <Route path="/company/job/:id" element={<JobDetail />} />

        <Route path="/company/job/:id/applications" element={<JobApplicationsForCompany />} />
        <Route path="/company/application/:id/update-status" element={<CompanyUpdateApplicationStatus  />} />
        <Route path="/company/applications" element={<CompanyApplicationsList />} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
