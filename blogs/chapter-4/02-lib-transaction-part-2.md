# aiken/transaction (P2)

### 8. Transaction

Một `Cardano Transaction`, như được thấy trong tập lệnh `Plutus`.
Lưu ý rằng đây là sự thể hiện của một giao dịch chứ không phải bản dịch 1: 1 của giao dịch như được thấy trong sổ cái. Đặc biệt, tập lệnh Plutus không thể nhìn thấy đầu vào bị khóa bởi địa chỉ bootstrap, đầu ra tới địa chỉ bootstrap hoặc chỉ siêu dữ liệu giao dịch.

```aiken
Transaction {
    inputs: List<Input>,
    reference_inputs: List<Input>,
    outputs: List<Output>,
    fee: Value,
    mint: MintedValue,
    certificates: List<Certificate>,
    withdrawals: Dict<StakeCredential, Int>,
    validity_range: ValidityRange,
    extra_signatories: List<Hash<Blake2b_224, VerificationKey>>,
    redeemers: Dict<ScriptPurpose, Redeemer>,
    datums: Dict<Hash<Blake2b_256, Data>, Data>,
    id: TransactionId,
}
```

### 9. TransactionId

Mã định danh giao dịch duy nhất, dưới dạng hàm băm của nội dung giao dịch. Lưu ý rằng id giao dịch không phải là hàm băm trực tiếp của mã `Transaction` hiển thị trên chuỗi. Đúng hơn, chúng tương ứng với các bản tóm tắt băm của nội dung giao dịch khi chúng được tuần tự hóa trên mạng.

```aiken
TransactionId {
    hash: Hash<Blake2b_256,
    Transaction>
}
```

### 10. ValidityRange

Khoảng thời gian POSIX, được đo bằng số mili giây kể từ 1970-01-01T00:00:00Z.

```aiken
ValidityRange = Interval<PosixTime>
```

## Functions

### 1. find_datum function

Tìm một Datum bằng hàm băm của nó, nếu có. Trước tiên, hàm này tìm kiếm các mốc thời gian trong tập hợp nhân chứng, sau đó tìm các mốc thời gian nội tuyến nếu nó không tìm thấy bất kỳ mốc thời gian nào trong các nhân chứng.

```aiken
find_datum(
    outputs: List<Output>,
    datums: Dict<Hash<Blake2b_256, Data>, Data>,
    datum_hash: Hash<Blake2b_256, Data>,
) -> Option<Data>
```

### 2. find_input function

Tìm đầu vào bằng `OutputReference`. Điều này thường được sử dụng kết hợp với Spend `ScriptPurpose` để tìm đầu vào của tập lệnh.

```aiken
find_input(
    inputs: List<Input>,
    output_reference: OutputReference,
) -> Option<Input>
```

##### Ví du

```aiken
validator {
    fn(datum, redeemer, ctx: ScriptContext) {
        expect Spend(my_output_reference) =
            ctx.purpose

        expect Some(input) =
            ctx.transaction.inputs
                |> transaction.find_input(my_output_reference)
    }
}
```

### find_script_outputs function

Tìm tất cả các kết quả đầu ra đang trả vào hàm băm tập lệnh đã cho, nếu có. Điều này rất hữu ích cho các hợp đồng chạy trên nhiều giao dịch.

```aiken
find_script_outputs(
    outputs: List<Output>,
    script_hash: Hash<Blake2b_224, Script>,
) -> List<Output>
```

### placeholder function

Một trình giữ chỗ/trống `Transaction` để làm cơ sở trong trình tạo giao dịch. Điều này đặc biệt hữu ích cho việc xây dựng các giao dịch thử nghiệm.

```aiken
use aiken/transaction

transaction.placeholder().id == TransactionId {
  hash: #"0000000000000000000000000000000000000000000000000000000000000000",
}

transaction.placeholder().validity_range == interval.everything()
```
