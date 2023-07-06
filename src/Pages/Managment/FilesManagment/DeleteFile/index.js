import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Axios from "axios";
import data from "../../../../data";

function DeleteFile({ pageTitle }) {

    const [year, setYear] = useState("");

    const [season, setSeason] = useState("");

    const [service, setService] = useState("");

    const [subject, setSubject] = useState("");

    const [filesList, setFilesList] = useState([]);

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [isSuccessStatus, setIsSuccessStatus] = useState(false);

    const [errMsg, setErrMsg] = useState(false);

    const [errFileType, setErrFileType] = useState("");

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

    const getSubjectFiles = async (e) => {
        e.preventDefault();
        setIsWaitStatus(true);
        try {
            const res = await Axios.get(`${data.BASE_API_URL}/admin/subject-files?year=${year}&season=${season}&service=${service}&subject=${subject}`);
            const result = await res.data;
            console.log(result);
            setIsWaitStatus(false);
            setFilesList(result);
        }
        catch (err) {
            setIsWaitStatus(false);
            setErrMsg("عذراً يوجد خطأ ، الرجاء إعادة العملية");
            setTimeout(() => {
                setErrMsg("");
            }, 2000);
        }
    }

    const deleteFile = (e, fileId, fileUrl) => {
        e.preventDefault();
        Axios.delete(`${data.BASE_API_URL}/admin/ads/delete-ads/${fileId}?fileUrl=${fileUrl}`)
            .then((res) => {
                if (res.data === "تم حذف الإعلان بنجاح") document.location.reload();
                else {
                    setErrMsg("عذراً ، حدثت مشكلة الرجاء إعادة المحاولة");
                    setTimeout(() => {
                        setErrMsg("عذراً ، حدثت مشكلة الرجاء إعادة المحاولة");
                    }, 2000);
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        // Start Delete File Page
        <div className="delete-file d-flex flex-column align-items-center justify-content-center">
            <h1 className="bg-danger p-3 text-white mb-4">مرحباً بك في صفحة حذف ملف</h1>
            {/* Start Show Files Form */}
            <form className="show-files-form w-50" onSubmit={getSubjectFiles}>
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
                    {year && season && data.subjectNames[year][season].map((subj, index) => (
                        <option value={subj.optionValue} key={index}>{subj.subj}</option>
                    ))}
                </select>
                {!isWaitStatus && !isSuccessStatus && !errMsg && <button type="submit" className="btn btn-dark p-3 w-50">عرض الملفات</button>}
                {isWaitStatus && <button type="submit" className="btn btn-warning p-3 w-50" disabled>جاري عرض الملفات  ...</button>}
                {/* {isSuccessStatus && <button type="submit" className="btn btn-success p-3 w-50">مبارك ، لقد نجحت العملية ...</button>} */}
                {errMsg && <button type="submit" className="btn btn-danger p-3 w-50">{errMsg}</button>}
            </form>
            {/* End Show Files Form */}
            {/* Start Files Table */}
            <hr />
            {filesList.length > 0 ? (
                <table className="files-list-table">
                    <tbody>
                        {filesList.map((file) => (
                            <tr key={file._id}>
                                <td>
                                    {file.name}
                                </td>
                                <td>
                                    <form
                                        className="delete-file-form"
                                        onSubmit={(e) => deleteFile(e, file._id, file.fileUrl)}
                                    >
                                        <button type="submit" className="btn btn-danger p-3">
                                            حذف الملف
                                        </button>
                                        {errMsg && <button className="btn btn-danger p-3">
                                            {errMsg}
                                        </button>}
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ): <p className="alert alert-danger">عذراً لا توجد ملفات حالياً أو لم تقم بتحديد خيارات الملفات المطلوبة ..</p>}
            {/* End Files Table */}
        </div>
        // End Delete File Page
    );
}

export default DeleteFile;