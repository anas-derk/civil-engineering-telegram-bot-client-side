import { useEffect } from "react";
import { Link } from "react-router-dom";

function Home({ pageTitle }) {

    useEffect(() => {

        document.title = `بوت الدورات - ${pageTitle}`;

    }, []);

    return (
        <div className="home text-center p-5">
            <h1>مرحباً بك في صفحة لوحة التحكم الخاصة بالمسؤول لبوت التيلغرام</h1>
            <hr className="mb-5" />
            <Link to="/login" className="btn btn-success">تسجيل الدخول</Link>
        </div>
    );
}

export default Home;