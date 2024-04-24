
export const swapArray = (arr, from, to) => {
    arr.splice(from, 1, arr.splice(to, 1, arr[from])[0]);
    return arr
}