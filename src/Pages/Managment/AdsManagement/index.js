import { useEffect } from "react";
import { Link } from "react-router-dom";

function AdsManager({ pageTitle }) {
    useEffect(() => {
        document.title = `بوت الدورات - ${pageTitle}`;
    }, []);
    return (
        // Start Ads Manager Page
        <div className="ads-manager pt-5">
            {/* Start Content Section */}
            <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                <div className="container">
                    <h1 className="welcome-msg mb-4">مرحباً بك في صفحة إدارة الإعلانات الخاصة بك</h1>
                    <hr />
                    <Link className="btn btn-success request-manager-link w-25 mx-auto mb-4 d-block link" to="/managment/ads-managment/add-new-ad">إضافة إعلان</Link>
                    <Link className="btn btn-danger manager-link w-25 mx-auto mb-4 link" to="/ads-manager/delete-ads">حذف إعلان</Link>
                </div>
            </section>
            {/* End Content Section */}
        </div>
        // End Ads Manager Page
    );
} 

export default AdsManager;