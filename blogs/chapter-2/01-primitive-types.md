# Các loại kiểu dữ liệu

Trong lập trình, biến là một phần của bộ nhớ được sử dụng để lưu trữ một giá trị cụ thể. Khi bạn khai báo một biến, bạn đang yêu cầu hệ thống cấp phát một phần không gian trong bộ nhớ để lưu trữ giá trị của biến đó.

Aiken cung cấp sẵn 6 kiểu dữ liệu nguyên thủy, cung cấp các loại dữ liệu cơ bản mà bạn có thể sử dụng để định kiểu cho các biến và giá trị trong chương trình của mình. Các kiểu này bao gồm `Boolean`, `Int`, `String`, `ByteArray`, `Data`, và `Void`. Ngoài ra, Aiken cũng cung cấp 2 khối xây dựng cơ bản để liên kết các loại dữ liệu với nhau: `List` và `Tuples`.

Chú thích nội tuyến được biểu thị bằng cặp dấu `//` và thường được sử dụng để cung cấp giải thích hoặc tài liệu cho mã của bạn. Trong hướng dẫn này, chúng ta sẽ sử dụng chú thích này để minh họa các giá trị của biểu thức trong các ví dụ.

### Bool

Trong Aiken, `Bool` là một kiểu dữ liệu đại diện cho các giá trị `boolean`, có thể chỉ ra một trong hai trạng thái: `True` hoặc `False`. Các giá trị này thường được sử dụng để điều khiển luồng thực thi của chương trình.

Aiken cung cấp một số toán tử phổ biến để thực hiện các phép toán với các giá trị boolean, và chúng thường rất quen thuộc với những người đã làm quen với lập trình

1. Toán tử `AND` (&&): Trả về `True` nếu cả hai biểu thức đều đúng, ngược lại trả về `False`.
2. Toán tử `OR` (||): Trả về `True` nếu ít nhất một trong hai biểu thức là `True`, ngược lại trả về `False`.
3. Toán tử NOT (!): Trả về `True` nếu biểu thức là sai, và ngược lại.

```aiken
// &&

True && True === True
False && False === False
False && True === True

// ||

True || True === True
True || False === True
False || False === False
```

```aiken
test init() {
    let a = True;
    let b = False;

    a && b // FALSE
}
```

Trong ví dụ trên, chúng ta sử dụng các toán tử boolean để kiểm tra các điều kiện và gán giá trị cho các biến boolean khác dựa trên các kết quả của các biểu thức đó. Quyền ưu tiên thường được sử dụng để xác định thứ tự của các toán tử trong một biểu thức. Các toán tử có quyền ưu tiên cao hơn sẽ được đánh giá trước trong biểu thức. Điều này có nghĩa là trong biểu thức có sử dụng nhiều loại toán tử, các toán tử có quyền ưu tiên cao hơn sẽ được thực hiện trước.

| Nhà điều hành | Sự miêu tả                | Quyền ưu tiên |
| :------------ | :------------------------ | :------------ |
| ==            | Bình đẳng                 | 4             |
| &&            | Kết hợp logic (VÀ)        | 3             |
| \|\|          | Sự phân tách logic (HOẶC) | 2             |
| !             | Phủ định logic            | 1             |
| ?             | Dấu vết nếu sai           | 1             |

### Int

Trong Aiken, kiểu số duy nhất là kiểu số nguyên, và nó có kích thước tùy ý. Điều này có nghĩa là số nguyên trong Aiken không bị giới hạn bởi kích thước cố định như trong một số ngôn ngữ khác như `C` hay `Java`. Trong Aiken, không có hiện tượng tràn số (overflow) hoặc tràn số (underflow). Điều này có nghĩa là bạn có thể sử dụng các số nguyên một cách tự nhiên mà không cần lo lắng về việc chúng có vượt quá giới hạn hoặc bị tràn dưới giới hạn như trong một số ngôn ngữ khác.

```ak
let
42
14
1337
```

Trong Aiken, bạn có thể sử dụng dấu phân cách `_` để tăng khả năng đọc của mã số nguyên. Việc này giúp làm cho các số nguyên lớn dễ đọc hơn và giúp tránh nhầm lẫn. Ví dụ, bạn có thể viết `1_000_000` thay vì `1000000`.

Dưới đây là một ví dụ về cách sử dụng dấu phân cách `_` trong Aiken:

```ak
test checkInt() {
    1_000_000 == 1000000 // True
}
```

Ngoài ra, Aiken cũng hỗ trợ viết các số nguyên ở các cơ số khác ngoài số thập phân. Bạn có thể sử dụng các tiền tố `0b` cho nhị phân, `0o` cho bát phân, và `0x` cho thập lục phân. Ví dụ:

```ak
let binary_number = 0b1010 // 10 ở hệ nhị phân
let octal_number = 0o16    // 14 ở hệ bát phân
let hexadecimal_number = 0x1F  // 31 ở hệ thập lục phân
```

Trong Aiken, các toán tử số học chính là các phép tính số học thông thường mà bạn có thể biết từ trước. Các toán tử số học này hoạt động với số nguyên và cho phép bạn thực hiện các phép tính cộng, trừ, nhân, chia và các phép tính khác.

```aiken
let x = 10
let y = 5

let sum = x + y        // Tính tổng: 10 + 5 = 15
let difference = x - y // Tính hiệu: 10 - 5 = 5
let product = x * y    // Tính tích: 10 * 5 = 50
let quotient = x / y   // Tính thương: 10 / 5 = 2
let remainder = x % y  // Lấy phần dư: 10 % 5 = 0
```

Dưới đây là một số ví dụ về các toán tử số học trong Aiken:

| Nhà điều hành | Sự miêu tả | Quyền ưu tiên |
| :------------ | :--------- | :------------ |
| +             | Tổng       | 6             |
| -             | Hiệu       | 7             |
| /             | Chia       | 7             |
| \*            | Nhân       | 4             |
| %             | Chia       | 4             |

Các toán tử này hoạt động tương tự như trong các ngôn ngữ lập trình khác và không gây ra phức tạp đối với việc sử dụng chúng. Các số nguyên trong Aiken có thể được so sánh bằng sử dụng các toán tử so sánh. Dưới đây là bảng mô tả các toán tử so sánh và quyền ưu tiên của chúng trong Aiken:

Tất nhiên, các số nguyên cũng có thể so sánh được, vì vậy chúng cũng hoạt động với nhiều toán tử logic nhị phân khác nhau:

| Nhà điều hành | Sự miêu tả        | Quyền ưu tiên |
| :------------ | :---------------- | :------------ |
| ==            | Bình đẳng         | 6             |
| >             | Lớn hơn           | 4             |
| <             | Nhỏ hơn           | 4             |
| >=            | Lớn hơn hoặc bằng | 4             |
| <=            | Nhỏ hơn hoặc bằng | 4             |

Các toán tử so sánh này cho phép bạn so sánh giá trị của các biến số nguyên và kết quả của các biểu thức so sánh sẽ trả về một giá trị `boolean` (`True` hoặc `False`). Điều này giúp trong việc kiểm tra các điều kiện trong chương trình và quyết định luồng thực thi của chương trình dựa trên kết quả của các so sánh.

Dưới đây là một ví dụ về việc sử dụng các toán tử so sánh với các số nguyên trong Aiken:

```aiken
test compareIntegers() {
    let x = 10
    let y = 5

    let equal = x == y          // Kiểm tra x có bằng y không ? (False)
    let greaterThan = x > y     // Kiểm tra x có lớn hơn y không ? (True)
    let lessThan = x < y        // Kiểm tra x có nhỏ hơn y không ? (False)
    let greaterThanOrEqual = x >= y // Kiểm tra x có lớn hơn hoặc bằng y không ? (True)
    let lessThanOrEqual = x <= y    // Kiểm tra x có nhỏ hơn hoặc bằng y không ? (False)
}
```

Trong ví dụ này:

-   `equal` sẽ có giá trị là `False` vì `x` không bằng `y`.
-   `greaterThan` sẽ có giá trị là `True` vì `x` lớn hơn `y`.
-   `lessThan` sẽ có giá trị là `False` vì `x` không nhỏ hơn `y`.
-   `greaterThanOrEqual` sẽ có giá trị là `True` vì `x` lớn hơn hoặc bằng `y`.
-   `lessThanOrEqual` sẽ có giá trị là `False` vì `x` không nhỏ hơn hoặc bằng `y`.

### ByteArray

Trong Aiken, `ByteArray` là một kiểu dữ liệu đại diện cho một mảng các byte. Aiken cung cấp ba cách để khai báo `ByteArray`:

1. Dưới dạng danh sách các số nguyên nằm trong khoảng từ 0 đến 255, còn gọi là bytes.
2. Dưới dạng chuỗi byte được mã hóa UTF-8.
3. Dưới dạng chuỗi byte được mã hóa hex.

Dưới đây là các ví dụ minh họa cách khai báo ByteArray theo các cách khác nhau:

#### Dưới dạng danh sách các số nguyên

Đầu tiên, dưới dạng danh sách các số nguyên nằm trong khoảng từ 0 đến 255 (còn gọi là bytes ):

```ak
#[10, 255]
#[1, 256] // dẫn đến lỗi phân tích cú pháp vì 256 lớn hơn 1 byte
```

Các quy tắc cú pháp cho số nguyên bằng chữ cũng áp dụng cho mảng byte. Vì vậy, cú pháp sau đây là hoàn toàn hợp lệ:

```ak
#[0xff, 0x42]
```

#### Dưới dạng chuỗi byte được mã hóa UTF-8

Thứ hai, dưới dạng chuỗi byte được mã hóa UTF-8. Đây thường là cách các chuỗi văn bản phổ biến được thể hiện. Trong Aiken, chỉ cần sử dụng dấu ngoặc kép cho điều đó:

```ak
"foo" == #[0x66, 0x6f, 0x6f] == #[102, 111, 111]
```

#### Dưới dạng chuỗi byte được mã hóa hex

Bởi vì việc thao tác các chuỗi byte được mã hóa `base 16` trong bối cảnh blockchain (ví dụ: transaction hash, policy id, v.v.) là khá phổ biến Aiken cũng hỗ trợ cú pháp tốc ký để khai báo `ByteArray` dưới dạng chuỗi thập lục phân.

Phía sau, Aiken giải mã chuỗi được mã hóa cho bạn và chỉ lưu trữ các byte thô dưới dạng `ByteArray`. Điều này đạt được bằng cách thêm tiền tố vào chuỗi byte có dấu ngoặc kép bằng `#` như sau:

```ak
#"666f6f" == #[0x66, 0x6f, 0x6f] == #[102, 111, 111] == "foo"
```

Lưu ý điều này khác với:

```ak
"666f6f" == #[0x36, 0x36, 0x36, 0x66, 0x36, 0x66] == #[54, 54, 54, 102, 54, 54]
```

### Tuples

Tuples có thể hữu ích cho việc nhóm các giá trị. Mỗi phần tử trong một bộ có thể có một kiểu khác nhau. Được giới hạn bởi cặp ngoặc (), tất cả những gì nằm trong đó là những phần tử của Tuple. Các phần tử của Tuple được phân cách nhau ra bởi dấu phẩy (,). Tuple có khả năng chứa mọi giá trị.

```ak
(10, "hello") // Có kiểu dữ liệu là (Int, ByteArray)
(1, 4, [0]) // Có kiểu dữ liệu là (Int, Int, List<Int>)
```

Các `Tuples` dài (tức là nhiều hơn 3 phần tử) thường không được khuyến khích. Thật vậy, các `Tuples` là các hàm tạo ẩn danh và mặc dù chúng nhanh chóng và dễ sử dụng nhưng chúng thường cản trở khả năng đọc. Khi các kiểu trở nên phức tạp hơn, người ta nên sử dụng các bản ghi thay thế (như chúng ta sẽ thấy sau).

Các phần tử của một bộ có thể được truy cập bằng cách sử dụng dấu chấm, theo sau là chỉ mục của phần tử (thứ tự). Ví dụ:

```ak
let point = (14, 42, 1337, 0)
let a = point.1st
let b = point.2nd
let c = point.3rd
let d = point.4th
(c, d, b, a) // (1337, 0, 42, 14)
```

#### List

Trong Aiken, `List` là một cấu trúc dữ liệu phổ biến được sử dụng để lưu trữ một tập hợp các giá trị được sắp xếp. Tất cả các thành phần của một `List` phải cùng loại, điều này có nghĩa là bạn không thể kết hợp các loại khác nhau trong một `List`.

```ak
[1, 2, 3, 4]  // List<Int>

["text", 3, 4]  // Type error!
```

Chèn vào đầu `List` rất nhanh và là cách ưa thích để thêm giá trị mới.

```ak
[1, ..[2, 3]] // [1, 2, 3]
```

Lưu ý rằng tất cả các cấu trúc dữ liệu trong Aiken đều không thể thay đổi nên việc thêm vào `List` sẽ không làm thay đổi `List` ban đầu. Thay vào đó, nó tạo một `List` mới với phần tử bổ sung mới một cách hiệu quả.

```ak
let x = [2, 3]
let y = [1, ..x]

x // [2, 3]
y // [1, 2, 3]
```

### Void

Đúng, trong Aiken, Void là một kiểu dữ liệu đại diện cho hàm tạo null hoặc không có giá trị. Nó được biểu thị là Void và là một kiểu dữ liệu cũng như hàm tạo. Cơ bản, Void có thể được coi là một loại Tuples không có phần tử nào trong đó.

Tuy Void có thể hữu ích trong một số trường hợp nhất định, nhưng vì trong Aiken mọi thứ đều là một biểu thức được gõ, không có "câu lệnh", nên bạn thường sẽ hiếm khi cần sử dụng nó. Điều này có nghĩa là bạn thường không cần phải xử lý trường hợp một hàm không trả về bất kỳ giá trị nào, vì mọi hàm đều phải trả về một giá trị, dù là Void hoặc một giá trị cụ thể.

Tóm lại, Void là một phần của cấu trúc dữ liệu của Aiken nhưng thường không được sử dụng nhiều do cách thiết kế của ngôn ngữ.

### Data

Data là một kiểu dữ liệu đặc biệt có thể đại diện cho bất kỳ loại dữ liệu nào được người dùng xác định. Bạn có thể xem Data như một kiểu dữ liệu đại diện có thể chứa bất kỳ giá trị nào, tương tự như kiểu dữ liệu Any trong một số ngôn ngữ lập trình khác.

Việc sử dụng Data hữu ích khi bạn cần lưu trữ các giá trị từ các loại khác nhau trong một cấu trúc dữ liệu đồng nhất mà không cần quan tâm đến loại cụ thể của mỗi giá trị. Bất kỳ loại dữ liệu nào do người dùng xác định đều có thể được chuyển đổi thành Data, và bạn có thể an toàn chuyển đổi từ Data sang bất kỳ loại tùy chỉnh nào.

Ngoài ra, việc sử dụng Data cũng có thể giải quyết một số vấn đề tính đa hình trong ngôn ngữ, cho phép bạn xử lý các loại dữ liệu khác nhau một cách linh hoạt.

Tuy nhiên, cần lưu ý rằng việc sử dụng quá nhiều Data có thể làm cho mã của bạn trở nên khó hiểu và khó bảo trì, vì bạn mất đi sự rõ ràng về loại dữ liệu mà mỗi giá trị đại diện. Do đó, hãy sử dụng Data một cách cẩn thận và hợp lý để tránh các vấn đề phức tạp trong quản lý mã nguồn của bạn.

### String

Trong Aiken, chuỗi văn bản có thể được viết dưới dạng văn bản được bao quanh bởi dấu ngoặc kép với tiền tố là @.Dưới đây là một số ví dụ về cách sử dụng chuỗi văn bản trong Aiken:

1. Viết một chuỗi văn bản đơn giản:

```ak
@"Hello, Aiken!"
```

2. Chuỗi văn bản có thể trải dài trên nhiều dòng:

```ak
@"Hello
Aiken!"
```

3. Chuỗi văn bản có thể chứa ký tự unicode:

```aiken
@"🌘 프로그래밍 과정을 처음부터 전문가까지 Aiken Tutorial 🌒"
```

Tuy nhiên, trong Aiken, trường hợp sử dụng String là rất hạn chế và được sử dụng chỉ để theo dõi, tương tự như việc gắn nhãn vào các đường dẫn thực thi cụ thể của chương trình. Thông thường, bạn sẽ không gặp chuỗi văn bản được hiển thị trong giao diện người dùng của ứng dụng của bạn. Thay vào đó, để giao tiếp với dữ liệu nhị phân hoặc dữ liệu không cần xử lý ngôn ngữ tự nhiên, bạn có thể sử dụng ByteArray. Trong trường hợp cần thiết, bạn có thể sử dụng String cho mục đích gỡ lỗi hoặc kiểm tra.
