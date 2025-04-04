// env.js

const getEnvConfig = (config) => {
    const isDevelopment = false; // localohst -> true || live -> false
    return {
        websiteDomain: isDevelopment
        ? "http://localhost:8500"
        : "https://agency.airport-pickups.london.com", 
        apiDomain: config.API_SERVER_ORIGIN || "https://api.london-tech.com", // Use API domain from config
        status: {
            success: 200,
            error: 403,
            success: 200,
            badRequest: 400,
            unauthorized: 401,
            forbidden: 403,
            methodNotAllowed: 405,
            notAcceptable: 406,
            internalServerError: 500,
        },
        a: "Sss"
    };
};

export async function fetchConfig() {
    const configFetch = await fetch('https://env.london-tech.com/configration.json');
    const config = await configFetch.json();
    return getEnvConfig(config);
}

/*
          apiDomain: "https://api.london-tech.com",
apiDomain: "https://api-backup.london-tech.com",
*/