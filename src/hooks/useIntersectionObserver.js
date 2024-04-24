import { useEffect } from 'react';

const useIntersectionObserver = (selector, callback, options) => {
    useEffect(() => {
        const elements = document.querySelectorAll(selector);
        const observer = new IntersectionObserver(callback, options);
        elements.forEach((el) => observer.observe(el));

        return () => {
            // Cleanup: Disconnect the observer when the component unmounts
            elements.forEach((el) => observer.unobserve(el));
        };
    }, [selector, callback, options]);
};

export default useIntersectionObserver;
