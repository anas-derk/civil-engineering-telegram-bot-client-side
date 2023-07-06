import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./Pages/Home/index"));
const Login = lazy(() => import("./Pages/Login/index"));
const Managment = lazy(() => import("./Pages/Managment/index"));
const AdsManagment = lazy(() => import("./Pages/Managment/AdsManagement/index.js"));
const FilesManagment = lazy(() => import("./Pages/Managment/FilesManagment/index"));
const AddNewFile = lazy(() => import("./Pages/Managment/FilesManagment/AddNewFile/index"));
const AddNewAd = lazy(() => import("./Pages/Managment/AdsManagement/AddNewAd/index"));
const PageNotFound = lazy(() => import("./Pages/404/index"));

function App() {
  return (
    <div className="App">
      <Suspense>
        <Routes>
          <Route path="/" element={<Home pageTitle="الصفحة الرئيسية" />}></Route>
          <Route path="/login" element={<Login pageTitle="صفحة تسجيل الدخول" />}></Route>
          <Route path="/managment" element={<Managment pageTitle="صفحة الإدارة" />}></Route>
          <Route path="/managment/ads-managment" element={<AdsManagment pageTitle="صفحة إدارة الإعلانات" />}></Route>
          <Route path="/managment/files-managment" element={<FilesManagment pageTitle="صفحة إدارة الملفات" />}></Route>
          <Route path="/managment/files-managment/add-new-file" element={<AddNewFile pageTitle="صفحة إضافة ملف جديد" />}></Route>
          <Route path="/managment/ads-managment/add-new-ad" element={<AddNewAd pageTitle="صفحة إضافة إعلان جديد" />}></Route>
          <Route path="*" element={<PageNotFound pageTitle="Page Not Found" />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
