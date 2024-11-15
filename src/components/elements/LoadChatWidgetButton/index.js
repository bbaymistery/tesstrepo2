import React, { useState, useEffect } from "react";
import styles from  "./styles.module.scss"
const LoadChatWidgetButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show the button only on desktop screens (width > 990px)
        if (window.innerWidth > 990) {
            setIsVisible(true);
        }
    }, []);

    const handleClick = () => {
        // Check if the viewport width is greater than 990 pixels
        if (window.innerWidth > 990) {
            // Load Zendesk snippet script
            if (!document.getElementById("ze-snippet")) {
                const zendeskScript = document.createElement("script");
                zendeskScript.id = "ze-snippet";
                zendeskScript.src = "https://static.zdassets.com/ekr/snippet.js?key=473f7b02-4850-4045-8010-1fedf9752180";
                zendeskScript.async = true;
                document.body.appendChild(zendeskScript);
            }

            // Load custom chat widget script
            if (!document.querySelector('script[src*="chat_widget.js"]')) {
                const chatWidgetScript = document.createElement("script");
                chatWidgetScript.src = "https://www.airport-pickups-london.com/js/chat_widget.js?112";
                chatWidgetScript.async = true;
                document.body.appendChild(chatWidgetScript);
            }
        }

        // Hide the button after it is clicked
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <button className={styles.chatButton} onClick={handleClick}>
            Load Chat Widget
        </button>
    );
};

export default LoadChatWidgetButton;
