# Control flow

### Blocks

Mỗi khối trong Aiken là một biểu thức. Tất cả các biểu thức trong khối đều được thực thi và kết quả của biểu thức cuối cùng được trả về.

```aiken
let value: Bool = {
    "Hello"
    42 + 12
    False
}
value == False
```

Các khối biểu thức có thể được sử dụng thay cho dấu ngoặc đơn để thay đổi thứ tự ưu tiên của các phép toán.

```aiken
let celsius = { fahrenheit - 32 } * 5 / 9
```
### Matching

Biểu `when *expr* is`thức là loại điều khiển luồng phổ biến nhất trong mã Aiken. Nó cho phép chúng ta nói "nếu dữ liệu có hình dạng này thì hãy làm cái kia", mà chúng ta gọi là khớp mẫu .

Ở đây, chúng tôi khớp với an `Int` và trả về một chuỗi cụ thể cho các giá trị 0, 1 và 2. Mẫu cuối cùng `n` khớp với bất kỳ giá trị nào khác không khớp với bất kỳ mẫu nào trước đó.

```aiken
when some_number is {
  0 -> "Zero"
  1 -> "One"
  2 -> "Two"
  n -> "Some other number" // This matches anything
}
```

Aiken `when *expr* is` là một biểu thức, nghĩa là nó trả về một giá trị và có thể được sử dụng ở bất cứ đâu mà chúng ta sử dụng một giá trị. Ví dụ: chúng ta có thể đặt tên cho giá trị được đánh giá từ biểu thức when bằng một `let` liên kết.

```aiken
type Answer {
  Yes
  No
}
 
let answer = Yes
 
let description =
  when answer is {
    Yes -> "It's true!"
    No -> "It's not yes."
  }
 
description == "It's true!"
```

### If - Else

Việc khớp mẫu trên một `Bool` giá trị không được khuyến khích và `if / else` thay vào đó nên sử dụng các biểu thức.

```aiken
let some_bool = True
 
if some_bool {
  "It's true!"
} else {
  "It's not true."
}
```


Lưu ý rằng, mặc dù nó có thể trông giống như một hướng dẫn mệnh lệnh: nếu cái này thì làm cái kia hoặc nếu không thì làm cái kia, nhưng thực tế nó chỉ là một biểu thức duy nhất. Đặc biệt, điều này có nghĩa là kiểu trả về của cả hai nhánh phải khớp nhau.

Ngẫu nhiên, bạn có thể có bao nhiêu `else/if` nhánh có điều kiện tùy thích:

```aiken
fn fibonnaci(n: Int) -> Int {
  if n == 0 {
    0
  } else if n == 1 {
    1
  } else {
    fibonnaci(n-2) + fibonnaci(n-1)
  }
}
```

### Destructuring

Một `when *expr* is` biểu thức có thể được sử dụng để hủy cấu trúc các giá trị chứa các giá trị khác, chẳng hạn như bộ dữ liệu và danh sách.

```aiken
when xs is {
  [] -> "This list is empty"
  [a] -> "This list has 1 element"
  [a, b] -> "This list has 2 elements"
  _other -> "This list has more than 2 elements"
}
```


Không chỉ cấu trúc dữ liệu cấp cao nhất có thể được khớp mẫu mà các giá trị được chứa cũng có thể được khớp. Điều này mang lại `when` khả năng thể hiện chính xác điều khiển luồng có thể dài dòng mà không cần khớp mẫu.

```aiken
when xs is {
  [[]] -> "The only element is an empty list"
  [[], ..] -> "The 1st element is an empty list"
  [[4], ..] -> "The 1st element is a list of the number 4"
  other -> "Something else"
}
```

### So khớp các hàm tạo biến thể đơn

Aiken cho phép bạn khớp mẫu trên các giá trị từ các loại có một hàm tạo duy nhất bằng cách sử dụng `let` liên kết - trực tiếp. Ví dụ : đây là trường hợp của bất kỳ `Tuple` loại nào hoặc bất kỳ loại tùy chỉnh nào có một hàm tạo duy nhất.

```aiken
type Foo {
  foo: Int
}
 
let (a, b, c) = (1, 2, 3)
let Foo { foo } = Foo { foo: 42 }
```

### Gán tên cho các mẫu phụ

Đôi khi, khi khớp mẫu, chúng ta muốn gán tên cho một giá trị đồng thời chỉ định hình dạng của nó. Chúng ta có thể làm điều này bằng cách sử dụng từ khóa `as`.

```aiken
when xs is {
  [[_, ..] as inner_list] -> inner_list
  _other -> []
}
```

### Clause guards (điều khoản bảo vệ)

Từ `if` khóa có thể được sử dụng để thêm biểu thức bảo vệ vào mệnh đề `When`. Cả hai mẫu phải khớp và người bảo vệ phải đánh giá `True` để mệnh đề khớp. Biểu thức bảo vệ có thể kiểm tra sự bằng nhau hoặc sắp xếp thứ tự cho `Int`.

```aiken
when xs is {
  [a, b, c] if a == b && b != c -> "ok"
  _other -> "ko"
}
```

### Error & Todo

Đôi khi, bạn cần tạm dừng việc đánh giá chương trình của mình vì bạn đã gặp phải một trường hợp được coi là không hợp lệ hoặc đơn giản vì bạn chưa hoàn thành việc phát triển một số logic. Aiken cung cấp hai từ khóa thuận tiện cho việc đó: `error` và `todo`.

Khi gặp phải, cả hai sẽ dừng việc đánh giá chương trình của bạn và bị coi là thất bại. Chúng khác nhau về ngữ nghĩa, tức là cách trình biên dịch ứng xử với chúng.

Trên thực tế, `todo` sẽ kích hoạt các cảnh báo khi biên dịch để nhắc nhở bạn về những phần chưa hoàn thành đó. `error` sẽ không, vì nó được coi là điểm dừng mong muốn. Lưu ý rằng cảnh báo cũng bao gồm loại biểu thức dự kiến ​​cần thay thế `todo`. Đây có thể là một cách hữu ích để hỏi trình biên dịch loại nào là cần thiết nếu bạn không chắc chắn.

Hãy xem một ví dụ cho cả hai để nắm bắt sự khác biệt:

```aiken
fn favourite_number() -> Int {
  // The type annotations says this returns an Int, but we don't need
  // to implement it yet.
  todo
}
 
fn expect_some_value(opt: Option<a>) -> a {
  when opt is {
    Some(a) -> a
    None -> error // We want this to fail when we encounter 'None'.
  }
}
```

Khi mã này được xây dựng, Aiken sẽ gõ kiểm tra và biên dịch mã để đảm bảo nó hợp lệ và or todosẽ errorđược thay thế bằng mã làm hỏng chương trình nếu chức năng đó được chạy.

### Giving a reason (Đưa ra lý do)
Một `String` tin nhắn có thể được đưa ra như một dạng tài liệu. Thông báo sẽ được truy tìm khi mã `todo` hoặc `error` được đánh giá. Lưu ý rằng đây có thể là nơi duy nhất bạn gặp phải loại này `String` và điều này là do tin nhắn cần phải in được -- không giống như hầu hết ByteArraycác loại thường đơn giản là vô nghĩa.

```aiken
fn favourite_number() -> Int {
  todo @"Believe in the you that believes in yourself!"
}
 
fn expect_some_value(opt: Option<a>) -> a {
  when opt is {
    Some(a) -> a
    None -> error @"Option has no value"
  }
}
```