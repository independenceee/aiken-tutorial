import React, { useContext } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./HeaderUtilities.module.scss";
import { ClipLoader } from "react-spinners";
import { AccountContextType } from "~/types/contexts/AccountContextType";
import AccountContext from "~/contexts/components/AccountContext";
import Avatar from "~/components/Avatar";

const cx = classNames.bind(styles);

type Props = {
    className?: string;
};

const HeaderUtilities = function ({ className }: Props) {
    // const { cartItem } = useContext<CartContextType>(CartContext);
    const { loading, account } = useContext<AccountContextType>(AccountContext);
    // const { toggleShowingSearch, toggleShowingCart } = useContext<ModalContextType>(ModalContext);
    return (
        <div className={cx("button__other", className)}>
            <div className={cx("icon__container")}>
                <FontAwesomeIcon
                    icon={faCartShopping}
                    // onClick={toggleShowingCart}
                />
                <span>{0}</span>
            </div>
            {loading && <ClipLoader size={20} color="#7000ff" loading={loading} speedMultiplier={1} />}
            {account && <Avatar url={account?.wallet_address} image={account?.avatar} />}
        </div>
    );
};

export default HeaderUtilities;
