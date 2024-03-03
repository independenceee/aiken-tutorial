# Biến & Hằng

## Variables / let-bindings

Trong aiken sử dụng từ khóa `let` để khai báo các biến. Aiken có các ràng buộc để khai báo các biến. Một giá trị có thể được đặt tên bằng từ khóa `let` + `tên biến`. Tên có thể được dùng lại cho các ràng buộc sau này

```ak
test init() {
    let x = 1 // Khai báo số nguyên trong aiken
    let y = "Aiken" // Khai báo một số chuỗi trong aiken

    x == 1 && y == "Aiken" // True
}
```

Trong ví dụ trên x được khai báo là kiểu số nguyên và có giá trị bằng `1` và tương tự biến `y` cũng được khai báo có kiểu kí tự và giá trị là `Aiken` thông qua từ khóa `let` .

Các giá trị được gán cho các liên kết `let` là không thay đổi, tuy nhiên các liên kết mới có thể che khuất các liên kết trước đó.

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

## Module constants

Việc liên kết không được phép trong mô-đun Aiken cấp cao nhất. Tuy nhiên, Aiken cung cấp các Module constants như một cách để sử dụng các giá trị cố định nhất định ở nhiều nơi trong dự án Aiken.

```ak
const YEAR = 2024
```

Giống như tất cả các giá trị trong Aiken, `constants` là không thay đổi. Chúng không thể được sử dụng làm trạng thái có thể thay đổi toàn cầu. Khi một hằng số được tham chiếu, giá trị của nó được trình biên dịch nội tuyến để chúng có thể được sử dụng ở bất kỳ nơi nào mà bạn đã viết một hằng số để bắt đầu (ví dụ: các bộ bảo vệ biểu thức khi nào, mệnh đề if ...). Chúng ta sẽ xem một số ví dụ về điều đó khi xử lý các luồng điều khiển.

`Lưu ý rằng bạn chỉ có thể khai báo hằng mô-đun cho các loại Aiken sau:`Int`, `ByteArray`và`String`.
`

## Type annotations

Các biến và hằng có thể được đưa ra các chú thích kiểu. Các chú thích này đóng vai trò là tài liệu hoặc có thể được sử dụng để cung cấp một loại cụ thể hơn trình biên dịch sẽ suy ra.

```ak
const name: ByteArray = "Aiken"
const size: Int = 1711

let result: Bool = 14 > 42
```
