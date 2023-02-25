export const validateRangeByField = (
    min: number, max: number
) => <T extends Record<string, string | number | string[]>, K extends keyof T>(obj: T) => (field: K) => {
    return obj[field] >= min && obj[field] <= max;
};
