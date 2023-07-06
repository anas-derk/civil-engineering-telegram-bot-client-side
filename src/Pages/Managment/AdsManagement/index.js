import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";

function AdsManager({ pageTitle }) {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = pageTitle;
        let adminId = localStorage.getItem("mr-fix-admin-id");
        if (!adminId) {
            navigate("/dashboard/admin/login");
        } else {
            Axios.get(`${process.env.BASE_API_URL}/admin/admin-info/${adminId}`)
                .then((res) => {
                    let result = res.data;
                    if (result === "عذراً ، حساب المسؤول غير موجود") {
                        localStorage.removeItem("mr-fix-admin-id");
                        navigate("/dashboard/admin/login");
                    }
                })
                .catch((err) => console.log(err));
        }
    }, []);
    return (
        // Start Ads Manager Page
        <div className="ads-manager">
            {/* Start Content Section */}
            <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                <div className="container">
                    <h1 className="welcome-msg mb-4">مرحباً بك في صفحة إدارة الإعلانات الخاصة بك في مستر فيكس</h1>
                    <Link className="btn btn-success request-manager-link w-25 mx-auto mb-4 d-block link" to="/dashboard/admin/admin-panel/ads-manager/add-ads">إضافة إعلان</Link>
                    <Link className="btn btn-danger manager-link w-25 mx-auto mb-4 link" to="/ads-manager/delete-ads">حذف إعلان</Link>
                </div>
            </section>
            {/* End Content Section */}
        </div>
        // End Ads Manager Page
    );
} 

export default AdsManager;