export const hourss =
    Array.from(new Array(24)).map((m, i) => ({ id: i + 1, value: i < 10 ? `0${i}` : String(i) }))

export const minutess =
    Array.from(new Array(12)).map((m, i) => ({ id: i, value: ((i + 1 - 1) * 5) }))