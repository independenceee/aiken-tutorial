import { AccountItem, CategoryItemType, FounderItemType, GuideItemType, NftItemType } from "./GenericsType";

export type DemarketContextType = {
    categories: Array<CategoryItemType>;
    loadingCategories: boolean;

    founders: Array<FounderItemType>;
    loadingFounders: boolean;

    accounts: Array<AccountItem>;
    loadingAccounts: boolean;
    currentPageAccounts: number;
    totalPagesAccounts: number;
    setCurrentPageAccounts: React.Dispatch<React.SetStateAction<number>>;

    addNft: ({ policyId, assetName }: NftItemType) => Promise<any>;
};
