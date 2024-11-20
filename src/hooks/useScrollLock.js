import { useState } from "react";

const useScrollLock = () => {
    const [scrollPosition, setScrollPosition] = useState(0); // Save scroll position

    const lockScroll = () => {
        const currentScroll = window.pageYOffset; // Get current scroll position
        setScrollPosition(currentScroll); // Save it to state
        document.body.style.position = "fixed";
        document.body.style.top = `-${currentScroll}px`;
        document.body.style.overflow = "hidden";
        document.body.style.width = "100%"; // Prevent horizontal overflow
    };

    const unlockScroll = () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.overflow = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollPosition); // Restore previous scroll position
    };

    return { lockScroll, unlockScroll };
};

export default useScrollLock;
