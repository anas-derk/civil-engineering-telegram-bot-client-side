import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function AdminLogin({ pageTitle }) {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [errMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        document.title = `بوت الدورات - ${pageTitle}`;

    }, []);

    const adminLogin = (e) => {
        e.preventDefault();
        Axios.get(`https://api.civil-engineering-tu.online/admin/login?email=${email}&password=${password}`)
            .then((res) => {
                let result = res.data;
                if (result === "عذراً البريد الالكتروني أو كلمة السر خاطئة ...") {
                    setErrorMsg(result);
                } else {
                    localStorage.setItem("courses-telegram-bot-admin-id", result);
                    navigate("/managment");
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="admin-login text-center p-5">
            <h1>مرحباً بك في صفحة تسجيل الدخول الخاصة بالمسؤول</h1>
            <hr className="mb-5" />
            <div className="container">
                <form className="admin-login-form mb-3" onSubmit={adminLogin}>
                    <input
                        type="email"
                        placeholder="الرجاء إدخال البريد الالكتروني"
                        className="form-control w-50 mx-auto mb-4 p-3"
                        required
                        onChange={(e) => setEmail(e.target.value.trim())}
                    />
                    <input
                        type="password"
                        placeholder="الرجاء إدخال كلمة السر"
                        className="form-control w-50 mx-auto mb-4 p-3"
                        required
                        onChange={(e) => setPassword(e.target.value.trim())}
                    />
                    <button type="submit" className="btn btn-success d-block mx-auto mb-4">تسجيل الدخول</button>
                </form>
                {errMsg && <p className="alert alert-danger">{errMsg}</p>}
            </div>
        </div>
    );
}

export default AdminLogin;