import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Axios from "axios";

function Managment({ pageTitle }) {

    const [year, setYear] = useState("");

    const [season, setSeason] = useState("");

    const [service, setService] = useState("");

    const [file, setFile] = useState("");

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [isSuccessStatus, setIsSuccessStatus] = useState(false);

    const [errMsg, setErrMsg] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = `بوت الدورات - ${pageTitle}`;
        let adminId = localStorage.getItem("courses-telegram-bot-admin-id");
        if (!adminId) {
            navigate("/login");
        } else {
            Axios.get(`http://localhost:4000/admin/admin-info/${adminId}`)
                .then((res) => {
                    let result = res.data;
                    if (result === "عذراً ، حساب المسؤول غير موجود") {
                        localStorage.removeItem("courses-telegram-bot-admin-id");
                        navigate("/login");
                    }
                })
                .catch((err) => console.log(err));
        }

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsWaitStatus(true);
        let formData = new FormData();
        formData.append("year", year);
        formData.append("season", season);
        formData.append("service", service);
        formData.append("file", file);
        try {
            const res = await Axios.post(`http://localhost:4000/admin/add-new-file`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            const result = await res.data;
            setTimeout(() => {
                setIsWaitStatus(false);
                if (result === "عذراً يوجد ملف سابق بنفس الرابط تماماً") {
                    setErrMsg(result);
                    setTimeout(() => {
                        setErrMsg("");
                    }, 2000);
                } else {
                    setIsSuccessStatus(true);
                    setTimeout(() => {
                        setIsSuccessStatus(false);
                    }, 1500);
                }
            }, 2000);
        }
        catch (err) {
            setIsWaitStatus(false);
            setErrMsg("عذراً يوجد خطأ ، الرجاء إعادة العملية");
            setTimeout(() => {
                setErrMsg("");
            }, 2000);
        }
    }

    return (
        // Start Home Page
        <div className="home d-flex flex-column align-items-center justify-content-center">
            <h1 className="bg-danger p-3 text-white mb-4">مرحباً بك في صفحة الأدمن</h1>
            <form className="admin-form w-50" onSubmit={handleSubmit}>
                <select className="form-control p-3 mb-4" required onChange={(e) => setYear(e.target.value)}>
                    <option value="" hidden>الرجاء اختيار السنة</option>
                    <option value="first-year">السنة الأولى</option>
                    <option value="second-year">السنة الثانية</option>
                </select>
                <select className="form-control p-3 mb-4" required onChange={(e) => setSeason(e.target.value)}>
                    <option value="" hidden>الرجاء اختيار الفصل</option>
                    <option value="first-season">الفصل الأول</option>
                    <option value="second-season">الفصل الثاني</option>
                </select>
                <select className="form-control p-3 mb-4" required onChange={(e) => setService(e.target.value)}>
                    <option value="" hidden>الرجاء اختيار الخدمة</option>
                    <option value="medallion">نوط</option>
                    <option value="courses">دورات</option>
                    <option value="lectures">محاضرات</option>
                </select>
                <input
                    type="file"
                    placeholder="الرجاء إدخال رابط الملف"
                    className="form-control p-3 mb-4"
                    required
                    onChange={(e) => setFile(e.target.files[0])}
                />
                {!isWaitStatus && !isSuccessStatus && !errMsg && <button type="submit" className="btn btn-dark p-3 w-50">إرسال</button>}
                {isWaitStatus && <button type="submit" className="btn btn-warning p-3 w-50" disabled>جاري الإرسال  ...</button>}
                {isSuccessStatus && <button type="submit" className="btn btn-success p-3 w-50">مبارك ، لقد نجحت العملية ...</button>}
                {errMsg && <button type="submit" className="btn btn-danger p-3 w-50">{errMsg}</button>}
            </form>
        </div>
        // End Page Not Found
    );
}

export default Managment;