import { AccountItemType, AccountItemTypeType, CollectionItemType, NftItemType } from "@/types/GenericsType";

export type AccountContextType = {
    account: AccountItemType;
    setAccount: React.Dispatch<React.SetStateAction<AccountItemType>>;
    loadingAccount: boolean;

    assetsFromAddress: NftItemType[];
    setAssetsFromAddress: React.Dispatch<React.SetStateAction<NftItemType[]>>;
    currentPageAssetsFromAddress: number;
    setCurrentPageAssetsFromAddress: React.Dispatch<React.SetStateAction<number>>;
    totalPagesAssetsFromAddress: number;
    setTotalPagesAssetsFromAddress: React.Dispatch<React.SetStateAction<number>>;
    loadingAssetsFromAddress: boolean;
    setLoadingAssetsFromAddress: React.Dispatch<React.SetStateAction<boolean>>;

    likeAssetsFromAddress: NftItemType[];
    setLikeAssetsFromAddress: React.Dispatch<React.SetStateAction<NftItemType[]>>;
    currentPageLikeAssetsFromAddress: number;
    setCurrentPageLikeAssetsFromAddress: React.Dispatch<React.SetStateAction<number>>;
    loadingLikeAssetsFromAddress: boolean;
    setLoadingLikeAssetsFromAddress: React.Dispatch<React.SetStateAction<boolean>>;
    totalPagesLikeAssetsFromAddress: number;
    setTotalPagesLikeAssetsFromAddress: React.Dispatch<React.SetStateAction<number>>;

    createdAssetsFromAddress: NftItemType[];
    setCreatedAssetsFromAddress: React.Dispatch<React.SetStateAction<NftItemType[]>>;
    currentPageCreatedAssetsFromAddress: number;
    setCurrentPageCreatedAssetsFromAddress: React.Dispatch<React.SetStateAction<number>>;
    totalPagesCreatedAssetsFromAddress: number;
    setTotalPagesCreatedAssetsFromAddress: React.Dispatch<React.SetStateAction<number>>;
    loadingCreatedAssetsFromAddress: boolean;
    setLoadingCreatedAssetsFromAddress: React.Dispatch<React.SetStateAction<boolean>>;

    sellingAssetsFromAddress: NftItemType[];
    setSellingAssetsFromAddress: React.Dispatch<React.SetStateAction<NftItemType[]>>;
    currentPageSellingAssetsFromAddress: number;
    setCurrentPageSellingAssetsFromAddress: React.Dispatch<React.SetStateAction<number>>;
    totalPagesSellingAssetsFromAddress: number;
    setTotalPagesSellingAssetsFromAddress: React.Dispatch<React.SetStateAction<number>>;
    loadingSellingAssetsFromAddress: boolean;
    setLoadingSellingAssetsFromAddress: React.Dispatch<React.SetStateAction<boolean>>;
};
