# Control flow

### Blocks

Aiken, mỗi khối là một biểu thức và tất cả các biểu thức trong khối sẽ được thực thi. Kết quả của biểu thức cuối cùng trong khối sẽ được trả về. Dưới đây là ví dụ minh họa:

```aiken
let value: Bool = {
    "Hello"
    42 + 12
    False
}
value == False
```

Trong ví dụ này, giá trị của biến value sẽ được gán bằng giá trị của biểu thức cuối cùng trong khối, tức là False. Các khối biểu thức cũng có thể được sử dụng để thay đổi thứ tự ưu tiên của các phép toán, như trong ví dụ sau:

```aiken
let celsius = { fahrenheit - 32 } * 5 / 9
```

Trong ví dụ này, biểu thức trong khối sẽ được thực thi trước (fahrenheit - 32), sau đó kết quả sẽ được nhân với 5 và chia cho 9. Điều này cho phép tính toán nhiệt độ theo độ Celsius từ nhiệt độ theo độ Fahrenheit.

### Matching

trong Aiken, biểu thức `when *expr* is` là một loại điều khiển luồng phổ biến nhất, cho phép chúng ta thực hiện khớp mẫu dữ liệu và xử lý theo từng trường hợp. Dưới đây là một ví dụ minh họa:

Ở đây, chúng tôi khớp với an `Int` và trả về một chuỗi cụ thể cho các giá trị 0, 1 và 2. Mẫu cuối cùng `n` khớp với bất kỳ giá trị nào khác không khớp với bất kỳ mẫu nào trước đó.

```aiken
when some_number is {
  0 -> "Zero"
  1 -> "One"
  2 -> "Two"
  n -> "Some other number" // This matches anything
}
```

Trong ví dụ này, chúng ta khớp mẫu với giá trị của biến some_number và thực hiện xử lý tương ứng với mỗi trường hợp. Nếu some_number là 0, ta trả về "Zero", nếu là 1, trả về "One", và tương tự.

Aiken `when *expr* is` là một biểu thức, nghĩa là nó trả về một giá trị và có thể được sử dụng ở bất cứ đâu mà chúng ta sử dụng một giá trị. Ví dụ: chúng ta có thể đặt tên cho giá trị được đánh giá từ biểu thức when bằng một `let` liên kết. Ví dụ, chúng ta có thể sử dụng nó để gán giá trị cho một biến như sau:

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

Trong ví dụ này, biểu thức `when answer is` sẽ xác định giá trị của biến description dựa trên giá trị của biến answer. Nếu answer là Yes, description sẽ được gán "It's true!", ngược lại, nếu answer là No, description sẽ được gán "It's not yes.".

### If - Else

Trong Aiken, việc khớp mẫu trên một giá trị Bool không được khuyến khích và thay vào đó nên sử dụng các biểu thức if / else. Dưới đây là một ví dụ minh họa:

```aiken
let some_bool = True

if some_bool {
  "It's true!"
} else {
  "It's not true."
}
```

Trong ví dụ này, chúng ta sử dụng câu lệnh if / else để kiểm tra giá trị của some_bool. Nếu some_bool là True, chúng ta trả về "It's true!", ngược lại, nếu some_bool là False, chúng ta trả về "It's not true.". Lưu ý rằng if / else trong Aiken không phải là một câu lệnh điều khiển mà là một biểu thức duy nhất. Điều này có nghĩa là cả hai nhánh của if / else phải trả về cùng một kiểu dữ liệu. Bạn cũng có thể sử dụng nhiều câu lệnh else/if với điều kiện tùy ý như sau:

```aiken
fn fibonacci(n: Int) -> Int {
  if n == 0 {
    0
  } else if n == 1 {
    1
  } else {
    fibonacci(n-2) + fibonacci(n-1)
  }
}


```

Trong ví dụ này, chúng ta sử dụng else/if để tính toán số Fibonacci của một số nguyên n. Nếu n là 0 hoặc 1, chúng ta trả về giá trị tương ứng. Ngược lại, chúng ta tính toán số Fibonacci bằng cách gọi đệ quy.

### Destructuring

một biểu thức `when _expr_ is` có thể được sử dụng để hủy cấu trúc các giá trị chứa các giá trị khác nhau, chẳng hạn như bộ dữ liệu và danh sách. Dưới đây là một ví dụ minh họa sử dụng `when _expr_ is` để khớp mẫu trên các danh sách:

```aiken
when xs is {
  [] -> "This list is empty"
  [a] -> "This list has 1 element"
  [a, b] -> "This list has 2 elements"
  _other -> "This list has more than 2 elements"
}
```

Trong ví dụ này, chúng ta khớp mẫu trên danh sách xs và xác định số lượng phần tử trong danh sách. Nếu danh sách là rỗng, chúng ta trả về "This list is empty". Nếu danh sách có một phần tử, chúng ta trả về "This list has 1 element", và tương tự cho các trường hợp khác.

Không chỉ cấu trúc dữ liệu cấp cao nhất có thể được khớp mẫu, mà các giá trị được chứa trong cấu trúc cũng có thể được khớp. Điều này cho phép biểu thức when biểu diễn điều khiển luồng có thể dài dòng mà không cần phải khớp mẫu từng cấp.

Dưới đây là một ví dụ khác sử dụng when _expr_ is để khớp mẫu trên các danh sách lồng nhau. Trong ví dụ này, chúng ta xác định các trường hợp khác nhau của danh sách xs. Đối với mỗi trường hợp, chúng ta trả về một chuỗi miêu tả tương ứng.

```aiken
when xs is {
  [[]] -> "The only element is an empty list"
  [[], ..] -> "The 1st element is an empty list"
  [[4], ..] -> "The 1st element is a list of the number 4"
  other -> "Something else"
}
```

### So khớp các hàm tạo biến thể đơn

Aiken cho phép bạn khớp mẫu trên các giá trị từ các loại có một hàm tạo duy nhất bằng cách sử dụng let liên kết trực tiếp. Điều này có thể áp dụng cho các loại như Tuple hoặc các loại tùy chỉnh có một hàm tạo duy nhất. Dưới đây là một ví dụ:

```aiken
type Foo {
  foo: Int
}

let (a, b, c) = (1, 2, 3)  // Khớp mẫu với một Tuple
let Foo { foo } = Foo { foo: 42 }  // Khớp mẫu với một loại tùy chỉnh có một hàm tạo duy nhất
```

Trong ví dụ này, let (a, b, c) = (1, 2, 3) khớp mẫu với một Tuple và gán giá trị 1 cho a, 2 cho b, và 3 cho c. Trong khi đó, let Foo { foo } = Foo { foo: 42 } khớp mẫu với một loại tùy chỉnh Foo có một hàm tạo duy nhất và gán giá trị 42 cho trường foo.

### Gán tên cho các mẫu phụ

bạn có thể gán tên cho một giá trị và đồng thời chỉ định hình dạng của nó trong biểu thức when bằng cách sử dụng từ khóa as.

```aiken
when xs is {
  [[_, ..] as inner_list] -> inner_list
  _other -> []
}
```

Biểu thức [[_, ..] as inner_list] khớp mẫu với một danh sách chứa ít nhất một phần tử và gán tên inner_list cho phần còn lại của danh sách này. Điều này cho phép bạn sử dụng inner_list như là một biến để tham chiếu đến phần còn lại của danh sách trong phần thân của biểu thức when. Nếu không có mẫu nào khớp, mẫu \_other sẽ được kích hoạt và trả về một danh sách trống [].

### Clause guards (điều khoản bảo vệ)

Từ khóa `if` có thể được sử dụng để thêm biểu thức bảo vệ vào mệnh đề `When`. Cả hai mẫu phải khớp và người bảo vệ phải đánh giá `True` để mệnh đề khớp. Biểu thức bảo vệ có thể kiểm tra sự bằng nhau hoặc sắp xếp thứ tự cho `Int`.

```aiken
when xs is {
  [a, b, c] if a == b && b != c -> "ok"
  _other -> "ko"
}
```

Biểu thức [a, b, c] là mẫu và if a == b && b != c là biểu thức bảo vệ. Điều kiện này yêu cầu a và b phải bằng nhau và không được bằng c. Nếu cả hai điều kiện này đều đúng, thì mệnh đề when khớp và trả về chuỗi "ok". Nếu không có mẫu nào khớp, mẫu other sẽ được kích hoạt và trả về chuỗi "ko".

### Error & Todo

từ khóa todo và error đều cho phép bạn tạm dừng việc đánh giá chương trình của mình trong trường hợp bạn cần phải hoàn thiện logic hoặc xử lý các trường hợp không hợp lệ.

Tuy nhiên, chúng khác nhau về cách xử lý trong quá trình biên dịch:

-   `todo`: Tạo ra một cảnh báo khi biên dịch để nhắc nhở bạn về những phần chưa hoàn thành trong chương trình. Điều này giúp bạn nhận biết các phần cần được cải thiện hoặc hoàn thiện.

-   `error`: Dừng việc đánh giá chương trình và coi đó là một lỗi. Điều này hữu ích khi bạn muốn chắc chắn rằng một phần của chương trình không được triển khai hoặc xử lý chính xác.

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

Khi mã này được biên dịch, todo sẽ tạo ra một cảnh báo nhắc nhở bạn về việc chưa hoàn thành hàm favourite_number(). Trong khi đó, error sẽ làm cho chương trình dừng và báo lỗi nếu hàm expect_some_value được gọi với một Option giá trị là None.

Khi mã này được xây dựng, Aiken sẽ gõ kiểm tra và biên dịch mã để đảm bảo nó hợp lệ và or todo sẽ error được thay thế bằng mã làm hỏng chương trình nếu chức năng đó được chạy.

### Giving a reason (Đưa ra lý do)

trong Aiken, một String có thể được sử dụng làm thông báo trong các trường hợp sử dụng từ khóa todo hoặc error. Thông báo này sẽ được hiển thị khi mã todo hoặc error được đánh giá. Ví dụ của bạn minh họa cách sử dụng String như một thông báo:

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

Trong các hàm favourite_number() và expect_some_value(), thông báo String được chỉ định sau từ khóa todo và error, tương ứng. Khi mã này được đánh giá và gặp phải các từ khóa này, thông báo sẽ được hiển thị để cung cấp thông tin về tình trạng chưa hoàn thành hoặc lỗi.
