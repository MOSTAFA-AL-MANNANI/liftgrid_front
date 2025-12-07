import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginDriver from "./compenents/loginDrive";
import RegisterDriver from "./compenents/register";
import ForgotPassword from "./compenents/forgetPassword";
import VerifyCode from "./compenents/verfycode";
import ResetPassword from "./compenents/resetpassword";
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
import NavbarDriver from "./compenents/navbarDriver";
import NavbarCompany from "./compenents/company/navbarComapny";
import Index from "./compenents/lainding page";
import ChooseRole from "./compenents/lainding page/ChoseRole";
import { Footer } from "./compenents/lainding page/footer";
import DriverLayout from "./compenents/layouats/Driver";
import CompanyLayout from "./compenents/layouats/Company";
import CompanyDetail from "./compenents/company/detail";
import DriverDetail from "./compenents/detailDriver";
import UpdateDriver from "./compenents/updateDrive";
import { About } from "./compenents/lainding page/about";
import { Home } from "./compenents/lainding page/home";
import { Services } from "./compenents/lainding page/services";
import PageLayout from "./compenents/layouats/page";




function App() {


  return (
    <>
          <BrowserRouter>
      <Routes>

        <Route path="/" element={<PageLayout><Home /></PageLayout>} />
        <Route path="/about" element={<PageLayout><About /></PageLayout>} />
        <Route path="/services" element={<PageLayout><Services /></PageLayout>} />
        <Route path="/choserole" element={<PageLayout><ChooseRole /></PageLayout>} />
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
        

        {/* لوحة التحكم الخاصة بالسائق */}
        <Route path="/driver/dashboard" element={<DriverLayout><Dashbord /></DriverLayout>} />
        <Route path="/driver/jobs" element={<DriverLayout><DriverJobsList /></DriverLayout>} />
        <Route path="/driver/applications-status" element={<DriverLayout><DriverApplicationsStatus /></DriverLayout>} />
        <Route path="/driver/profile" element={<DriverLayout><UpdateDriver /></DriverLayout>} />
        <Route path="/driver/profile/voir" element={<DriverLayout><DriverDetail /></DriverLayout>} />




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
        <Route path="/company/profile" element={<CompanyLayout><UpdateCompany /></CompanyLayout>} />

        <Route path="/company/dashboard" element={<CompanyLayout><DashbordCompany /></CompanyLayout>} />


        <Route path="/company/job" element={<CompanyLayout><CompanyJobsList /></CompanyLayout>} />
        <Route path="/company/job/add" element={<CompanyLayout><AddJob /></CompanyLayout>} />
        <Route path="/company/job/:id" element={<CompanyLayout><JobDetail /></CompanyLayout>} />
        <Route path="/company/detail" element={<CompanyLayout><CompanyDetail /></CompanyLayout>} />

        <Route path="/company/job/:id/applications" element={<CompanyLayout><JobApplicationsForCompany /></CompanyLayout>} />
        <Route path="/company/application/:id/update-status" element={<CompanyLayout><CompanyUpdateApplicationStatus  /></CompanyLayout>} />
        <Route path="/company/applications" element={<CompanyLayout><CompanyApplicationsList /></CompanyLayout>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
