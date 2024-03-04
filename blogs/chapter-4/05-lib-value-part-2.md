# aiken/transaction/value

## Functions

### 1. add function

-   Thêm số lượng (dương hoặc âm) của một mã thông báo vào một giá trị. Điều này hiệu quả hơn so `merge` với một tài sản duy nhất.

```aiken
add(
    self: Value,
    policy_id: PolicyId,
    asset_name: AssetName,
    quantity: Int,
) -> Value
```

### 2. flatten function

Làm phẳng một giá trị dưới dạng danh sách 3 bộ (PolicyId, AssetName, Amount).
Tiện dụng để thao tác các giá trị dưới dạng danh sách thống nhất.

```aiken
flatten(self: Value) -> List<(PolicyId, AssetName, Int)>
```

### 3. flatten_with function

Làm phẳng một giá trị dưới dạng danh sách kết quả, có thể loại bỏ một số giá trị trong quá trình thực hiện.
Khi hàm biến đổi trả về `None`, kết quả sẽ bị loại bỏ hoàn toàn.

```aiken
flatten_with(
    self: Value,
    with: fn(PolicyId, AssetName, Int) -> Option<result>,
) -> List<result>
```

### 4. from_asset function

Xây dựng a `Value` từ mã định danh tài sản (tức là `PolicyId`+ `AssetName`) và một số lượng nhất định.

```aiken
from_asset(policy_id: PolicyId, asset_name: AssetName, quantity: Int) -> Value
```

### 5. from_lovelace function

Xây dựng một `Value` từ một số lượng đáng yêu.
Lời nhắc thân thiện: 1 Ada = 1.000.000 Lovelace

```aiken
from_lovelace(quantity: Int) -> Value
```

### 6. from_minted_value function

Chuyển đổi 1 `MintedValue` thành 1 `Value`.

```aiken
from_minted_value(self: MintedValue) -> Value
```

### 7. lovelace_of function

Một phiên bản chuyên biệt `quantity_of` dành cho tiền Ada.

```aiken
lovelace_of(self: Value) -> Int
```

### 8. merge function

Kết hợp hai `Value` lại với nhau.

```aiken
merge(left: Value, right: Value) -> Value
```

### 9. negate function

Phủ định số lượng của tất cả các mã thông báo (bao gồm cả Ada) trong Value.

```aiken
negate(self: Value) -> Value

v1
  |> value.negate
  |> value.merge(v1)
  |> value.is_zero
// True
```

### 10. policies(self: Value) -> List<PolicyId>

-   Danh sách tất cả các chính sách mã thông báo trong Giá trị đó với mã thông báo khác 0.

```aiken
policies(self: Value) -> List<PolicyId>
```

### 11. quantity_of function

Trích xuất số lượng của một tài sản nhất định.

```aiken
quantity_of(self: Value, policy_id: PolicyId, asset_name: AssetName) -> Int
```

### 12. to_dict function

Chuyển đổi giá trị thành một từ điển từ điển.

```aiken
to_dict(self: Value) -> Dict<PolicyId, Dict<AssetName, Int>>
```

### 13. to_minted_value function

Chuyển đổi a Value thành a MintedValue.

```aiken
to_minted_value(self: Value) -> MintedValue
```

### 14. tokens function

Nhận tất cả các mã thông báo được liên kết với một chính sách nhất định.

```aiken
tokens(self: Value, policy_id: PolicyId) -> Dict<AssetName, Int>
```

### 15. without_lovelace function

Nhận một Value loại trừ Ada.

```aiken
without_lovelace(self: Value) -> Value
```

### 16. zero function

Tạo một cái trống Value không có gì trong đó.

```aiken
zero() -> Value
```
