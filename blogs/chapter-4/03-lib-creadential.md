# aiken/transaction/certificate & aiken/transaction/credential

## Certificate

Chứng chỉ trên chuỗi chứng thực một số hoạt động. Xuất bản chứng chỉ/kích hoạt các loại quy tắc khác nhau; hầu hết thời gian, họ yêu cầu chữ ký từ/các khóa cụ thể.

```aiken
CredentialRegistration {
    delegator: StakeCredential
}
```

```aiken
CredentialDeregistration {
    delegator: StakeCredential
}
```

```aiken
CredentialDelegation {
    delegator: StakeCredential,
    delegatee: PoolId
}
```

```aiken
PoolRegistration {
    pool_id: PoolId,
    vrf: Hash<Blake2b_224, VerificationKey>
}
```

```aiken
PoolDeregistration {
    pool_id: PoolId,
    epoch: Int
}
```

```aiken
Governance
```

```aiken
TreasuryMovement
```

## Credential

### 1. Address

Cardano `Address` thường chứa một hoặc hai tài liệu tham khảo thông tin xác thực.
Lưu ý rằng các địa chỉ bootstrap kế thừa (còn gọi là 'địa chỉ Byron') bị loại trừ hoàn toàn khỏi bối cảnh Plutus. Do đó, từ góc độ trên chuỗi chỉ tồn tại các địa chỉ loại 00, 01, …, 07 như được nêu chi tiết trong `CIP-0019 :: Địa chỉ Shelley `.

```aiken
Address {
    payment_credential: PaymentCredential,
    stake_credential: Option<StakeCredential>,
}
```

### 2. Credential

Cấu trúc chung để biểu diễn một chuỗi `Credential`.
Thông tin xác thực luôn thuộc một trong hai loại: cặp khóa công khai/riêng tư trực tiếp hoặc tập lệnh (gốc hoặc Plutus).

```aiken
VerificationKeyCredential(Hash<Blake2b_224, VerificationKey>)

ScriptCredential(Hash<Blake2b_224, Script>)
```

### 3. PaymentCredential

`PaymentCredential` thể hiện các điều kiện chi tiêu liên quan đến một số đầu ra. Kể từ đây,

-   `VerificationKeyCredential` nắm bắt một đầu ra bị khóa bởi cặp khóa chung/riêng;
-   `ScriptCredential` ghi lại đầu ra bị khóa bởi tập lệnh gốc hoặc tập lệnh Plutus.

```aiken
PaymentCredential = Credential
```

### 4. PoolId

Mã định danh nhóm cổ phần duy nhất, dưới dạng hàm băm của khóa xác minh chủ sở hữu của nó.

```aiken
PoolId = Hash<Blake2b_224, VerificationKey>
```

### 5. Referenced\<a>

Đại diện cho một loại đối tượng có thể được biểu diễn nội tuyến (bằng hàm băm) hoặc thông qua một tham chiếu (tức là một con trỏ tới một vị trí trên chuỗi).

Điều này chủ yếu được sử dụng để thu thập các con trỏ tới chứng chỉ đăng ký thông tin xác thực cổ phần trong trường hợp được gọi là địa chỉ con trỏ.

```aiken
Inline(a)

Pointer {
    slot_number: Int,
    transaction_index: Int,
    certificate_index: Int
}
```

### 6. Script

```aiken
Script = ByteArray
```

### 7. Signature

```aiken
Signature = ByteArray
```

### 8. StakeCredential

`StakeCredential` đại diện cho việc ủy ​​quyền và điều kiện rút thưởng được liên kết với một số địa chỉ / tài khoản cổ phần.

`StakeCredential` được cung cấp nội tuyến hoặc bằng cách tham chiếu bằng cách sử dụng con trỏ trên chuỗi.

Đọc thêm về con trỏ trong `CIP-0019::Pointer` .

```aiken
StakeCredential = Referenced<Credential>
```

### VerificationKey

```aiken
VerificationKey = ByteArray
```

## Functions

### 1. from_script function

Trình xây dựng thông minh cho `Address` từ hàm băm tập lệnh . `Address` không có quyền ủy quyền nào.

```aiken
from_script(script: Hash<Blake2b_224, Script>) -> Address
```

### 2. from_verification_key function

Trình xây dựng thông minh cho `Address` từ hàm băm khóa xác minh . `Address` kết quả không có quyền ủy quyền nào.

```aiken
from_verification_key(vk: Hash<Blake2b_224, VerificationKey>) -> Address
```

### 3. verify_signature function

Xác minh chữ ký `Ed25519` bằng khóa xác minh đã cho. Trả về `True` khi chữ ký hợp lệ.

```aiken
verify_signature(key: VerificationKey, msg: ByteArray, sig: Signature) -> Bool
```

### 4. with_delegation_key function

Đặt (hoặc đặt lại) phần ủy quyền của Địa chỉ bằng cách sử dụng hàm băm khóa xác minh . Điều này rất hữu ích khi kết hợp với `from_verification_key` hoặc `from_script`.

```aiken
with_delegation_key(
    self: Address,
    vk: Hash<Blake2b_224, VerificationKey>,
) -> Address
```

### 5. with_delegation_script function

```aiken
with_delegation_script(
    self: Address,
    script: Hash<Blake2b_224, Script>,
) -> Address
```

Đặt (hoặc đặt lại) phần ủy quyền của Địa chỉ bằng cách sử dụng hàm băm tập lệnh . Điều này rất hữu ích khi kết hợp với `from_verification_key` hoặc `from_script`.
