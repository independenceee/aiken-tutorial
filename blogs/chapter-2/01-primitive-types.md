# Các loại kiểu dữ liệu

Biến trên thực tế là bộ nhớ để lưu một giá trị nào đó. Khi khai báo biến tức là ta đang khai báo với hệ thống dành riêng không gian trong bộ nhớ. Dựa trên kiểu dữ liệu của một biến, hệ điều hành cấp phát bộ nhớ và quyết định cái gì có thể được lưu giữ trong bộ nhớ dành riêng đó.

Aiken có 6 kiểu nguyên thủy được xây dựng bằng ngôn ngữ và có thể được gõ dưới dạng chữ:

1. `Boolean`
2. `Int`
3. `String`
4. `ByteArray`
5. `Data`
6. `Void`

Ngôn ngữ này cũng bao gồm 2 khối xây dựng cơ bản để liên kết các loại với nhau:

1. `List`
2. `Tuples`

Đừng lo lắng, chúng ta sẽ xem phần sau trong hướng dẫn này cách tạo các loại tùy chỉnh của riêng bạn.

Nhận xét nội tuyến được biểu thị thông qua `//`. Chúng tôi sẽ sử dụng chúng để minh họa giá trị của một số biểu thức trong các ví dụ được đưa ra trong hướng dẫn này.

### Bool

`Bool` là một giá trị boolean có thể là `True` hoặc `False`.

Aiken định nghĩa một số toán tử hoạt động với boolean. Không còn nghi ngờ gì nữa, chúng sẽ trông khá quen thuộc.

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

| Nhà điều hành | Sự miêu tả                | Quyền ưu tiên |
| :------------ | :------------------------ | :------------ |
| ==            | Bình đẳng                 | 4             |
| &&            | Kết hợp logic (VÀ)        | 3             |
| \|\|          | Sự phân tách logic (HOẶC) | 2             |
| !             | Phủ định logic            | 1             |
| ?             | Dấu vết nếu sai           | 1             |

### Int

Loại số duy nhất của Aiken là số nguyên có kích thước tùy ý. Điều này có nghĩa là không có hiện tượng tràn hoặc tràn.

```ak
let
42
14
1337
```

Các chữ cũng có thể được viết dưới `_` dạng dấu phân cách để nâng cao khả năng đọc:

```ak
test checkInt() {
    1_000_000 == 1000000 // True
}
```

Aiken cũng hỗ trợ viết các số nguyên ở các cơ số khác ngoài số thập phân. Các số nguyên nhị phân, bát phân và thập lục phân bắt đầu tương ứng bằng `0b`, `0o`, và `0x`.

```ak
0b00001111 == 15
0o17 == 15
0xF == 15
```

Aiken có một số toán tử số học nhị phân hoạt động với số nguyên.

| Nhà điều hành | Sự miêu tả | Quyền ưu tiên |
| :------------ | :--------- | :------------ |
| +             | Tổng       | 6             |
| -             | Hiệu       | 7             |
| /             | Chia       | 7             |
| \*            | Nhân       | 4             |
| %             | Chia       | 4             |

Tất nhiên, các số nguyên cũng có thể so sánh được, vì vậy chúng cũng hoạt động với nhiều toán tử logic nhị phân khác nhau:

| Nhà điều hành | Sự miêu tả        | Quyền ưu tiên |
| :------------ | :---------------- | :------------ |
| ==            | Bình đẳng         | 6             |
| >             | Lớn hơn           | 4             |
| <             | Nhỏ hơn           | 4             |
| >=            | Lớn hơn hoặc bằng | 4             |
| <=            | Nhỏ hơn hoặc bằng | 4             |

### ByteArray

`ByteArray` chính xác là một mảng byte. Aiken hỗ trợ ba ký hiệu để khai báo các ký tự `ByteArray`.

#### Là một mảng byte

Đầu tiên, dưới dạng danh sách các số nguyên nằm trong khoảng từ 0 đến 255 (còn gọi là bytes ):

```ak
#[10, 255]
#[1, 256] // dẫn đến lỗi phân tích cú pháp vì 256 lớn hơn 1 byte
```

Các quy tắc cú pháp cho số nguyên bằng chữ cũng áp dụng cho mảng byte. Vì vậy, cú pháp sau đây là hoàn toàn hợp lệ:

```ak
#[0xff, 0x42]
```

#### Là một chuỗi byte

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

#### Tuples

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

`List` là tập hợp các giá trị được sắp xếp. Chúng là một trong những cấu trúc dữ liệu phổ biến nhất trong Aiken.

Không giống như `Tuples`, tất cả các thành phần của `List` phải cùng loại. Cố gắng tạo `List` bằng nhiều loại khác nhau sẽ dẫn đến lỗi loại.

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

`Void` là một kiểu đại diện cho hàm tạo null, hay nói một cách đơn giản là không có giá trị. Nó được biểu thị `Void` là một kiểu và hàm tạo. Về cơ bản, nếu bạn nghĩ về mặt `Tuples`, `Void` thì đó là một `Tuples` không có phần tử nào trong đó.

`Void` rất hữu ích trong một số trường hợp nhất định, nhưng vì trong Aiken mọi thứ đều là một biểu thức được gõ (không có "câu lệnh") nên bạn sẽ hiếm khi rơi vào tình huống cần đến nó.

### Data

`Data` có thể đại diện cho bất kỳ loại nào do người dùng xác định trong Aiken. Chúng ta sẽ tìm hiểu thêm về `Data` thời điểm chúng tôi đề cập đến các loại tùy chỉnh. Trong khi chờ đợi, hãy coi `Data` như một loại ký tự đại diện có thể đại diện cho bất kỳ giá trị nào.

Điều này hữu ích khi bạn cần sử dụng các giá trị từ các loại khác nhau trong một cấu trúc đồng nhất. Bất kỳ loại nào do người dùng xác định đều có thể được chuyển thành `Data` và bạn có thể thử chuyển đổi từ `Data` sang bất kỳ loại tùy chỉnh nào một cách an toàn. Ngoài ra, một số nội dung ngôn ngữ chỉ hoạt động `Data` như một cách để giải quyết tính đa hình.

### String

Trong Aiken, chuỗi văn bản có thể được viết dưới dạng văn bản được bao quanh bởi dấu ngoặc kép, có tiền tố là `@`.

```ak
@"Hello, Aiken!"
```

Chúng có thể trải dài trên nhiều dòng.

```ak
@"Hello
Aiken!"
```

Dưới chuỗi văn bản mui xe là UTF-8 nhị phân được mã hóa và có thể chứa bất kỳ unicode hợp lệ nào.

```aiken
@"🌘 프로그래밍 과정을 처음부터 전문가까지 Aiken Tutorial 🌒"
```

Hãy cẩn thận, trường hợp sử dụng `String` cực kỳ hạn chế trong Aiken và mã trên chuỗi. Chúng chỉ được sử dụng để theo dõi , hơi giống các nhãn được gắn vào các đường dẫn thực thi cụ thể của chương trình của bạn. Ví dụ: bạn không thể tìm thấy chúng trong giao diện được trình xác thực của bạn hiển thị. Vì vậy, hầu hết thời gian, bạn có thể sử dụng `ByteArray` thay thế và chỉ dùng đến `String` để gỡ lỗi.
