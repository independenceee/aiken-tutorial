# Functions

### Cách báo Hàm

trong Aiken, các hàm được định nghĩa bằng từ khóa fn. Các hàm có thể có các đối số và luôn có một kiểu trả về. Trong các hàm này, kiểu trả về thường được suy luận dựa trên các biểu thức được trả về trong hàm. Không có từ khóa return rõ ràng trong Aiken; thay vào đó, hàm tự động trả về kết quả của biểu thức cuối cùng được đánh giá. Ví dụ của bạn minh họa việc định nghĩa các hàm cơ bản trong Aiken:

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

Các hàm trong Aiken có thể được truyền như các đối số cho các hàm khác, gán cho các biến và được sử dụng trong các ngữ cảnh khác nhau, giống như các giá trị khác. Ví dụ, trong hàm twice, chúng ta truyền một hàm f và một giá trị x, và sau đó gọi f hai lần trên x.

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

Ở đây, hàm add_two sử dụng hàm twice để gọi hàm add_one hai lần liên tiếp trên giá trị x, tương đương với việc thêm hai vào x.

### Anonymous functions

trong Aiken, bạn có thể định nghĩa các hàm vô danh (anonymous functions) bằng cách sử dụng cú pháp như trong ví dụ bạn đã cung cấp:

```aiken
fn run() {
  let add = fn(x, y) { x + y }

  add(1, 2)
}
```

Ở đây, biến add được gán cho một hàm vô danh có hai đối số x và y, thực hiện phép cộng của chúng. Sau đó, hàm add được gọi với các đối số 1 và 2, và kết quả là 3.
Hàm vô danh là một cách tiện lợi để định nghĩa các hàm nhỏ hoặc các hàm chỉ sử dụng một lần mà không cần phải đặt tên cho chúng. Điều này làm cho mã trở nên ngắn gọn và dễ đọc hơn trong các tình huống như là truyền các hàm như đối số cho các hàm khác hoặc xử lý các tác vụ đơn giản.

### Labeled arguments

Khi các hàm có nhiều đối số, người dùng có thể khó nhớ các đối số là gì và chúng được mong đợi theo thứ tự nào. trong Aiken, bạn có thể sử dụng các nhãn đối số để truyền các đối số cho hàm, giúp làm cho mã của bạn dễ hiểu hơn và giúp tránh nhầm lẫn về thứ tự của các đối số.

Để trợ giúp việc này, Aiken hỗ trợ các `Labeled arguments`, trong đó các đối số của hàm được đưa ra bởi nhãn thay vì vị trí.

Trong ví dụ bạn cung cấp, hàm replace có thể được gọi bằng cách sử dụng các nhãn đối số như sau:

```ak
fn replace(self: String, pattern: String, replacement: String) {
  // ...
}
```

Hoặc, bạn có thể thay đổi thứ tự của các đối số:

```ak
replace(self: "A,B,C", pattern: ",", replacement: " ")

replace(pattern: ",", replacement: " ", self: "A,B,C")

replace("A,B,C", pattern: ",", replacement: " ")
```

Việc sử dụng nhãn đối số có thể cho phép gọi một hàm theo cách diễn đạt giống như câu, trong khi vẫn cung cấp nội dung hàm dễ đọc và rõ ràng về mục đích. Cả hai cách đều tạo ra kết quả giống nhau. Việc sử dụng nhãn đối số giúp làm cho mã trở nên rõ ràng hơn về ý nghĩa của từng đối số, đặc biệt là khi có nhiều đối số hoặc khi bạn muốn làm cho mã giống như một câu.

### Overriding default labels

trong Aiken, bạn có thể ghi đè nhãn đối số mặc định để sử dụng các tên khác nhau bên trong thân hàm, giúp làm cho mã trở nên dễ đọc hơn hoặc phù hợp với quy ước đặt tên của bạn. Trong ví dụ bạn cung cấp, hàm insert được xác định với các nhãn đối số mặc định là key và value. Tuy nhiên, bên trong thân hàm, bạn sử dụng các tên đối số là k và v. Điều này giúp tạo ra một sự đồng nhất trong mã của bạn và giúp làm rõ ràng về mục đích của từng đối số. Ví dụ, bạn có thể gọi hàm insert như sau:

```aiken
insert(self: myList, key: "name", value: 42)
```

Nhưng bên trong thân hàm, bạn có thể truy cập vào các giá trị bằng các tên k và v:

```ak
Nhưng bên trong thân hàm, bạn có thể truy cập vào các giá trị bằng các tên k và v:
```

Việc này giúp làm cho mã trở nên dễ hiểu và giảm thiểu sự nhầm lẫn.

### Validator

Trong Aiken, khối validator cho phép bạn quảng cáo các hàm cho người xác nhận. Mỗi hàm trong khối này cung cấp một phần của logic xác thực được sử dụng trong các giao dịch. Dưới đây là các quy tắc cần tuân thủ khi sử dụng khối validator:

Các chức năng có trong một khối `validator` phải tuân các quy tắc sau:

1. Số đối số: validator phải có chính xác 2 hoặc 3 đối số. Các đối số này thường là redeemer, datum, và script_context. Số lượng đối số phụ thuộc vào loại hợp đồng mà bạn đang xác thực.
2. Đặt tên: validator phải được đặt tên. Tên này sẽ được sử dụng để tham chiếu đến trình xác thực trong mã khác.
3. Số lượng hàm: Có thể có một hoặc hai hàm trong một khối validator, nhưng không được nhiều hơn. Các hàm này đại diện cho các phần cụ thể của logic xác thực cần thiết cho hợp đồng.

Dưới đây là một ví dụ minh họa về việc sử dụng khối validator:

```ak
validator my_contract_validator {
  fn validate_redeem(redeemer: Data, script_context: Data) {
    // Logic to validate redemption
    ..
  }

  fn validate_datum(datum: Data, redeemer: Data, script_context: Data) {
    // Logic to validate datum
    ..
  }
}
```

Trong ví dụ này, my_contract_validator là tên của trình xác thực. Nó có hai chức năng: validate_redeem và validate_datum, mỗi chức năng nhận các đối số cần thiết cho việc xác thực.

### Parameters

Bản thân trình xác thực có thể lấy các tham số , đại diện cho các thành phần cấu hình phải được cung cấp để tạo phiên bản của trình xác thực. Sau khi được cung cấp, các tham số sẽ được nhúng trong trình xác thực đã biên dịch và một phần của mã được tạo. Do đó, chúng phải được cung cấp trước khi có thể tính bất kỳ địa chỉ nào cho trình xác thực tương ứng. trình xác thực có thể chấp nhận các tham số và sau đó sử dụng chúng để tính toán địa chỉ của trình xác thực. Trong ví dụ của bạn, hàm validator nhận một tham số utxo_ref là một ByteArray. Sau đó, nó định nghĩa một hàm foo với hai đối số: redeemer và script_context. Các tham số này có thể được sử dụng bên trong hàm foo để thực hiện các tính toán hoặc kiểm tra cần thiết. Cách này cho phép trình xác thực linh hoạt và có thể tùy chỉnh dựa trên các thông tin được cung cấp khi nó được gọi.

```aiken
validator(utxo_ref: ByteArray) {
  fn foo(redeemer: Data, script_context: Data) {
    ..
  }
}
```

Việc cung cấp các tham số cho trình xác thực trước khi tính toán địa chỉ là quan trọng, vì nó đảm bảo rằng trình xác thực có đủ thông tin để thực hiện xác thực một cách chính xác.

### Pipe Operator

Toán tử ống (|>) cho phép bạn chuyển kết quả của một hàm tới các đối số của hàm khác một cách dễ dàng. Điều này giúp tạo ra mã dễ đọc hơn và giảm sự cần thiết của nhiều dấu ngoặc đơn và lồng nhau.

Toán tử pipe cho phép bạn xâu chuỗi các lệnh gọi hàm mà không cần sử dụng nhiều dấu ngoặc đơn và lồng nhau. Để có một ví dụ đơn giản, hãy xem xét việc triển khai một hình ảnh tưởng tượng sau đây `string.reverse` trong Aiken:

```ak
string_builder.to_string(string_builder.reverse(string_builder.from_string(string)))
```

Ví dụ của bạn là một minh họa tuyệt vời về cách sử dụng toán tử ống để áp dụng một chuỗi các hàm cho một giá trị. Thay vì việc lồng nhiều hàm lại với nhau như trong ví dụ đầu tiên, bạn có thể sử dụng toán tử ống để truyền giá trị từ hàm này sang hàm khác một cách rõ ràng và dễ hiểu hơn. Điều này có thể được thể hiện một cách tự nhiên hơn bằng cách sử dụng toán tử pipe, loại bỏ nhu cầu theo dõi việc đóng dấu ngoặc đơn.

```ak
string
  |> string_builder.from_string
  |> string_builder.reverse
  |> string_builder.to_string
```

Mỗi dòng của biểu thức này áp dụng hàm cho kết quả của dòng trước đó. Điều này hoạt động dễ dàng vì mỗi hàm này chỉ có một đối số. Cú pháp có sẵn để thay thế các đối số cụ thể của các hàm có nhiều hơn một đối số; để biết thêm, hãy xem bên dưới trong phần "Chụp chức năng". Cú pháp này không chỉ giúp làm cho mã trở nên ngắn gọn hơn mà còn giúp tạo ra mã dễ đọc và dễ bảo trì hơn trong tương lai.

### Function capturing

Bạn có thể sử dụng cú pháp chụp hàm để tạo các hàm ẩn danh lấy một đối số và gọi một hàm khác, với \_ chỉ ra nơi đối số sẽ được truyền qua. Điều này hữu ích khi bạn muốn tạo một hàm mới từ một hàm hiện có bằng cách chỉ định một hoặc nhiều đối số. Ví dụ đầu tiên của bạn tạo một hàm add*one bằng cách gọi hàm add với đối số 1 cho x và * cho y, sau đó gọi hàm add_one với đối số 2. Kết quả sẽ là 3, bởi vì 1 + 2 = 3.

```aiken
fn add(x, y) {
  x + y
}

fn run() {
  let add_one = add(1, _)

  add_one(2)
}

```

Cú pháp chụp hàm thường được sử dụng với toán tử ống để tạo ra một loạt các phép biến đổi trên một số dữ liệu. Ví dụ thứ hai của bạn sử dụng toán tử ống (|>) để chuyển đổi dữ liệu thông qua một chuỗi các hàm. Toán tử ống truyền giá trị từ bên trái của nó như là đối số đầu tiên cho hàm bên phải của nó. Trong ví dụ của bạn, chuỗi các hàm add sẽ được áp dụng lần lượt cho giá trị ban đầu 1, tạo ra kết quả cuối cùng là 19 (1 + 3 + 6 + 9).

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

Toán tử pipe trước tiên sẽ kiểm tra xem liệu giá trị bên trái có thể được sử dụng làm đối số đầu tiên cho cuộc gọi hay không, ví dụ: `a |> b(1, 2)` sẽ trở thành `b(a, 1, 2)`. Nếu không, nó sẽ quay lại gọi kết quả của vế phải là một hàm, ví dụ: `b(1, 2)(a)`. Cú pháp ngắn gọn đặc biệt cho toán tử ống giúp làm cho mã trở nên dễ đọc hơn và hiểu hơn.

### Generic functions

Bạn có thể viết các hàm generic để hoạt động với nhiều loại khác nhau. Điều này giúp tái sử dụng mã và tạo mã linh hoạt hơn. Ví dụ: hãy xem xét một hàm tiêu thụ bất kỳ giá trị nào và trả về một danh sách chứa hai giá trị được truyền vào. Điều này có thể được biểu thị bằng Aiken như sau:

```aiken
fn list_of_two(my_value: a) -> List<a> {
  [my_value, my_value]
}
```

Trong ví dụ đầu tiên của bạn, hàm list_of_two có thể chấp nhận bất kỳ giá trị nào và trả về một danh sách chứa hai bản sao của giá trị đó. Biến kiểu a được sử dụng để thể hiện bất kỳ loại nào có thể. Ở đây biến kiểu `a` được sử dụng để thể hiện bất kỳ kiểu nào có thể. Bạn có thể sử dụng bất kỳ số lượng biến loại khác nhau nào trong cùng một hàm. Hàm này khai báo các biến kiểu `a` và `b`.

```aiken
fn multi_result(x: a, y: b, condition: Bool) -> Result<a, b> {
  when condition is {
    True -> Ok(x)
    False -> Error(y)
  }
}
```

Trong ví dụ thứ hai, hàm multi_result trả về một kết quả có thể là một giá trị thành công (Ok) chứa giá trị x hoặc một giá trị lỗi (Error) chứa giá trị y, dựa vào điều kiện được cung cấp. Biến loại a và b là các biến loại generic, cho phép bạn xác định loại của giá trị thành công và giá trị lỗi tùy ý.

Biến loại có thể được đặt tên bất kỳ và có thể chứa dấu gạch dưới (\_), nhưng tên phải viết thường. Giống như các chú thích loại khác, chúng hoàn toàn không bắt buộc nhưng việc sử dụng chúng có thể giúp bạn hiểu mã dễ dàng hơn.

### Type annotations

Việc chú thích đối số của hàm theo kiểu của chúng là một cách tốt để cung cấp tài liệu hữu ích cho người đọc mã và giúp trình biên dịch kiểm tra tính chính xác của mã.

```aiken
fn identity(x: some_type) -> some_type {
  x
}

fn inferred_identity(x) {
  x
}
```

Hàm identity được chú thích với kiểu của đối số x là some_type, trong khi hàm inferred_identity không có chú thích kiểu cho đối số x. Trình biên dịch Aiken sẽ kiểm tra chú thích kiểu trong trường hợp của identity để đảm bảo rằng đối số x được truyền vào hàm là loại some_type. Đối với inferred_identity, trình biên dịch sẽ cố gắng suy ra loại của đối số x từ ngữ cảnh sử dụng trong mã.

Trình biên dịch Aiken có thể suy ra tất cả các loại mã Aiken mà không cần chú thích và cả mã có chú thích và không có chú thích đều an toàn như nhau. Cách tốt nhất được coi là luôn viết chú thích kiểu cho các hàm của bạn vì chúng cung cấp tài liệu hữu ích và chúng khuyến khích suy nghĩ về các kiểu khi mã đang được viết.

Tuy việc chú thích kiểu không bắt buộc nhưng nó là một phần quan trọng của việc viết mã Aiken tốt để cung cấp tài liệu và đảm bảo tính chính xác của mã.

### Documentation

Trong Aiken, bạn có thể thêm tài liệu dành cho người dùng trước mỗi định nghĩa hàm bằng cách sử dụng nhận xét tài liệu /// trên mỗi dòng. Bạn cũng có thể sử dụng Markdown để định dạng văn bản, và những phần tài liệu này sẽ được đưa vào mục nhập của mô-đun trong tài liệu HTML được tạo. Dưới đây là một ví dụ:

```aiken
/// This function always returns true.
///
/// It takes one parameter `_a` of any type and always returns `True`.
///
fn always_true(_a) -> Bool {
  True
}
```

Trong ví dụ này, tài liệu được mô tả về chức năng always_true. Nó giải thích rằng chức năng này luôn trả về true và có một tham số \_a có thể là bất kỳ loại nào.
