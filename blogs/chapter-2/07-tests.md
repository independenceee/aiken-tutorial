# Test

### Tổng quan

Aiken cung cấp sự hỗ trợ cho việc viết và thực thi các bài kiểm tra. Bạn có thể viết các bài kiểm tra trực tiếp trong mã của mình và chạy chúng một cách nhanh chóng bằng cách sử dụng công cụ aiken check.

Để viết bài kiểm tra trong Aiken, bạn sử dụng từ khóa test, như sau:

```aiken
test foo() {
  1 + 1 == 2
}
```

Mỗi bài kiểm tra là một hàm được đặt tên không có đối số và trả về một giá trị boolean. Bài kiểm tra được coi là hợp lệ nếu nó trả về True.

Bạn có thể viết các bài kiểm tra ở bất kỳ đâu trong mã của mình và chúng có thể thực hiện lệnh gọi hàm và sử dụng các hằng số như bình thường. Tuy nhiên, các bài kiểm tra không thể gọi các bài kiểm tra khác. Nếu bạn muốn sử dụng lại mã giữa các bài kiểm tra, bạn có thể tạo một hàm riêng.

Mặc dù khung thử nghiệm còn đơn giản ở thời điểm hiện tại, nhưng nó vẫn hữu ích. Trong tương lai, Aiken dự kiến sẽ giới thiệu các đối số cho các bài kiểm tra để biến chúng thành các thuộc tính hoàn chỉnh. Các đối số sẽ được tạo ngẫu nhiên và các bài kiểm tra sẽ được thực hiện hàng trăm lần.

Một điều thú vị về các bài kiểm tra là chúng sử dụng cùng một máy ảo với máy thực thi hợp đồng trên chuỗi. Nói cách khác, chúng là các đoạn mã thực tế trên chuỗi mà bạn có thể chạy và suy luận trong cùng bối cảnh với mã sản xuất của bạn.

### Test reports

Đây là một ví dụ minh họa về cách viết một hàm đơn giản cùng với các bài kiểm tra đơn vị:

```aiken
fn add_one(n: Int) -> Int {
  n + 1
}

test add_one_1() {
  add_one(0) == 1
}

test add_one_2() {
  add_one(-42) == -41
}
```

Khi chạy aiken check trên dự án của chúng ta, chúng ta sẽ nhận được một báo cáo tương tự như sau:

```sh
aiken check
    Compiling aiken-lang/stdlib 1.7.0 (D:\Workspace\aiken-tutorial\project\05_aution\smart_contract\build\packages\aiken-lang-stdlib)
    Compiling independence/smart_contract 0.0.0 (D:\Workspace\aiken-tutorial\project\05_aution\smart_contract)
      Testing ...
    ┍━ index ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    │ PASS [mem: 1003, cpu: 622510] add_one_1
    │ PASS [mem: 1003, cpu: 622510] add_one_2
    ┕━━━━━━━━━━ 2 tests | 2 passed | 0 failed
Summary
    0 errors, 0 warnings
```

Chạy `aiken check` trên dự án của chúng tôi cung cấp cho chúng tôi báo cáo sau:

Như bạn có thể thấy, báo cáo kiểm tra được nhóm theo mô-đun và cung cấp thông tin về bộ nhớ và thời gian thực thi CPU cần thiết cho mỗi bài kiểm tra. Điều này có nghĩa là bạn có thể sử dụng các bài kiểm tra như điểm chuẩn để thử nghiệm các phương pháp khác nhau và so sánh chi phí thực hiện của chúng.

Các bài kiểm tra có thể phức tạp tùy ý; không giống như các tập lệnh trên chuỗi, chúng không có bất kỳ giới hạn thực thi nào.

### Automatic diffing

Người chạy thử nghiệm của Aiken cố gắng cung cấp thông tin hữu ích khi một bài kiểm tra thất bại. Nếu một bài kiểm tra thất bại, người chạy thử nghiệm sẽ cố gắng cung cấp thông tin về những gì đã xảy ra để giúp bạn gỡ lỗi dễ dàng hơn. Điều này đặc biệt hiệu quả khi bạn viết các bài kiểm tra sử dụng các toán tử so sánh như ==, >=, vv.

Ví dụ: Hãy thêm một bài kiểm tra thất bại vào ví dụ trước:

```aiken
// ... phần còn lại của tập tin không thay đổi
test add_one_3() {
  add_one(1) == 1
}
```

Khi chạy aiken check trên dự án của chúng ta, chúng ta sẽ nhận được một thông báo lỗi cụ thể, cho biết lý do thất bại của bài kiểm tra. Thông điệp này có thể cung cấp thông tin về các giá trị được đánh giá và giúp bạn hiểu rõ hơn về tình trạng thất bại.

Tuy nhiên, hãy lưu ý rằng đánh giá được hiển thị trong Untyped Plutus Core (UPLC), là ngôn ngữ thực thi thực tế trên blockchain. Điều này có ý nghĩa là bạn có thể gỡ lỗi và hiểu được những gì đang diễn ra trên chuỗi.

### Testing failures

Đôi khi, bạn muốn xác nhận rằng một đoạn mã cụ thể sẽ gây ra lỗi. Điều này được gọi là "lỗi dự kiến" và là một phương pháp hợp lệ để kiểm tra hành vi của một chương trình. May mắn là bạn có thể làm điều này trong Aiken bằng cách thêm tiền tố ! vào từ khóa test. Dưới đây là một ví dụ:

```aiken
use aiken/math

!test must_fail() {
  expect Some(result) = math.sqrt(-42)
  result == -1
}
```

Trong ví dụ này, chúng ta đang kiểm tra rằng việc gọi hàm math.sqrt(-42) sẽ gây ra một lỗi. Nếu không, tức là nó trả về một giá trị khác -1, bài kiểm tra sẽ thất bại.

### Chạy thử nghiệm cụ thể

aiken check hỗ trợ các cờ cho phép bạn chạy một tập hợp con của tất cả các bài kiểm tra trong dự án của mình.

Ví dụ:

```sh
aiken check -m "aiken/list"
```

Điều này chỉ chạy các bài kiểm tra trong mô-đun có tên là `aiken/list`.

```sh
aiken check -m "aiken/option.{flatten}"
```

Điều này chỉ chạy các bài kiểm tra trong mô-đun aiken/option có chứa từ "flatten" trong tên của chúng.

```sh
aiken check -e -m "aiken/option.{flatten_1}"
```

Bạn có thể buộc khớp chính xác với -e.

```sh
aiken check -e -m map_1
```

Điều này chỉ chạy các bài kiểm tra trong toàn bộ dự án khớp chính xác với tên map_1.
