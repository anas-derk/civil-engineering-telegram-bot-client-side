import { useEffect, useState } from "react";
import Axios from "axios";
import data from "../../../../data";
import "./index.css";

function DeleteAds({ pageTitle }) {

    const [adsList, setAdsList] = useState([]);

    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        document.title = `بوت الدورات - ${pageTitle}`;
        Axios.get(`${data.BASE_API_URL}/admin/ads/all-ads`)
            .then((res) => {
                const result = res.data;
                setAdsList(result);
            });
    }, []);
    const deleteAds = (e, adsId) => {
        e.preventDefault();
        Axios.delete(`${data.BASE_API_URL}/admin/ads/delete-ads/${adsId}`)
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
    };
    return (
        // Start Delete Ads Page
        <div className="delete-ads">
            {/* Start Content Section */}
            <section className="content text-center pt-5 pb-5">
                {/* Start Container Component From Bootstrap */}
                <div className="container">
                    <h1 className="welcome-msg mb-4">مرحباً بك في صفحة حذف الإعلانات الخاصة بك</h1>
                    <hr />
                    {adsList.length > 0 ? (
                        <table className="ads-list-table">
                            <tbody>
                                {adsList.map((ads) => (
                                    <tr key={ads._id}>
                                        <td>
                                            {ads.content}
                                        </td>
                                        <td>
                                            <form
                                                className="delete-ads-form"
                                                onSubmit={(e) => deleteAds(e, ads._id)}
                                            >
                                                <button type="submit" className="btn btn-danger p-3">
                                                    حذف الإعلان
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
                    ) : (
                        <p className="alert alert-danger">عذراً لا يوجد أي إعلانات حالياً</p>
                    )}
                </div>
                {/* End Container Component From Bootstrap */}
            </section>
            {/* End Content Section */}
        </div>
        // End Delete And Edit Ads Page
    );
}

export default DeleteAds;