export const getTodayStartTimeUTC = (): number => {
    return Date.UTC(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate(),
        0,
        0,
        0,
        0
    );
}

export const getTodayEndTimeUTC = (): number => {
    return Date.UTC(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate(),
        23,
        59,
        59,
        999
    );
}