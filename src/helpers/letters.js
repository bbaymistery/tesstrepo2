
export const containsUppercase = (str) => /[A-Z]/.test(str);
export const lowercaseSecondLetter = (string) => string.charAt(1).toLowerCase() + string.slice(2);
export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
export function urlToTitle(params = {}) {
    let { url, linknamePage = false, pathnamePage = false } = params
    let title = ""
    let breadcrumbs = []
    //if it come from [linkname]
    if (linknamePage) {
        // Remove the leading slash
        title = url.slice(1);
        // Replace hyphens with spaces
        title = title.replace(/-/g, ' ');
        // Capitalize each word
        title = title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    //if it come from [..pathanme]
    if (pathnamePage) {
        // Split the URL into parts by slash and hyphen, and remove the first empty string if the URL starts with a slash
        const parts = url.split(/\/|-/).filter(part => part);

        // Capitalize the first letter of each part
        const capitalizedParts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1));

        // Always include the first part as a separate breadcrumb item
        const firstBreadcrumb = capitalizedParts[0]; // This is the airport name

        // Filter out duplicates for the rest of the title, excluding the first part
        const uniqueParts = parts.filter((part, index, self) => self.indexOf(part) === index);
        const uniqueCapitalizedParts = uniqueParts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
        // Join the unique parts into a single string, excluding the first part for the full title
        title = uniqueCapitalizedParts.join(' ');

        // Create the breadcrumb array
        breadcrumbs = [firstBreadcrumb, title];
    }
    return { title, breadcrumbs };
}