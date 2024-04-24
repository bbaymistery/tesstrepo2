export function formatPriceInTitle(title) {
    // Regular expression to find the price pattern
    const pricePattern = /£\d+/g;

    return title.replace(pricePattern, match => {
        // Convert the found price to a float and format it to two decimal places
        return parseFloat(match.slice(1)).toFixed(2).replace(/^(\d+)/, '£$1');
    });
}
