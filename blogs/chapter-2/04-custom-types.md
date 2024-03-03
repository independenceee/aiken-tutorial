# Custom types

Các loại tùy chỉnh của Aiken được đặt tên là tập hợp các khóa và hoặc giá trị. Chúng tương tự như các đối tượng trong ngôn ngữ hướng đối tượng, mặc dù chúng không có phương thức.

Các loại tùy chỉnh được xác định bằng từ khóa `type` .

```aiken
type Datum {
  Datum { signer: ByteArray, count: Int }
}
```

Ở đây chúng tôi đã xác định một loại tùy chỉnh được gọi là `Datum`. Hàm tạo của nó được gọi `Datum` và nó có hai trường: Một `signer` trường là một `ByteArray` và một `count` trường là `Int`.

Sau khi xác định loại tùy chỉnh có thể được sử dụng trong các hàm:

```aiken
fn datums() {
  let datum1 = Datum { signer: #[0xAA, 0xBB], count: 2001 }
  let datum2 = Datum { count: 1805, signer: #[0xAA, 0xCC] }
 
  [datum1, datum1]
}
```


# Shorthand notation

Bởi vì các hàm tạo đơn lẻ khá phổ biến nên tồn tại một ký hiệu tốc ký đặc biệt khi kiểu và hàm tạo có cùng tên. Vì vậy, thay vì ở trên, người ta có thể viết:

```aiken
type Datum {
  signer: ByteArray,
  count: Int
}
```

Hai ký hiệu này là từ đồng nghĩa. Với cách viết tắt này, chúng tôi ngầm chỉ ra rằng có một hàm tạo duy nhất được đặt tên `Datum` có thể được sử dụng để xây dựng các giá trị thuộc loại `Datum` hoặc cũng có thể được sử dụng khi cấu trúc (xem bên dưới).

### Multiple constructors ( Nhiều hàm tạo ) 

Các loại tùy chỉnh trong Aiken có thể được xác định bằng nhiều hàm tạo, biến chúng thành một cách mô hình hóa `Data` có thể là một trong một số biến thể khác nhau.

Chúng tôi đã thấy một loại tùy chỉnh có nhiều hàm tạo trong Tham quan ngôn ngữ - `Bool`.

Kiểu tích hợp của Aiken `Bool` được định nghĩa như thế này:

```aiken
///  Bool chỉ có giá trị true hoặc false
type Bool {
  True
  False
}
```

Đó là một kiểu tùy chỉnh đơn giản với các hàm tạo không có đối số nào cả! Sử dụng nó để trả lời các câu hỏi có / không và để cho biết điều gì đó là `True` hay `False`.

Các bản ghi được tạo bởi các hàm tạo khác nhau cho một loại tùy chỉnh có thể chứa các giá trị khác nhau. Ví dụ: một `User` loại tùy chỉnh có thể có một `LoggedIn` hàm tạo tạo các bản ghi có tên và một hàm tạo `Guest` tạo các bản ghi không chứa bất kỳ giá trị nào.

```
type User {
  LoggedIn { count: Int }  // A logged in user
  Guest                    // A guest user with no details
}


let user1 = LoggedIn { count: 4 }
let user2 = LoggedIn { count: 2 }
let visitor = Guest
```

### Option

Chúng tôi xác định `Option` là một loại chung như vậy:

```aiken
type Option<a> {
  None
  Some(a)
}
```

Sau đó, các hàm bị lỗi có thể trả về một giá trị tùy chọn một cách an toàn.

```aiken
fn get_head(a: List<a>) -> Option<a> {
  when a is {
    [a, ..] -> Some(a)
    [] -> None
  }
}
```


Loại này `Option` có sẵn ở Aiken; nó là một phần của các loại và giá trị mặc định có sẵn theo mặc định. Đừng ngần ngại sử dụng nó!

### Destructuring

Khi được cung cấp một bản ghi loại tùy chỉnh, chúng ta có thể khớp mẫu trên đó để xác định hàm tạo bản ghi nào khớp và gán tên cho bất kỳ giá trị được chứa nào.

```aiken
fn get_name(user) {
  when user is {
    LoggedIn { count } -> count
    Guest -> "Guest user"
  }
}
```

Các loại tùy chỉnh cũng có thể được hủy cấu trúc bằng một `let` ràng buộc.

```aiken
type Score {
  Points(Int)
}
 
let score = Points(50)
let Points(p) = score // This brings a let-binding `p` in scope.
 
p // 50
```

Trong quá trình phá hủy, bạn cũng có thể sử dụng loại bỏ ( _) hoặc chênh lệch (..).


```aiken
type Dog {
  Dog { name: ByteArray, cuteness: Int, age: Int }
}
 
let dog = Dog { name: #"436173686577", cuteness: 9001, age: 3 }
```

Bạn sẽ cần chỉ định tất cả các đối số cho một kết quả khớp mẫu hoặc sử dụng toán tử trải rộng.

```aiken
// All fields present
let Dog { name: name, cuteness: _, age: _ } = dog
builtin.decode_utf8(name) // "Cashew"
 
// Other fields ignored by spreading.
// Field punning is supported. Hence `age` is a shorthand for `age: age`.
let Dog { age, .. } = dog
age // 3
```

### Named accessors

Nếu loại tùy chỉnh chỉ có một biến thể và các trường được đặt tên thì chúng có thể được truy cập bằng cách sử dụng `.field_name`.

Ví dụ: sử dụng Dog loại được xác định trước đó.

```aiken
let dog = Dog { name: #[82, 105, 110], cuteness: 2001 }
dog.cuteness // This returns 2001
```

### Generics

Các loại tùy chỉnh có thể được tham số hóa với các loại khác, làm cho nội dung của chúng có thể thay đổi.

Ví dụ: `Box` loại này là một bản ghi đơn giản chứa một giá trị duy nhất.

```aiken
type Box<inner_type> {
  Box(inner: inner_type)
}
```

Loại trường inner là `inner_type`, là tham số của loại `Box`. Nếu nó giữ một int thì loại của hộp là `Box<Int>`, nếu nó chứa một chuỗi thì loại của hộp là `Box<String>`.

```aiken
fn foo() {
  let a = Box(420) // type is Box<Int>
  let b = Box("That's my ninja way!") // type is Box<String>
}
```


### Record updates

Aiken cung cấp một cú pháp chuyên dụng để cập nhật một số trường của bản ghi loại tùy chỉnh.

```aiken
type Person {
  name: ByteArray,
  shoe_size: Int,
  age: Int,
  is_happy: Bool,
}
 
fn have_birthday(person) {
  // It's this person's birthday, so increment their age and
  // make them happy
  Person { ..person, age: person.age + 1, is_happy: True }
}
```

Cú pháp cập nhật đã tạo một bản ghi mới với các giá trị của bản ghi ban đầu. Nó thay thế ràng buộc đã cho bằng các giá trị mới của chúng.

### Type aliases

Bí danh loại cho phép bạn tạo tên giống hệt với loại khác mà không cần thêm bất kỳ thông tin nào.

```aiken
type MyNumber = Integer
```

Chúng hữu ích nhất cho việc đơn giản hóa chữ ký loại.


```aiken
type Person = (String, Integer)
 
fn create_person(name: String, age: Integer) -> Person {
  (name, age)
}
```

### Data

Trong thời gian chạy, các loại tùy chỉnh trở thành `Data` Plutus mờ đục. Trong hệ thống loại của Aiken `Data` khớp với bất kỳ loại nào do người dùng xác định (nhưng không có loại nguyên thủy nào).

Do đó, cũng có thể chuyển bất kỳ loại tùy chỉnh nào vào `Data`. Tuy nhiên, việc trích xuất từ `Data​` ​đó yêu cầu sử dụng mong đợi

fn to_datum(datum: Data) -> Datum {
    expect d: Datum = datum
    d
}


Lưu ý rằng chuyển đổi này sẽ thất bại nếu thông tin đã cho `Data` không thực sự là đại diện hợp lệ cho loại mục tiêu. Trường hợp sử dụng chính ở đây là để tạo bối cảnh tập lệnh, `Data` và quy đổi được cung cấp cho tập lệnh theo kiểu không rõ ràng.

Nó cũng hữu ích khi tương tác với các nội dung hoạt động trên các tệp `Data`. Trong trường hợp này, cuộc trò chuyện diễn ra ngầm. Chỉ cần mong đợi bất kỳ chức năng nào chấp nhận `Data` tự động hoạt động trên bất kỳ loại tùy chỉnh nào.

type Datum {
  count: Int,
}
 
let datum = Datum { count: 1 }
 
// fn(Data) -> ByteArray
builtin.serialise_data(datum) // some bytearray


### expect

`expect` là một từ khóa đặc biệt hoạt động giống như `let`, nhưng cho phép thực hiện một số chuyển đổi có thể không an toàn. Có hai trường hợp sử dụng chính cho nó:

###### Kết hợp mẫu không đầy đủ

Trong trường hợp bạn có một giá trị thuộc loại có nhiều biến thể của hàm tạo nhưng chỉ thực sự quan tâm đến một trong các biến thể có thể có dưới dạng kết quả (tức là bất kỳ kết quả nào khác làm mất hiệu lực của chương trình), thì đó `expect` là công cụ hoàn hảo. Hãy xem xét `Option` loại từ trên trong ví dụ sau:


```aiken
let x = Some(42)
 
// As a pattern-match
let y = when x is {
  None -> ???
  Some(y) -> y
}
 
// Using expect
expect Some(y) = x
```

### Truyền từ `Data` vào một loại tùy chỉnh

Một cách sử dụng quan trọng khác `expect` là biến một số thứ mờ đục `Data` thành một cách trình bày cụ thể. Trong bối cảnh của hợp đồng thông minh Cardano, chúng ta có thể gặp phải `Data` ở nhiều nơi khác nhau mặc dù nhìn chung điều đó rất có thể xảy ra khi xử lý các `Data` gắn liền với đầu ra.

Thông thường, chúng tôi mong đợi một cấu trúc cụ thể cho một số `Data` nhất định và do đó, việc có thể chuyển tiếp các giả định đó một cách an toàn trong trình xác nhận sẽ rất hữu ích.

Cú pháp giống hệt với trường hợp sử dụng khác, nhưng nó yêu cầu chú thích kiểu rõ ràng.

```aiken
type MyDatum {
  foo: Int,
  bar: ByteArray,
}
 
fn to_my_datum(data: Data) -> MyDatum {
  expect my_datum: MyDatum = data
  my_datum
}
```