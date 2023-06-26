import { useEffect } from "react";

function PageNotFound({ pageTitle }) {

    useEffect(() => {

        document.title = `Blog - ${pageTitle}`;
    
    }, []);

    return (
        // Start Page Not Found
        <div className="page-not-found mb-5">
            <h1 className="alert alert-danger text-center">Error 404: This Page is not found !!</h1>
        </div>
        // End Page Not Found
    );
}

export default PageNotFound;