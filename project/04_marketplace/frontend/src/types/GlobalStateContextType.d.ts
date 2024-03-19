import { RevalidateType } from "./GenericsType";

export type GlobalStateContextType = {
    revalidate: RevalidateType;
    setRevalidate: React.Dispatch<React.SetStateAction<RevalidateType>>;
};
