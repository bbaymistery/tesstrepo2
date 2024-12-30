// env.js
const manualConfig = { //for backup file in case i cant reach configurationjson to avoid application server error
    API_SERVER_ORIGIN: "https://api.london-tech.com",
    FILES_SERVER_ORIGIN: "https://files.london-tech.com",
    DRIVERS_SERVER_ORIGIN: "https://drivers.london-tech.com",
    DRIVERS_APP_WS_SERVER_ORIGIN: "https://drivers-app-ws.london-tech.com",
    APLCARSEAT_SERVER_ORIGIN: "https://aplcarseat.com",
    GPS_SERVER_ORIGIN: "https://gps.london-tech.com",
    WSS_SERVER_ORIGIN: "https://web-socket.london-tech.com",
    TOOLS_SERVER_ORIGIN: "https://tools.london-tech.com",
    version: 4,
};
const getEnvConfig = (config) => {
    const isDevelopment = false; // localohst -> true || live -> false
    return {
        websiteDomain: isDevelopment ? "http://localhost:3500" : "https://www.airport-pickups-london.com",
        apiDomain: config?.API_SERVER_ORIGIN || manualConfig.API_SERVER_ORIGIN, // Use API domain from config or manual fallback
        status: {
            success: 200,
            error: 403,
            badRequest: 400,
            unauthorized: 401,
            forbidden: 403,
            methodNotAllowed: 405,
            notAcceptable: 406,
            internalServerError: 500,
        },
    };
};

export async function fetchConfig() {
    try {
        const configFetch = await fetch('https://env.london-tech.com/configration.json');
        if (!configFetch.ok) {
            console.error('Failed to fetch configuration. Falling back to manual config.');
            return getEnvConfig(manualConfig);
        }
        const config = await configFetch.json();
        return getEnvConfig(config);
    } catch (error) {
        console.error('Error fetching configuration:', error);
        return getEnvConfig(manualConfig);
    }
}