import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./Pages/Home/index"));
const PageNotFound = lazy(() => import("./Pages/404/index"));

function App() {
  return (
    <div className="App">
      <Suspense>
        <Routes>
          <Route path="/" element={<Home pageTitle="الصفحة الرئيسية" />}></Route>
          <Route path="*" element={<PageNotFound pageTitle="Page Not Found" />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
