function getOrdinal(n: number) {
    var s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const convertDatetimePrisma = function (datetime: string) {
    const date = new Date(datetime);
    const formatted_date_time =
        date.toLocaleString("en-US", { weekday: "long" }) +
        ", " +
        getOrdinal(date.getDate()) +
        " " +
        date.toLocaleString("en-US", { month: "long" }) +
        " " +
        date.getFullYear();

    return formatted_date_time;
};

export default convertDatetimePrisma;
