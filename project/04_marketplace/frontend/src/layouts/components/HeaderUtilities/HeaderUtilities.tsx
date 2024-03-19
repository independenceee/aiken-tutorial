import React, { useContext } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./HeaderUtilities.module.scss";
import { ModalContextType } from "@/types/ModalContextType";
import { AccountContextType } from "@/types/AccountContextType";
import AccountContext from "@/contexts/components/AccountContext";
import Avatar from "@/components/Avatar";
import { ClipLoader } from "react-spinners";
import { CartContextType } from "@/types/CartContextType";
import CartContext from "@/contexts/components/CartContext";
import ModalContext from "@/contexts/components/ModalContext";

const cx = classNames.bind(styles);

type Props = {
    className?: string;
};

const HeaderUtilities = function ({ className }: Props) {
    const { cartItem } = useContext<CartContextType>(CartContext);
    const { account, loadingAccount } = useContext<AccountContextType>(AccountContext);
    const { toggleShowingSearch, toggleShowingCart } = useContext<ModalContextType>(ModalContext);
    return (
        <div className={cx("button__other", className)}>
            <div className={cx("icon__container")}>
                <FontAwesomeIcon icon={faMagnifyingGlass} onClick={toggleShowingSearch} />
            </div>
            <div className={cx("icon__container")}>
                <FontAwesomeIcon icon={faCartShopping} onClick={toggleShowingCart} />
                <span>{cartItem.totalQuantity}</span>
            </div>
            {loadingAccount && <ClipLoader size={20} color="#7000ff" loading={loadingAccount} speedMultiplier={1} />}
            {account && <Avatar account={account} />}
        </div>
    );
};

export default HeaderUtilities;
