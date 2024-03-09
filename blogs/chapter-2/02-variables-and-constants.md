# Biến & Hằng

## Biến (Variables / let-bindings)

Trong lập trình với ngôn ngữ Aiken, bạn sử dụng từ khóa "let" để khai báo các biến và ràng buộc. Một giá trị có thể được gán cho một biến bằng cách sử dụng "let" kết hợp với tên của biến. Tên của biến có thể được sử dụng lại cho các ràng buộc sau này. Điều này có nghĩa là bạn có thể tái sử dụng các biến đã được khai báo khi bạn đặt ràng buộc mới. Điều này giúp giảm thiểu việc phải định nghĩa lại các biến nếu chúng được sử dụng trong các ràng buộc khác nhau.

```ak
test init() {
    let x = 1 // Khai báo số nguyên trong aiken
    let y = "Aiken" // Khai báo một số chuỗi trong aiken

    x == 1 && y == "Aiken" // True
}
```

Trong ví dụ trên x được khai báo là kiểu số nguyên và có giá trị bằng `1` và tương tự biến `y` cũng được khai báo có kiểu kí tự và giá trị là `Aiken` thông qua từ khóa `let` .

Trong ngôn ngữ lập trình Aiken, giá trị của các biến được gán thông qua từ khóa `let` không thay đổi sau khi chúng đã được khởi tạo. Tuy nhiên, khi bạn khai báo một biến mới bằng cách sử dụng cùng một tên với một biến đã tồn tại, biến mới sẽ che khuất biến cũ và biến cũ sẽ không còn sử dụng được trong phạm vi mới. Điều này gọi là "che khuất biến" (variable shadowing) và là một tính năng phổ biến trong nhiều ngôn ngữ lập trình.

```aiken
test init() {
    let x = 1
    let y = x
    x = 2 // Các biến chỉ được khi một lần và không thay đổi
    let x = 2 // Biến mới có thể che khuất các biến trước đó
    y + x == 3 // True
}
```

### Expect

Bạn cũng có thể giới thiệu các ràng buộc mới thông qua từ khóa `expect`.

```aiken
type Option<a> {
    Some(a)
    None
}

test tExpect() {
    let a = Some(4)
    expect Some(b) = a
    b == 4

}

```

```ak
expect Some(foo) = my_optional_value
```

Chúng ta sẽ tìm hiểu thêm về từ khóa mong đợi khi nói về các loại tùy chỉnh . Hiện tại, chỉ cần biết rằng nó tồn tại là đủ.

## Hằng (Module constants)

Trong Aiken, liên kết không được phép ở mức mô-đun cấp cao nhất. Tuy nhiên, bạn có thể sử dụng các hằng số mô-đun để định nghĩa các giá trị cố định mà bạn muốn sử dụng ở nhiều nơi trong dự án Aiken của mình.

```ak
const YEAR = 2024
```

Trong Aiken, hằng số được xác định là không thay đổi. Chúng không thể được sử dụng như trạng thái có thể thay đổi toàn cục. Khi một hằng số được tham chiếu, giá trị của nó được biên dịch nội tuyến để chúng có thể được sử dụng ở bất kỳ đâu mà bạn đã định nghĩa hằng số đó (ví dụ: trong các điều kiện bảo vệ biểu thức, trong câu lệnh if...else). Dưới đây là một số ví dụ về điều này khi xử lý các luồng điều khiển.

Lưu ý rằng bạn chỉ có thể khai báo hằng số mô-đun cho các kiểu dữ liệu Aiken sau: Int, ByteArray, và String.

## Type annotations

Trong Aiken, bạn có thể đính kèm các chú thích kiểu cho các biến và hằng số. Các chú thích này có thể đóng vai trò như tài liệu, giúp người đọc hiểu rõ hơn về ý nghĩa và cách sử dụng của biến hoặc hằng số. Ngoài ra, chú thích kiểu cũng có thể được sử dụng để cung cấp thông tin cho trình biên dịch, giúp nó suy ra một loại cụ thể cho biến hoặc hằng số đó.

Dưới đây là một ví dụ về cách sử dụng chú thích kiểu trong Aiken:

```ak
// Biến này lưu trữ tên.
const name: ByteArray = "Aiken"

// Hằng số này đại diện cho số tháng trong một năm.
const size: Int = 1711

// Biến này lưu trữ kết quả.
let result: Bool = 14 > 42
```

Trong ví dụ trên, các chú thích kiểu đã được sử dụng để mô tả ý nghĩa của biến và hằng số, giúp người đọc hiểu rõ hơn về chúng.
