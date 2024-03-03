# Test

### Tổng quan

Aiken có hỗ trợ hạng nhất cho các bài kiểm tra. Và điều chúng tôi muốn nói là bạn có thể trực tiếp viết các bài kiểm tra trong Aiken và thực hiện chúng một cách nhanh chóng. Do đó, bộ công cụ ( `aiken check` ) có thể phân tích các bài kiểm tra, thu thập chúng, chạy chúng và hiển thị báo cáo với hy vọng các chi tiết hữu ích.

Để viết bài kiểm tra, hãy sử dụng `test` từ khóa:

```aiken
test foo() {
  1 + 1 == 2
}
```

Kiểm tra là một hàm được đặt tên không có đối số và trả về một giá trị boolean. Cụ thể hơn, một bài kiểm tra được coi là hợp lệ (tức là nó vượt qua) nếu nó trả về `True`.

Bạn có thể viết bài kiểm tra ở bất kỳ đâu trong mô-đun Aiken và họ có thể thực hiện lệnh gọi hàm cũng như sử dụng các hằng số như nhau. Tuy nhiên, bài kiểm tra không thể gọi các bài kiểm tra khác! Nếu bạn cần sử dụng lại mã giữa các lần kiểm tra, hãy tạo một hàm.

Ở giai đoạn này, khung thử nghiệm còn thô sơ  mặc dù hữu ích! Sau đó, chúng tôi dự định giới thiệu các đối số cho các hàm kiểm tra để biến chúng thành các thuộc tính hoàn chỉnh. Các đối số sẽ được tạo ngẫu nhiên và các thử nghiệm sẽ được thực hiện hàng trăm lần.

Một điều thú vị về các thử nghiệm là chúng sử dụng cùng một máy ảo với máy thực hiện hợp đồng trên chuỗi. Nói cách khác, chúng là các đoạn mã thực tế trên chuỗi mà bạn có thể chạy và suy luận trong cùng bối cảnh với mã sản xuất của mình.

### Test reports

Ví dụ: hãy viết một hàm đơn giản với một số bài kiểm tra đơn vị.

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

Chạy `aiken check` trên dự án của chúng tôi cung cấp cho chúng tôi báo cáo sau:



Như bạn có thể thấy, nhóm báo cáo kiểm tra theo mô-đun và cung cấp cho bạn, đối với mỗi kiểm tra, bộ nhớ và đơn vị thực thi CPU cần thiết cho kiểm tra đó. Điều đó có nghĩa là các bài kiểm tra cũng có thể được sử dụng làm điểm chuẩn nếu bạn cần thử nghiệm các phương pháp khác nhau và so sánh chi phí thực hiện của chúng.

* Các thử nghiệm có thể phức tạp tùy ý; không giống như các tập lệnh trên chuỗi, chúng không có bất kỳ giới hạn thực thi nào.

### Automatic diffing

Người chạy thử nghiệm của Aiken (cố gắng trở nên) thông minh và hữu ích, đặc biệt là khi thử nghiệm thất bại. Nếu thử nghiệm thất bại, người chạy thử sẽ cố gắng hết sức để cung cấp một số thông tin về những gì đã xảy ra. Điều này đặc biệt hiệu quả nếu bạn viết bài kiểm tra của mình dưới dạng xác nhận bằng cách sử dụng toán tử nhị phân ( `==`, `>=`v.v.).

Ví dụ: hãy thêm một bài kiểm tra thất bại vào ví dụ trên của chúng tôi:

```aiken
// ... rest of the file is unchanged
test add_one_3() {
  add_one(1) == 1
}
```

Chúng ta có thể xem cả hai toán hạng được đánh giá là gì và người chạy thử sẽ chỉ cho chúng ta vấn đề. Tuy nhiên, như bạn có thể thấy, đánh giá được đưa ra trong Untyped Plutus Core (còn gọi là UPLC) , vì đây là ngôn ngữ thực thi thực tế. Chúng tôi đề cập đến UPLC trong phần tiếp theo của hướng dẫn này. Khả năng đọc UPLC giúp gỡ lỗi và hiểu những gì đang thực sự diễn ra trên chuỗi.

### Testing failures

Đôi khi, bạn cần khẳng định rằng một đường dẫn thực thi nhất định có thể bị lỗi. Đây còn được gọi là "lỗi dự kiến" và là một cách hoàn toàn hợp lệ để khẳng định hành vi của một chương trình. May mắn thay, bạn cũng có thể làm điều này với Aiken bằng cách thêm tiền `test` tố bang vào từ khóa `!`. Ví dụ:

```aiken
use aiken/math
 
!test must_fail() {
  expect Some(result) = math.sqrt(-42)
  result == -1
}
```

###Chạy thử nghiệm cụ thể 

`aiken check` hỗ trợ các cờ cho phép bạn chạy tập hợp con của tất cả các thử nghiệm trong dự án của bạn.

Ví dụ

```sh
aiken check -m "aiken/list"
```

Điều này chỉ chạy thử nghiệm bên trong mô-đun có tên `aiken/list`.

```sh
aiken check -m "aiken/option.{flatten}"
```

Điều này chỉ chạy thử nghiệm trong mô-đun `aiken/option` có chứa từ `flatten` trong tên của chúng.

```sh
aiken check -e -m "aiken/option.{flatten_1}"
```

Bạn có thể buộc khớp chính xác với `-e`.

```sh
aiken check -e -m map_1
```

Điều này chỉ chạy thử nghiệm trong toàn bộ dự án khớp chính xác với tên `map_1`.