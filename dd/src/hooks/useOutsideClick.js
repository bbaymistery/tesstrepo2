import { useEffect, useState } from "react";
export function useOutsideClick(ref) {
    const [clickedOutside, setclickedOutside] = useState(false)
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) setclickedOutside(true)
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [ref]);
    return clickedOutside
}
