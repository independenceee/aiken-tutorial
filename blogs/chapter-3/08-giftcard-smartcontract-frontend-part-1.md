# Vesting Smartcontract Giftcard - Part 1

Với phần dễ dàng này, chúng ta có thể bắt đầu xây dựng giao diện người dùng để tương tác với các hợp đồng thông minh của mình trong trình duyệt. NextJs là một lựa chọn thú vị để xây dưng hợp đồng thông minh.

## Nội dung bài học

1. Cài đặt một dự án frontend (nextjs)
2. Cách lấy file `plutus.json` và đọc `validator` được biên dịch trong khi biên dịch hợp đồng thông minh
3. Định nghĩa Datum và Redeemer ứng với hợp đồng thông minh
4. Tạo một giao diện cơ bản
5. Thực hiện kết nối ví
6. Viết các hàm Lock và Un Lock để tương tác với hợp đồng
7. Tương tác giao diện với hợp đồng thông minh

### 1. Cài đặt một dự án frontend (nextjs)

Trong dự án này chúng ta sẻ sử dụng `Nextjs` làm công cụ để xây dựng ra các tính năng tương tác với hợp đồng thông minh `hello world` để có thể sử dụng được `Nextjs` thì điểu kiên tiên quyết phải có là `Nodejs` bằng cách kiểm tra

```sh
node --version
> v18.17.0
```

`NodeJs` nên sử dụng ưu tiên từ version 16 trở nên. đồng thời với `Nodejs` là `npm` và `npx`. Được rồi để tạo dự án chúng ta cần sử dụng

```sh
npx create-next-app@latest giftcard-frontend
cd giftcard-frontend
npm run dev
```

Dự án được chạy trên PORT 3000 như vậy dự án được cài đặt thành công. Trong dự án này còn có hai thư viện quan trong khác cần phải được cài đặt đó là `lucid-cardano` và `cbor-x`. Hai thư viện này chịu trách nhiệm chính trong việc tương tác với hợp đồng thông minh. Khi đã cài đặt thành công hay bắt đầu một bài học thú vị hơn.

```sh
npm install lucid-cardano cbor-x
```

Thực hiện kiểm tra trong package.json đã xuất hiện hai gói quan trong này chưa đồng thời bài học này chúng ta sẽ sử dụng taildwindcss làm công cụ để styles.

```json
{
    // ...
    "dependencies": {
        "cbor-x": "^1.5.8",
        "lucid-cardano": "^0.10.7"
    }
    /// ...
}
```

### 2. Cách lấy file `plutus.json` và đọc `validator` được biên dịch trong khi biên dịch hợp đồng thông minh

Khi `aiken build` thì chúng ta cũng đã biên địch được hợp đồng và từ đó file `plutus.json` được tạo. Tiếp đến thực hiện việc copy file và đưa và dự án frontend bằng cách tạo thư mục `libs` trong `src`. giờ đây chỉ cần viết một hàm đọc `validator`. Hãy nhập `readValidators` tệp mới tệp của chúng tôi và sử dụng tệp đó trong trình xử lý phía máy chủ. Điều này sẽ cho phép chúng tôi truy cập dữ liệu trong `Home` thành phần trang dưới dạng đạo cụ trang mà sau đó chúng tôi sẽ sử dụng để hiển thị mã đã biên dịch của trình xác thực.

```ts
import { encode } from "cbor-x";
import {
    MintingPolicy,
    SpendingValidator,
    fromHex,
    toHex,
} from "lucid-cardano";
import giftcard from "~/libs/plutus.json";

export type Validators = {
    redeem: SpendingValidator;
    giftCard: MintingPolicy;
};

const readValidators = function (): Validators {
    const redeemValidator = giftcard.validators.find(function (validator) {
        return validator.title === "contract.redeem";
    });

    const giftCardValidator = giftcard.validators.find(function (validator) {
        return validator.title === "contract.gift_card";
    });

    if (!giftCardValidator) {
        throw new Error("Validator gift card not found.");
    }

    if (!redeemValidator) {
        throw new Error("Validator redeem not found.");
    }

    const redeemScript: string = toHex(
        encode(fromHex(redeemValidator.compiledCode))
    );
    return {
        redeem: {
            type: "PlutusV2",
            script: redeemScript,
        },
        giftCard: {
            type: "PlutusV2",
            script: giftCardValidator.compiledCode,
        },
    };
};

export default readValidators;
```

Trong đây, Hàm đọc `validator` thực chất thực hiện đọc trình xác thực từ bản thiết kế (`plutus.json`) mà chúng ta đã tạo trước đó. Chúng tôi cũng cần chuyển đổi nó sang định dạng mà `Lucid` có thể hiểu được. Điều này được thực hiện bằng cách tuần tự hóa trình xác nhận và sau đó chuyển đổi nó thành chuỗi văn bản thập lục phân.

Không có gì đặc biệt ở đây cả. Chúng tôi chỉ đọc `plutus.json` tệp và tìm mã được biên dịch cho trình xác nhận `redeem` và `gift_card`. Chúng tôi cũng đang xuất một loại cho trình xác nhận để chúng tôi có thể sử dụng nó trên đảo của mình sau này. Việc chức năng này có khả năng gây ra lỗi chỉ là một cách để báo hiệu cho chúng ta biết rằng chúng ta đã làm sai điều gì đó.



### 3. Định nghĩa Datum và Redeemer ứng với hợp đồng thông minh

### 4. Tạo một giao diện cơ bản
