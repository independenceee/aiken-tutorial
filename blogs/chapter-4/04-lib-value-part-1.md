# aiken/transaction/value

## Types

1. AssetName

Bí danh loại cho 'AssetName`, là mảng byte dạng tự do trong khoảng từ 0 đến 32 byte.

```aiken
AssetName= ByteArray
```

1. MintedValue

-   Một giá trị đa tài sản có thể được tìm thấy khi thực hiện giao dịch. Lưu ý rằng vì lý do lịch sử, điều này hơi khác so với Value kết quả đầu ra giao dịch. Lưu ý rằng bạn không bao giờ phải tự mình xây dựng một công cụ `MintedValue`. Nếu bạn cần thao tác với nhiều giá trị nội dung, hãy sử dụng `Value`.

1. PolicyId

-   Bí danh loại cho a `PolicyId`. 1 `PolicyId` luôn dài 28 byte

```aiken
PolicyId = Hash<Blake2b_224, Script>
```

1. Value

-   Một đầu ra đa tài sản `Value`. Chứa các mã thông báo được lập chỉ mục bởi `PolicyId` và `AssetName` . Loại này duy trì một số bất biến bằng cách xây dựng; đặc biệt, a `Value` sẽ không bao giờ chứa số lượng bằng 0 của một mã thông báo cụ thể.

## Constants

1. ada_asset_name: ByteArray = #""

-   Ada, loại tiền tệ bản địa, không được liên kết với bất kỳ loại tiền nào `AssetName` (không thể đúc Ada!). Theo quy ước, nó là một tệp `ByteArray`.

2. ada_policy_id: ByteArray = #""

-   Ada, loại tiền tệ bản địa, không được liên kết với bất kỳ loại tiền nào `PolicyId` (không thể đúc Ada!). Theo quy ước, nó là một tệp `ByteArray`.
