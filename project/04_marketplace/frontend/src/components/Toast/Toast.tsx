import React from "react";
import { ToastContainer } from "react-toastify";

type Props = {};

const Toast = function ({}: Props) {
    return (
        <React.Fragment>
            <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        </React.Fragment>
    );
};

export default Toast;
