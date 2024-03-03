# Vesting Frontend

Trong bài học trước chúng ta cũng đã tìm hiểu và viết thành công hợp đồng Vesting và chạy chúng trên Command Line Interface. Bây giờ, nếu các bạn có một hợp đồng thông minh khá chất lượng nhưng các bạn không thể hướng dẫn người ta chạy trên câu lệnh được vì thế các bạn cần có các nút để thực hiện việc xử lý sự kiện thay vì câu lệnh. Để giải quyết vấn đề đó bài học này sẽ giúp cho các bạn tương tác thành công hợp đồng `vesting` với giao diện

### Nội dung bài học

1. Tạo một dự án nextjs cơ bản ( Trong bài học này mình sẽ sử dụng nextjs làm framework frontend chính để thực hiện tương tác với hợp đồng thông minh)
2. Thực hiện đọc các `Validator` từ file `plutus.json`
3. Định nghĩa các Datum và Redeemer ứng với hợp đồng thông minh
4. Kết nối ví thông qua Lucid và Api của Blockfrost
5. Viết các chức năng thực hiện việc Lock và UnLock tài sản

### Điều kiên tiên quyết

Để bắt đầu bài học này cần phải có nội dung cơ bản sau:

1. Môi trường phải có NodeJS.
2. Hiểu biết sơ qua về một vài thư viện frontend.
3. Hiểu các hoạt động và làm việc của hợp đông `vesting`.
4. Nắm vững các kiến thức cơ bản về Blockchain.

### 1. Tạo Dự án Nextjs

Cần phải kiểm tra xem Nodejs có trong môi trường làm việc của bạn chưa thông qua

```sh
node --version
v18.17.0
```

Nếu chưa có nodejs thì tải nodejs trên tràn chủ chính thức của nodejs song hành với nodejs là npm và npx

```sh
npm -v
9.8.1

npx -v
9.8.1
```

Trong dự án này mình thực hiện làm bằng nextjs mình sẽ sử dụng nextjs làm thư viện frontend chính để tương tác với blockchain. Để khởi tạo một dự án nextjs cần thực hiện

```sh
npx create-next-app vesting-frontend
cd vesting-frontend
npm run dev
```

sau khi khởi tạo dự án thành công lệnh `npm run dev` giúp chạy dự án trên môi trường phát triển. dự án sẽ được chạy trên PORT = 3000 như vậy việc khởi tạo dự án được thực hiện thành công.

### 2. Thực hiện đọc các Validator từ file plutus.json

Trong thư mục src của dự án nextjs thực hiện tạo một thu mục có lên là libs. Thư mục này chuyên để các validator của dự án các validator được sinh ra trong quá trình thực hiện build smartcontract khi đã thực hiện thành công bây giờ chúng ta cùng thực hiện đọc validator để sử dụng cho hợp đồng thông minh.

```ts
import { SpendingValidator, fromHex, toHex } from "lucid-cardano";
import { encode } from "cbor-x";
import vesting from "~/libs/plutus.json";

const readValidator = function (): SpendingValidator {
    // Tìm kiểm xem có validator trong file plutus.json không ???
    const vestingValidator = vesting.validators.find(function (validator) {
        return validator.title === "contract.vesting";
    });

    // Kiểm tra validator trong plutus.json
    if (!vestingValidator) {
        throw new Error("Vesting validator not found.");
    }

    // Thực hiện encode validator theo mã chuẩn của cbor-x
    const vestingScript: string = toHex(
        encode(fromHex(vestingValidator.compiledCode))
    );

    // Trả về validator theo plutusV2
    return {
        type: "PlutusV2",
        script: vestingScript,
    };
};

export default readValidator;
```

Trong hàm `readValidator` sẽ thực hiện dọc `validator` của `vesting` trả về nếu có và trả về script theo phutusV2.

### 3. Định nghĩa datum và redeemer theo hợp đồng thông minh.

Thực hiện tạo folder constants trong thư mục src tiếp theo sẽ tạo file redeemer và định nghĩa redeemer

```ts
import { Data } from "lucid-cardano";
export const redeemer = Data.void();
```

Trong hợp đồng thông minh Vesting datum có giá trị là kiểu Void bên mình sẽ định nghĩa redeemer theo `Data.void()`

Tiếp theo sẽ thực hiện đinh nghĩa datum trước tiên cần tạo file datum.ts để xây dựng datum ứng với datum trong hợp đồng.

```ts
import { Data } from "lucid-cardano";

const VestingDatumSchema = Data.Object({
    lock_until: Data.Integer(),
    owner: Data.Bytes(),
    beneficiary: Data.Bytes(),
});

type VestingDatum = Data.Static<typeof VestingDatumSchema>;
export const VestingDatum = VestingDatumSchema as unknown as VestingDatum;
```

### 4. Kết nối ví thông qua Lucid và Api của Blockfrost

Trong dự án này mình sẽ dùng lucid làm công cụ để kết nối ví trong này mình sẽ sử dụng nami làm ví chính đê thực hiện tương tác với Blockchain. Trước tiên mình cần tạo folder contexts trong thư mục src sau đó tạo các context tương ứng để thực hiện với nhiều mục đích khác nhau đồng thời dễ quản lý trang web hơn về mặt toàn cục.

```ts
"use client";

import React, { ReactNode, useContext, useState } from "react";
import { Blockfrost, Lucid } from "lucid-cardano";
import WalletContext from "~/contexts/components/WalletContext";
import LucidContext from "~/contexts/components/LucidContext";
import { LucidContextType } from "~/types/contexts/LucidContextType";

type Props = {
    children: ReactNode;
};

const WalletProvider = function ({ children }: Props) {
    const { setLucid } = useContext<LucidContextType>(LucidContext);

    const connect = async function () {
        try {
            const lucid: Lucid = await Lucid.new(
                new Blockfrost(
                    process.env.BLOCKFROST_PROPROD_RPC_URL as string,
                    process.env.BLOCKFROST_PROPROD_API as string
                ),
                "Preprod"
            );
            lucid.selectWallet(await window.cardano.nami.enable());
            setLucid(lucid);
        } catch (error) {
            console.log(error);
        }
    };

    const disconnect = async function () {
        try {
            setLucid(null!);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <WalletContext.Provider
            value={{
                connect,
                disconnect,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export default WalletProvider;
```


Trong đây minh sẽ viết hàm thức hiện connect ví và disconnect ví khỏi blockchain mình sẽ thực hiên lưu hai biến môi trường `process.env.BLOCKFROST_PROPROD_RPC_URL as string` và `process.env.BLOCKFROST_PROPROD_API as string` trong dự án này mình sẽ sử dụng mạnh Prepod là mạng chính để thực hiện tương tác với blockchain 

### 5. Viết các chức năng thực hiện việc Lock và UnLock tài sản


Để thực hiện lock tài sản và blockchain mình sẽ thực hiện tạo ra các ràng buộc với hợp đồng thông minh bằng việc sử dụng các datum và redeemer như trước để ép các điều kiện vào đủ cho việc thục hiện giao dịch `lockUntil` trong đây được sử dụng làm điều kiện chỉ mốc thời gian tài sản sẽ được unlock khỏi hợp đông thông minh đồng thời sẽ thực hiện đọc các validator đã được xây dụng từ trước đồng thời biên dịch ra địa chỉ của hợp đồng thông minh sau đó sẽ soạn một giao dịch với các điều kiến được định nghĩa từ trước cùng với một và ada chúng ta sẽ kí và được rồi giao dịch đã thành công.


```ts
import { Data, Lucid, TxComplete, TxHash, TxSigned } from "lucid-cardano";
import { VestingDatum } from "~/constants/datum";
import readValidator from "~/utils/read-validator";

type Props = {
    lucid: Lucid;
    lockUntil: bigint;
    lovelace: bigint;
};

const vestingLock = async function ({
    lucid,
    lockUntil,
    lovelace,
}: Props): Promise<TxHash> {
    const ownerPublicKeyHash: string = lucid.utils.getAddressDetails(
        await lucid.wallet.address()
    ).paymentCredential?.hash as string;

    const beneficiaryPublicKeyHash: string = lucid.utils.getAddressDetails(
        await lucid.wallet.address()
    ).paymentCredential?.hash as string;

    const datum = Data.to(
        {
            beneficiary: beneficiaryPublicKeyHash,
            owner: ownerPublicKeyHash,
            lock_until: lockUntil,
        },
        VestingDatum
    );

    const validator = readValidator();
    const contractAddress: string = lucid.utils.validatorToAddress(validator);
    const tx: TxComplete = await lucid
        .newTx()
        .payToContract(
            contractAddress,
            { inline: datum },
            { lovelace: lovelace }
        )
        .complete();

    const signedTx: TxSigned = await tx.sign().complete();
    const txHash: TxHash = await signedTx.submit();
    lucid.awaitTx(txHash);

    console.log(txHash);
    return txHash;
};

export default vestingLock;
```


Sau khi quá trình Lock tài sản được thực hiện thành công thì chúng ta sẽ lấy lại tài sản mà đã bị lock và hợp đông thông minh bằng việc viết hàm un lock. 


```ts
import { Data, Lucid, TxComplete, TxHash, TxSigned, UTxO } from "lucid-cardano";
import readValidator from "~/utils/read-validator";
import { VestingDatum } from "~/constants/datum";
import { redeemer } from "~/constants/redeemer";

type Props = {
    lucid: Lucid;
};

const vestingUnLock = async function ({ lucid }: Props): Promise<TxHash> {
    const beneficiaryPublicKeyHash = lucid.utils.getAddressDetails(
        await lucid.wallet.address()
    ).paymentCredential?.hash as string;

    const validator = readValidator();
    const contractAddress = lucid.utils.validatorToAddress(validator);
    const scriptUtxos = await lucid.utxosAt(contractAddress);
    const currentTime = new Date().getTime();
    const laterTime = new Date(currentTime + 2 * 60 * 60 * 1000).getTime();

    const utxos: UTxO[] = scriptUtxos.filter(function (utxo) {
        let datum = Data.from(utxo.datum!, VestingDatum);

        return (
            datum.beneficiary === beneficiaryPublicKeyHash &&
            datum.lock_until <= currentTime
        );
    });

    const tx: TxComplete = await lucid
        .newTx()
        .collectFrom(utxos, redeemer)
        .addSigner(await lucid.wallet.address())
        .validFrom(currentTime)
        .validTo(laterTime)
        .attachSpendingValidator(validator)
        .complete();

    const signedTx: TxSigned = await tx.sign().complete();

    const txHash: TxHash = await signedTx.submit();

    await lucid.awaitTx(txHash);

    console.log(txHash);
    return txHash;
};

export default vestingUnLock;
```
