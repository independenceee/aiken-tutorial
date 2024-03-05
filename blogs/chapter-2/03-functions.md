# Functions

### Cách báo Hàm

Các hàm được đặt tên trong Aiken được xác định bằng từ khóa `fn`. Các hàm có thể có các đối số (được gõ) và luôn có kiểu trả về. Bởi vì trong Aiken, hầu hết mọi thứ đều là biểu thức, các hàm không có từ khóa trả về rõ ràng . Thay vào đó, họ ngầm trả lại bất cứ thứ gì họ đánh giá.

```aiken
fn add(x: Int, y: Int) -> Int {
  x + y
}

fn multiply(x: Int, y: Int) -> Int {
  x * y
}

fn divide(x: Int, y: Int) -> Int {
  x / y
}

fn subtraction(x: Int, y: Int) -> Int {
  x - y
}
```

Hàm là các giá trị hạng nhất và do đó có thể được gán cho các biến, được truyền cho các hàm khác hoặc bất kỳ điều gì khác mà bạn có thể thực hiện với bất kỳ loại dữ liệu nào khác.

```aiken
fn twice(f: fn(t) -> t, x: t) -> t {
  f(f(x))
}

fn add_one(x: Int) -> Int {
  x + 1
}

fn add_two(x: Int) -> Int {
  twice(add_one, x)
}
```

### Anonymous functions

`Anonymous functions` có thể được định nghĩa bằng cú pháp tương tự.

```aiken
fn run() {
  let add = fn(x, y) { x + y }

  add(1, 2)
}
```

### Labeled arguments

Khi các hàm có nhiều đối số, người dùng có thể khó nhớ các đối số là gì và chúng được mong đợi theo thứ tự nào.

Để trợ giúp việc này, Aiken hỗ trợ các `Labeled arguments`, trong đó các đối số của hàm được đưa ra bởi nhãn thay vì vị trí.

Thực hiện chức năng này để thay thế các phần của chuỗi:

```ak
fn replace(self: String, pattern: String, replacement: String) {
  // ...
}
```

Khi gọi hàm, có thể sử dụng các nhãn đã xác định để truyền các đối số:

```ak
replace(self: "A,B,C", pattern: ",", replacement: " ")

replace(pattern: ",", replacement: " ", self: "A,B,C")

replace("A,B,C", pattern: ",", replacement: " ")
```

Việc sử dụng nhãn đối số có thể cho phép gọi một hàm theo cách diễn đạt giống như câu, trong khi vẫn cung cấp nội dung hàm dễ đọc và rõ ràng về mục đích.

### Overriding default labels

Lưu ý rằng, khi xác định một hàm, có thể `Overriding default labels` để sử dụng các tên khác nhau (ví dụ: tên ngắn hơn) trong thân hàm. Ví dụ:

```ak
fn insert(self: List<(String, Int)>, key k: String, value v: Int) {
  // ... do something with `k` and `v`
}
```

Bên ngoài, hàm vẫn có thể được gọi bằng cách sử dụng `key` và `value` được gắn nhãn, nhưng trong nội dung hàm, chúng được đặt tên `k` và `v` để đảm bảo tính đồng nhất.

### Validator

Trong Aiken, bạn có thể quảng cáo một số chức năng cho người xác nhận bằng cách sử dụng từ khóa `validator`.

```ak
validator {
  fn foo(redeemer: Data, script_context: Data) {
    ..
  }

  fn bar(datum: Data, redeemer: Data, script_context: Data) {
    ..
  }
}
```

Các chức năng có trong một khối `validator` phải tuân các quy tắc sau:

1. `validator` phải có chính xác 2 hoặc 3 đối số.
2. `validator` phải được đặt tên
3. Có thể có một hoặc hai chức năng trong một khối, nhưng không còn nữa.

### Parameters

Bản thân trình xác thực có thể lấy các tham số , đại diện cho các thành phần cấu hình phải được cung cấp để tạo phiên bản của trình xác thực. Sau khi được cung cấp, các tham số sẽ được nhúng trong trình xác thực đã biên dịch và một phần của mã được tạo. Do đó, chúng phải được cung cấp trước khi có thể tính bất kỳ địa chỉ nào cho trình xác thực tương ứng.

```aiken
validator(utxo_ref: ByteArray) {
  fn foo(redeemer: Data, script_context: Data) {
    ..
  }
}
```

### Pipe Operator

Aiken cung cấp cú pháp để chuyển kết quả của một hàm tới các đối số của hàm khác, toán tử ống dẫn (`|>`). Chức năng này tương tự như toán tử tương tự trong Elixir hoặc F#.

Toán tử pipe cho phép bạn xâu chuỗi các lệnh gọi hàm mà không cần sử dụng nhiều dấu ngoặc đơn và lồng nhau. Để có một ví dụ đơn giản, hãy xem xét việc triển khai một hình ảnh tưởng tượng sau đây `string.reverse` trong Aiken:

```ak
string_builder.to_string(string_builder.reverse(string_builder.from_string(string)))
```

Điều này có thể được thể hiện một cách tự nhiên hơn bằng cách sử dụng toán tử pipe, loại bỏ nhu cầu theo dõi việc đóng dấu ngoặc đơn.

```ak
string
  |> string_builder.from_string
  |> string_builder.reverse
  |> string_builder.to_string
```

Mỗi dòng của biểu thức này áp dụng hàm cho kết quả của dòng trước đó. Điều này hoạt động dễ dàng vì mỗi hàm này chỉ có một đối số. Cú pháp có sẵn để thay thế các đối số cụ thể của các hàm có nhiều hơn một đối số; để biết thêm, hãy xem bên dưới trong phần "Chụp chức năng".

### Function capturing

Có một cú pháp tốc ký để tạo các hàm ẩn danh lấy một đối số và gọi một hàm khác. Được `_` sử dụng để chỉ ra nơi đối số sẽ được thông qua.

```aiken
fn add(x, y) {
  x + y
}

fn run() {
  let add_one = add(1, _)

  add_one(2)
}

```

Cú pháp chụp hàm thường được sử dụng với toán tử ống để tạo ra một loạt các phép biến đổi trên một số dữ liệu.

```aiken
fn add(x: Int , y: Int ) -> Int {
  x + y
}

fn run() {
  // Đoạn add(add(add(1, 3), 6), 9)
  1
  |> add(_, 3)
  |> add(_, 6)
  |> add(_, 9)
}
```

Trên thực tế, cách sử dụng này phổ biến đến mức có một cách viết tắt đặc biệt cho nó.

```aiken
fn run() {
  // This is the same as the example above
  1
  |> add(3)
  |> add(6)
  |> add(9)
}
```

Toán tử pipe trước tiên sẽ kiểm tra xem liệu giá trị bên trái có thể được sử dụng làm đối số đầu tiên cho cuộc gọi hay không, ví dụ: `a |> b(1, 2)` sẽ trở thành `b(a, 1, 2)`.

Nếu không, nó sẽ quay lại gọi kết quả của vế phải là một hàm, ví dụ: `b(1, 2)(a)`.

### Generic functions

Đôi khi bạn có thể muốn viết các `Generic functions` cho nhiều loại. Ví dụ: hãy xem xét một hàm tiêu thụ bất kỳ giá trị nào và trả về một danh sách chứa hai giá trị được truyền vào. Điều này có thể được biểu thị bằng Aiken như sau:

```aiken
fn list_of_two(my_value: a) -> List<a> {
  [my_value, my_value]
}
```

Ở đây biến kiểu `a` được sử dụng để thể hiện bất kỳ kiểu nào có thể.

Bạn có thể sử dụng bất kỳ số lượng biến loại khác nhau nào trong cùng một hàm. Hàm này khai báo các biến kiểu `a` và `b`.

```aiken
fn multi_result(x: a, y: b, condition: Bool) -> Result<a, b> {
  when condition is {
    True -> Ok(x)
    False -> Error(y)
  }
}
```

Biến loại có thể được đặt tên bất kỳ và có thể chứa dấu gạch dưới (\_), nhưng tên phải viết thường. Giống như các chú thích loại khác, chúng hoàn toàn không bắt buộc nhưng việc sử dụng chúng có thể giúp bạn hiểu mã dễ dàng hơn.

### Type annotations

Các đối số của hàm thường được chú thích theo kiểu của chúng và trình biên dịch sẽ kiểm tra các chú thích này và đảm bảo chúng đúng.

```aiken
fn identity(x: some_type) -> some_type {
  x
}

fn inferred_identity(x) {
  x
}
```

Trình biên dịch Aiken có thể suy ra tất cả các loại mã Aiken mà không cần chú thích và cả mã có chú thích và không có chú thích đều an toàn như nhau. Cách tốt nhất được coi là luôn viết chú thích kiểu cho các hàm của bạn vì chúng cung cấp tài liệu hữu ích và chúng khuyến khích suy nghĩ về các kiểu khi mã đang được viết.

### Documentation

Bạn có thể thêm tài liệu dành cho người dùng trước các định nghĩa hàm kèm theo nhận xét tài liệu `///` trên mỗi dòng. Markdown được hỗ trợ và văn bản này sẽ được đưa vào mục nhập của mô-đun trong tài liệu HTML được tạo.

```aiken
/// Always true.
///
fn always_true(_a) -> Bool {
  True
}
```
