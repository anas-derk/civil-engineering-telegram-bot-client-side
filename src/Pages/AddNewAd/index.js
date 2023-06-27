import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Axios from "axios";
import data from "../../data";

function AddNewAd({ pageTitle }) {

    const [adContent, setAdContent] = useState("");

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
        try {
            const res = await Axios.post(`${data.BASE_API_URL}/admin/add-new-ad`, {
                content: adContent,
            });
            const result = await res.data;
            setTimeout(() => {
                setIsWaitStatus(false);
                if (result === "عذراً يوجد إعلان سابق بنفس المحتوى تماماً") {
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
        // Start Add New Ad Page
        <div className="add-new-ad d-flex flex-column align-items-center justify-content-center">
            <h1 className="bg-danger p-3 text-white mb-4">مرحباً بك في صفحة إضافة إعلان جديد</h1>
            <form className="ad-new-ad-form w-50" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="الرجاء إدخال محتوى الإعلان"
                    className="form-control p-3 mb-4"
                    required
                    onChange={(e) => setAdContent(e.target.value)}
                />
                {!isWaitStatus && !isSuccessStatus && !errMsg && <button type="submit" className="btn btn-dark p-3 w-50">إضافة</button>}
                {isWaitStatus && <button type="submit" className="btn btn-warning p-3 w-50" disabled>جاري الإضافة  ...</button>}
                {isSuccessStatus && <button type="submit" className="btn btn-success p-3 w-50">مبارك ، لقد نجحت العملية ...</button>}
                {errMsg && <button type="submit" className="btn btn-danger p-3 w-50">{errMsg}</button>}
            </form>
        </div>
        // End Add New Ad Page
    );
}

export default AddNewAd;