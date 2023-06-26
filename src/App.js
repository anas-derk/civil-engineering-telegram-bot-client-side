import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./Pages/Home/index"));
const Login = lazy(() => import("./Pages/Login/index"));
const Managment = lazy(() => import("./Pages/Managment/index"));
const PageNotFound = lazy(() => import("./Pages/404/index"));

function App() {
  return (
    <div className="App">
      <Suspense>
        <Routes>
          <Route path="/" element={<Home pageTitle="الصفحة الرئيسية" />}></Route>
          <Route path="/login" element={<Login pageTitle="صفحة تسجيل الدخول" />}></Route>
          <Route path="/managment" element={<Managment pageTitle="صفحة إدارة الملفات" />}></Route>
          <Route path="*" element={<PageNotFound pageTitle="Page Not Found" />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
