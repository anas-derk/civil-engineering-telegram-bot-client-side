import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";

function Home({ pageTitle }) {

    const [year, setYear] = useState("");

    const [season, setSeason] = useState("");

    const [service, setService] = useState("");

    const [fileUrl, setFileUrl] = useState("");

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [isSuccessStatus, setIsSuccessStatus] = useState(false);

    const [errMsg, setErrMsg] = useState(false);

    useEffect(() => {

        document.title = `بوت الدورات - ${pageTitle}`;

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsWaitStatus(true);
        try {
            const res = await axios.post(`http://localhost:4000/admin/add-new-file`, {
                year,
                season,
                service,
                fileUrl,
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
                    type="text"
                    placeholder="الرجاء إدخال رابط الملف"
                    className="form-control p-3 mb-4"
                    required
                    onChange={(e) => setFileUrl(e.target.value)}
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

export default Home;