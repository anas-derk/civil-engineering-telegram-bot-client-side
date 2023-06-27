import { useEffect } from "react";
import { Link } from "react-router-dom";

function Managment({ pageTitle }) {

    useEffect(() => {

        document.title = `بوت الدورات - ${pageTitle}`;

    }, []);

    return (
        <div className="home text-center p-5">
            <h1>مرحباً بك في صفحة الإدارة الخاصة بالمسؤول لبوت التيلغرام</h1>
            <hr className="mb-5" />
            <Link to="/add-new-file" className="btn btn-success d-block w-25 mx-auto mb-4">إضافة ملف جديد</Link>
            <Link to="/add-new-ad" className="btn btn-success d-block w-25 mx-auto">إضافة إعلان جديد</Link>
        </div>
    );
}

export default Managment;