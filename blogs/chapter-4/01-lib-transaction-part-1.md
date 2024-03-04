# aiken/transaction (P1)

## Types

### 1. Datum

##### NoDatum

##### DatumHash(Hash<Blake2b256, Data>)

Một mốc thời gian được tham chiếu bởi bản tóm tắt băm của nó.

##### InlineDatum(Data)

Một mốc thời gian hoàn toàn được nội tuyến trong đầu ra.

### 2. Input

-   Input tạo từ một tham chiếu đầu ra và giá trị được giải quyết liên quan đến đầu ra đó.

```aiken
Input { output_reference: OutputReference, output: Output }
```

### 3. Output

-   Một giao dịch Output, có địa chỉ, giá trị và các tham chiếu tập lệnh và dữ liệu tùy chọn.

```aiken
Output {
    address: Address,
    value: Value,
    datum: Datum,
    reference_script: Option<Hash<Blake2b_224, Script>>,
}
```

### 4. OutputReference

-   OutputReference là một tham chiếu duy nhất cho một đầu ra trên chuỗi. Tương `output_index` ứng với vị trí trong danh sách đầu ra của giao dịch (được xác định bằng id của nó) tạo ra đầu ra đó

```aiken
OutputReference {
    transaction_id: TransactionId,
    output_index: Int
}
```

### 5. Redeemer

-   Một loại bí danh dành cho `Redeemer`, được chuyển tới các tập lệnh để xác thực. Nó `Data` mờ vì nó do người dùng xác định và tập lệnh có trách nhiệm phân tích nó thành dạng mong đợi.

```aiken
Redeemer = Data
```

### 6. ScriptContext

-   Bối cảnh được sổ cái Cardano cung cấp cho tập lệnh khi được thực thi.
-   Ngữ cảnh chứa thông tin về toàn bộ giao dịch có chứa tập lệnh. Giao dịch cũng có thể chứa các tập lệnh khác; để phân biệt giữa nhiều tập lệnh, tập lệnh này `ScriptContext` cũng chứa tập `purpose` lệnh cho biết tập lệnh nào (hoặc vì mục đích gì) của giao dịch đang được thực thi.

```aiken
ScriptContext {
    transaction: Transaction,
    purpose: ScriptPurpose
}
```

### 7. ScriptPurpose

-   Đặc trưng cho loại tập lệnh đang được thực thi.

##### Mint(PolicyId)

Đối với các tập lệnh được thực thi dưới dạng chính sách Mint/Burn, để chèn hoặc xóa nội dung khỏi lưu thông. Nó được tham số hóa bằng mã định danh của chính sách liên quan.

##### Spend(OutputReference)

Đối với các tập lệnh được sử dụng làm thông tin xác thực thanh toán cho các địa chỉ trong kết quả đầu ra giao dịch. Chúng chi phối quy tắc mà theo đó đầu ra mà chúng tham chiếu có thể được chi tiêu.

##### WithdrawFrom(StakeCredential)

Đối với các tập lệnh xác thực việc rút tiền thưởng từ tài khoản thưởng.
Đối số xác định tài khoản phần thưởng mục tiêu.

##### Publish(Certificate)

Cần thiết khi ủy quyền cho một nhóm sử dụng thông tin xác thực cổ phần được xác định dưới dạng tập lệnh Plutus. Mục đích này cũng được kích hoạt khi hủy đăng ký thông tin xác thực cổ phần đó. Nó nhúng chứng chỉ đang được xác thực.
