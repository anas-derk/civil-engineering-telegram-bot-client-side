import { useEffect, useState } from "react";
import Axios from "axios";

function DeleteAds({ pageTitle }) {

    const [adsList, setAdsList] = useState([]);

    useEffect(() => {
        document.title = `بوت الدورات - ${pageTitle}`;
        Axios.get(`${process.env.BASE_API_URL}/admin/ads/all-ads`)
        .then((res) => {
            const result = res.data;
            setAdsList(result);
        });
    }, []);
    const deleteAds = (e, adsId) => {
        e.preventDefault();
        Axios.delete(`${process.env.BASE_API_URL}/admin/ads/delete-ads/${adsId}`)
            .then(() => {
                document.location.reload();
            })
            .catch((err) => console.log(err));
    };
    return (
        // Start Delete Ads Page
        <div className="delete-and-ads">
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