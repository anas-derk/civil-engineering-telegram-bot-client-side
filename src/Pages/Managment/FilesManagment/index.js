import { useEffect } from "react";
import { Link } from "react-router-dom";

function FilesManager({ pageTitle }) {
    useEffect(() => {
        document.title = `بوت الدورات - ${pageTitle}`;
    }, []);
    return (
        // Start Files Manager Page
        <div className="files-manager pt-5">
            {/* Start Content Section */}
            <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                <div className="container">
                    <h1 className="welcome-msg mb-4">مرحباً بك في صفحة إدارة الملفات الخاصة بك</h1>
                    <hr />
                    <Link className="btn btn-success request-manager-link w-25 mx-auto mb-4 d-block link" to="/managment/files-managment/add-new-file">إضافة ملف</Link>
                    <Link className="btn btn-danger manager-link w-25 mx-auto mb-4 link" to="/managment/files-managment/delete-file">حذف ملف</Link>
                </div>
            </section>
            {/* End Content Section */}
        </div>
        // End Files Manager Page
    );
} 

export default FilesManager;