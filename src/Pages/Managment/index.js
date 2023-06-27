import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Axios from "axios";
import data from "../../data";

function Managment({ pageTitle }) {

    const [year, setYear] = useState("");

    const [season, setSeason] = useState("");

    const [service, setService] = useState("");

    const [subject, setSubject] = useState("");

    const [file, setFile] = useState("");

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [isSuccessStatus, setIsSuccessStatus] = useState(false);

    const [errMsg, setErrMsg] = useState(false);

    const navigate = useNavigate();

    const subjectNames = {
        "first-year": {
            "first-season": [
                { subj: "1", optionValue: "1" },
                { subj: "2", optionValue: "2" },
            ],
            "second-season": [
                { subj: "3", optionValue: "3" },
                { subj: "4", optionValue: "4" },
            ],
        },
        "second-year": {
            "first-season": [
                { subj: "5", optionValue: "5" },
                { subj: "6", optionValue: "6" },
            ],
            "second-season": [
                { subj: "7", optionValue: "7" },
                { subj: "8", optionValue: "8" },
            ],
        },
        "third-year": {
            "first-season": [
                { subj: "9", optionValue: "9" },
                { subj: "10", optionValue: "10" },
            ],
            "second-season": [
                { subj: "11", optionValue: "11" },
                { subj: "12", optionValue: "12" },
            ],
        },
        "fourth-year": {
            "first-season": [
                { subj: "13", optionValue: "13" },
                { subj: "14", optionValue: "14" },
            ],
            "second-season": [
                { subj: "15", optionValue: "15" },
                { subj: "16", optionValue: "16" },
            ],
        },
        "fifth-year": {
            "first-season": [
                { subj: "17", optionValue: "17" },
                { subj: "18", optionValue: "18" },
            ],
            "second-season": [
                { subj: "19", optionValue: "19" },
                { subj: "20", optionValue: "20" },
            ],
        },
    }

    useEffect(() => {
        document.title = `بوت الدورات - ${pageTitle}`;
        let adminId = localStorage.getItem("courses-telegram-bot-admin-id");
        if (!adminId) {
            navigate("/login");
        } else {
            Axios.get(`${data.BASE_API_URL}/admin/admin-info/${adminId}`)
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
        formData.append("subject", subject);
        formData.append("file", file);
        try {
            const res = await Axios.post(`${data.BASE_API_URL}/admin/add-new-file`, formData, {
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
                    <option value="third-year">السنة الثالثة</option>
                    <option value="fourth-year">السنة الرابعة</option>
                    <option value="fifth-year">السنة الخامسة</option>
                </select>
                <select className="form-control p-3 mb-4" required onChange={(e) => setSeason(e.target.value)}>
                    <option value="" hidden>الرجاء اختيار الفصل</option>
                    <option value="first-season">الفصل الأول</option>
                    <option value="second-season">الفصل الثاني</option>
                </select>
                <select className="form-control p-3 mb-4" required onChange={(e) => setService(e.target.value)}>
                    <option value="" hidden>الرجاء اختيار الخدمة</option>
                    <option value="lectures">محاضرات</option>
                    <option value="courses">دورات</option>
                    <option value="medallion">نوط</option>
                </select>
                <select className="form-control p-3 mb-4" required onChange={(e) => setSubject(e.target.value)}>
                    <option value="" hidden>الرجاء اختيار المادة</option>
                    {year && season && subjectNames[year][season].map((subj, index) => (
                        <option value={subj.optionValue}>{ subj.subj }</option>
                    ))}
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