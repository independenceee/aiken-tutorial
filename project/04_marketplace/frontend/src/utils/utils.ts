import { TransactionHistoryType } from "~/types/GenericsType";

export const convertNumberToSocialType = (number: number) => new Intl.NumberFormat().format(number);

export const convertTimestampToDateObject = (timestamp: number) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
};

export const isTransactionHistoryType = (data: TransactionHistoryType[]): data is TransactionHistoryType[] => {
    const item = data[0];
    return Array.isArray(data) && "date" in item && "txHash" in item && "status" in item;
};
