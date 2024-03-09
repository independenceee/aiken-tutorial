# Custom types

Trong Aiken, bạn có thể định nghĩa các loại tùy chỉnh để tạo ra cấu trúc dữ liệu phức tạp theo nhu cầu của ứng dụng của bạn. Các loại tùy chỉnh này giống như các lớp trong ngôn ngữ hướng đối tượng, tuy nhiên, chúng không có các phương thức.

Các loại tùy chỉnh được xác định bằng từ khóa `type` .

```aiken
type Datum {
  Datum { signer: ByteArray, count: Int }
}
```

Loại tùy chỉnh Datum được định nghĩa bằng từ khóa type và có hai trường: signer là một ByteArray và count là một Int. Bạn có thể hiểu Datum như là một cấu trúc dữ liệu đại diện cho một mục dữ liệu cụ thể.

Sau khi định nghĩa loại tùy chỉnh Datum, bạn có thể tạo các đối tượng của loại này bằng cách sử dụng hàm tạo đã được xác định trong khai báo loại.

```aiken
fn datums() {
  let datum1 = Datum { signer: #[0xAA, 0xBB], count: 2001 }
  let datum2 = Datum { count: 1805, signer: #[0xAA, 0xCC] }

  [datum1, datum1]
}
```

Trong hàm datums() của bạn, bạn tạo hai đối tượng datum1 và datum2 của loại Datum và sau đó trả về một mảng chứa các đối tượng này. Sử dụng các loại tùy chỉnh giúp mã của bạn trở nên dễ đọc, dễ bảo trì hơn bằng cách mô tả cụ thể về cấu trúc dữ liệu bạn đang làm việc.

# Shorthand notation

Trong Aiken, khi bạn định nghĩa một loại tùy chỉnh bằng từ khóa type, bạn cũng có thể xác định hàm tạo cho loại đó bằng cách sử dụng cùng tên với loại. Điều này tạo ra một ký hiệu tốc ký khi bạn muốn tạo ra một đối tượng của loại tùy chỉnh.

Ví dụ, bạn có thể tạo một đối tượng datum như sau:

```aiken
type Datum {
  signer: ByteArray,
  count: Int
}
```

Trong ví dụ của bạn, việc định nghĩa loại Datum được rút gọn lại bằng cách chỉ liệt kê các trường cần thiết cùng với kiểu của chúng. Điều này ngụ ý rằng có một hàm tạo có tên là Datum được tạo tự động và bạn có thể sử dụng nó để tạo các đối tượng thuộc loại Datum. Trong trường hợp này, Aiken sẽ hiểu rằng bạn đang gọi hàm tạo Datum để tạo một đối tượng Datum mới với các giá trị cho các trường signer và count.

### Multiple constructors ( Nhiều hàm tạo )

Các loại tùy chỉnh trong Aiken có thể được định nghĩa với nhiều hàm tạo khác nhau, cho phép tạo ra các biến thể khác nhau của chúng, tạo thành một cách mô hình hóa Data có thể đa dạng.

Một ví dụ minh họa là loại Bool. Kiểu tích hợp của Aiken Bool có thể được định nghĩa như sau:

Kiểu tích hợp của Aiken `Bool` được định nghĩa như thế này:

```aiken
/// Bool chỉ có giá trị true hoặc false
type Bool {
  True
  False
}
```

Đây là một kiểu tùy chỉnh đơn giản với hai hàm tạo không có đối số. Loại này có thể được sử dụng để trả lời các câu hỏi có hoặc không, và để biểu thị điều gì đó là True hoặc False.

Các bản ghi được tạo bởi các hàm tạo khác nhau cho một loại tùy chỉnh có thể chứa các giá trị khác nhau. Ví dụ, một loại tùy chỉnh User có thể có một hàm tạo LoggedIn tạo các bản ghi có thông tin đăng nhập và một hàm tạo Guest tạo các bản ghi không chứa bất kỳ thông tin nào về người dùng:

```
type User {
  LoggedIn { count: Int }  // Người dùng đăng nhập
  Guest                    // Người dùng khách không có thông tin
}

let user1 = LoggedIn { count: 4 }
let user2 = LoggedIn { count: 2 }
let visitor = Guest
```

### Option

Một ví dụ khác là loại Option, một loại chung có sẵn trong Aiken:

```aiken
type Option<a> {
  None
  Some(a)
}
```

Loại này cho phép biểu diễn các giá trị có thể hoặc không tồn tại. Ví dụ, một hàm `get_head` có thể trả về một giá trị Option một cách an toàn:

```aiken
fn get_head(a: List<a>) -> Option<a> {
  when a is {
    [a, ..] -> Some(a)
    [] -> None
  }
}
```

Loại Option này có sẵn trong Aiken và là một phần của các loại và giá trị mặc định có sẵn theo mặc định, cho phép xử lý an toàn của giá trị có thể hoặc không tồn tại.

### Destructuring

Khi được cung cấp một bản ghi của loại tùy chỉnh, chúng ta có thể sử dụng khớp mẫu để xác định hàm tạo bản ghi nào khớp và gán tên cho bất kỳ giá trị được chứa nào. Ví dụ:

```aiken
fn get_name(user) {
  when user is {
    LoggedIn { count } -> count
    Guest -> "Guest user"
  }
}
```

Trong ví dụ trên, chúng ta kiểm tra loại của user. Nếu user là một bản ghi LoggedIn, chúng ta trích xuất giá trị count và trả về nó. Nếu user là một bản ghi Guest, chúng ta trả về chuỗi "Guest user".Các loại tùy chỉnh cũng có thể được hủy cấu trúc bằng một ràng buộc let. Ví dụ:

```aiken
type Score {
  Points(Int)
}

let score = Points(50)
let Points(p) = score // Điều này tạo ra một ràng buộc `p` trong phạm vi.

p // 50
```

Trong quá trình hủy cấu trúc, bạn cũng có thể sử dụng loại bỏ ( \_) hoặc chênh lệch (..). Ví dụ:

```aiken
type Dog {
  Dog { name: ByteArray, cuteness: Int, age: Int }
}

let dog = Dog { name: #"Cashew", cuteness: 9001, age: 3 }

// Bạn sẽ cần chỉ định tất cả các đối số cho một kết quả khớp mẫu hoặc sử dụng toán tử trải rộng.
let Dog { name: name, cuteness: _, age: _ } = dog
builtin.decode_utf8(name) // "Cashew"

// Các trường khác được bỏ qua bằng cách sử dụng toán tử trải rộng.
// `age` là một cách viết tắt cho `age: age`.
let Dog { age, .. } = dog
age // 3
// All fields present
let Dog { name: name, cuteness: _, age: _ } = dog
builtin.decode_utf8(name) // "Cashew"

// Other fields ignored by spreading.
// Field punning is supported. Hence `age` is a shorthand for `age: age`.
let Dog { age, .. } = dog
age // 3
```

Trong ví dụ trên, chúng ta trích xuất tên của chó (name) và tuổi của chó (age) bằng cách sử dụng hủy cấu trúc.

### Named accessors

Nếu loại tùy chỉnh chỉ có một biến thể và các trường được đặt tên, chúng có thể được truy cập bằng cách sử dụng .field_name.

Ví dụ: sử dụng loại Dog được xác định trước đó:

```aiken
let dog = Dog { name: #[82, 105, 110], cuteness: 2001 }
dog.cuteness // Điều này trả về 2001
```

Trong ví dụ trên, chúng ta truy cập trường cuteness của dog bằng cách sử dụng .cuteness.

### Generics

Các loại tùy chỉnh có thể được tham số hóa với các loại khác, làm cho nội dung của chúng có thể thay đổi.

Ví dụ: Box là một loại đơn giản chứa một giá trị duy nhất.

```aiken
type Box<inner_type> {
  Box(inner: inner_type)
}
```

Loại trường inner là inner_type, là tham số của loại Box. Nếu nó giữ một số nguyên, thì loại của hộp là Box<Int>, nếu nó chứa một chuỗi thì loại của hộp là Box<String>.

```aiken
fn foo() {
  let a = Box(420) // loại là Box<Int>
  let b = Box("That's my ninja way!") // loại là Box<String>
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
  // Đây là sinh nhật của người này, vì vậy tăng tuổi của họ và
  // làm cho họ vui vẻ
  Person { ..person, age: person.age + 1, is_happy: True }
}
```

Cú pháp cập nhật đã tạo ra một bản ghi mới với các giá trị từ bản ghi ban đầu. Nó thay thế các trường đã cho bằng các giá trị mới của chúng.

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
