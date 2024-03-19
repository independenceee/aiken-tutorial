"use client";

import React, { useState, useEffect } from "react";

const useModal = function () {
    const [isShowing, setIsShowing] = useState<boolean>(false);

    useEffect(
        function () {
            if (isShowing) {
                document.body.style.overflowY = "hidden";
            } else {
                document.body.style.overflowY = "auto";
            }
        },
        [isShowing],
    );

    const toggle = function () {
        setIsShowing(!isShowing);
    };

    return {
        isShowing,
        toggle,
    };
};

export default useModal;
