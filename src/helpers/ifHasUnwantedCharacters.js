//if input has unwanted characters
export const ifHasUnwantedCharacters = (value) => {
    if (value.includes('"') || value.includes(`'`) || value.includes('/') || value.includes('\\')) return true
}



// Helper function to check for unwanted query strings
/**
 * Checks if the given pathname and query parameters match any unwanted query strings, and returns the corresponding redirect path if a match is found.
 * @param {string} pathname - The current pathname.
 * @param {Object} query - The current query parameters.
 * @param {Object[]} unwantedQueryRoutes - An array of objects, where each object has a query string and a corresponding redirect path.
 * @returns {string|null} - The redirect path if a match is found, or null if no match is found.
 */
export function checkUnwantedQuery(pathname, query, unwantedQueryRoutes) {
    for (const route of unwantedQueryRoutes) {
      const [queryString, redirectPath] = Object.entries(route)[0];
  
      // Check if the query matches any unwanted query string
      if (pathname.includes(queryString) || Object.keys(query).some((key) => queryString.includes(key))) {
        return redirectPath; // Return the redirect target if found
      }
    }
    return null; // No match found
  }
  