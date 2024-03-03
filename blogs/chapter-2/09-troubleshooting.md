# Troubleshooting

Lập trình trên `On-Chain` có thể hơi tẻ nhạt và có nhiều điểm tương đồng với lập trình nhúng. Do môi trường thực thi quá hạn chế nên các chương trình phải được tối ưu hóa và thường có rất ít chỗ cho việc khắc phục lỗi.

Aiken cố gắng hết sức để cung cấp cho các nhà phát triển các công cụ bổ sung và khả năng sửa lỗi. Hãy cùng khám phá chúng.

### Traces

Đồng minh đầu tiên của bạn trong cuộc hành trình này là `traces`. Hãy coi dấu vết như một thông điệp tường trình, được máy ảo ghi lại vào thời điểm cụ thể. Bạn có thể thêm dấu vết vào biểu thức cấp cao nhất trong Aiken bằng từ khóa `trace`.

Ví dụ:

```aiken
fn is_even(n: Int) -> Bool {
  trace "is_even"
  n % 2 == 0
}
 
fn is_odd(n: Int) -> Bool {
  trace "is_odd"
  n % 2 != 0
}
```

Ban đầu có thể hơi khó nắm bắt các dấu vết vì Plutus -- và do đó là Aiken -- là một công cụ thực thi chức năng thuần túy. Do đó không có câu lệnh nào trong một chương trình được biên dịch. Chỉ có biểu thức . Dấu vết sẽ được thu thập nếu nó được máy ảo đánh giá. Có hai cách phổ biến để ghi lại dấu vết trong Aiken: khi chạy thử nghiệm qua `aiken check` hoặc khi mô phỏng giao dịch bằng `aiken tx simulate`. Trong cả hai trường hợp, dấu vết thu được trong quá trình đánh giá sẽ được in trên màn hình.

Ví dụ: trong chương trình sau:

```aiken
let n = 10
is_even(n) || is_odd(n)
```

Chỉ dấu vết `is_even` sẽ được ghi lại, vì `is_odd` trên thực tế nó không bao giờ được đánh giá (không cần thiết vì phía bên trái đã trả về `True`).



##### Lưu ý rằng dấu vết là:

* Bị xóa theo mặc định khi xây dựng dự án của bạn bằng `aiken build`. Chúng có thể được bảo quản bằng cách sử dụng `--keep-traces`;
* Được giữ theo mặc định khi kiểm tra dự án của bạn bằng `aiken check`. Chúng có thể bị loại bỏ bằng cách sử dụng `--no-traces`.
  
Điều này là do việc theo dõi làm cho mã được biên dịch lớn hơn và có thể bổ sung thêm chi phí thường không mong muốn đối với các trình xác thực sẵn sàng sản xuất cuối cùng. Tuy nhiên, chúng rất hữu ích cho việc phát triển và khi thử nghiệm. Do đó, dòng lệnh hướng đến những trường hợp sử dụng đó. Xin lưu ý rằng mặc dù việc bật hoặc tắt dấu vết không làm thay đổi ngữ nghĩa chương trình của bạn, nhưng nó sẽ thay đổi một cách hiệu quả giá trị băm và do đó các địa chỉ liên quan của nó.

### ? operator

Các chương trình trên chuỗi về cơ bản không có gì khác hơn là các biến vị ngữ. Nói cách khác, chúng là các hàm trả về `True` hoặc `False`. Do đó, thực tế phổ biến là cấu trúc các chương trình trên chuỗi dưới dạng các kết hợp và phân tách của các biểu thức boolean.

Tuy nhiên, điều này có thể hơi khó giải thích vì booleans "blind". Nghĩa là, bạn sẽ mất thông tin về ngữ cảnh ban đầu khi đánh giá các biểu thức boolean phức tạp.

Lấy ví dụ biểu thức đơn giản sau:

```aiken
let must_be_after = True
let must_spend_token = False
 
must_be_after && must_spend_token
```

Nó đánh giá tới `False`. Chỉ từ `False`, bạn thực sự không thể biết nhánh nào thực sự nằm `False` trong biểu thức ban đầu. Tuy nhiên, việc suy luận về các biểu thức lớn hơn để khắc phục sự cố thường rất hữu ích.

Đây là lý do tại sao Aiken cung cấp `?` toán tử (đọc là "toán tử dấu vết nếu sai" ). Toán tử postfix này có thể được thêm vào bất kỳ biểu thức boolean nào và sẽ chỉ theo dõi biểu thức nếu nó ước tính là `False`. Điều này rất hữu ích để theo dõi toàn bộ đường dẫn đánh giá dẫn đến biểu thức cuối cùng là `False`. Trong ví dụ trên, chúng ta có thể viết:

```aiken
must_be_after? && must_spend_token?
```

Mà có thể đã tạo ra dấu vết `"must_spend_token ? False"`.

Ngẫu nhiên, `?` toán tử hoạt động như thế `trace` và do đó bị ảnh hưởng bởi các tùy chọn `--keep-traces` và `--no-traces`. Do đó, khi biên dịch để sản xuất, nó không ảnh hưởng gì đến chương trình và hoạt động như thể nó không hề có ở đó.

### CBOR diagnostic

Điều này thật tuyệt vời nhưng đôi khi, bạn cần nhiều hơn thế. Đôi khi, bạn cần kiểm tra giá trị của một số đối tượng cụ thể khi chạy . Điều này khó hơn tưởng tượng vì một chương trình Aiken được biên soạn đã xóa mọi bối cảnh và mọi khái niệm về loại. Ngay cả các hàm và tên biến cũng được thay thế bằng các chỉ mục nhỏ gọn khiến việc kiểm tra các chương trình và giá trị trong thời gian chạy tương đối khó khăn. Ví dụ: đây là giao diện của một hàm được biên dịch trong UPLC:

```
(lam i_31
  (lam i_32
    (lam i_33
      (force
        [ [ [ i_2 i_32 ] (delay (con unit ())) ]
          (delay
            [ [ i_4 [ i_33 [ i_1 i_32 ] ] ]
              [ [ [ i_31 i_31 ] [ i_0 i_32 ] ] i_33
              ]
            ]
          )
        ]
      )
    )
  )
)
```

Note khá dễ đọc nhỉ? Nhưng vẫn có hy vọng! Thư viện chuẩn của Aiken cung cấp một phương pháp thuận tiện để kiểm tra bất kỳ giá trị nào trong thời gian chạy và thu được `String` biểu diễn của chúng. Cú pháp được sử dụng cho biểu diễn này được gọi là chẩn đoán CBOR. Hãy coi nó như một cú pháp cấp cao giống với JSON và có thể biểu thị dữ liệu nhị phân.

```aiken
aiken/cbor
pub fn diagnostic(data: Data) -> String
```

Tại sao bạn có thể hỏi tại sao nên sử dụng chẩn đoán CBOR?

Vâng, bởi vì đó là thứ nắm bắt một cách trung thực nhất sự thể hiện của các đối tượng có trong thời gian chạy và trong giao diện của trình xác thực trên chuỗi. Làm quen với chẩn đoán CBOR đòi hỏi phải thực hành một chút nhưng có thể là một kỹ năng hữu ích cần thành thạo khi làm việc với Cardano nói chung. CBOR có mặt ở khắp mọi nơi trong Cardano, kể cả trong các trình xác thực trên chuỗi. Ví dụ: Số liệu và người đổi quà được sổ cái cung cấp dưới dạng đối tượng CBOR cho người xác thực. Các giao dịch cũng được mã hóa dưới dạng CBOR khi được tuần tự hóa và truyền bá lên mạng.

Chẩn đoán CBOR chỉ đơn thuần là một cách thân thiện hơn với con người để hình dung một đối tượng nhị phân. Ví dụ: một danh sách các số nguyên được tuần tự hóa như `83010203` được biểu diễn `[1, 2, 3]` dưới dạng ký hiệu chẩn đoán.

Ngoài ra, hầu hết các công cụ và thư viện xử lý CBOR đều giúp việc chuyển đổi qua lại giữa mã hóa thô và ký hiệu chẩn đoán trở nên dễ dàng. Đây là trường hợp của cbor.mehoặc cbor-diag ví dụ.

Đây là một bảng tóm tắt nhỏ để giúp bạn giải mã chẩn đoán CBOR:

| Kiểu | Ví dụ |
| :--| :------------------------ | 
|Int| 1, -14,42| 
|List| [], [1, 2, 3],[_ 1, 2, 3] |
|ByteArray|h'FF00',h'666f6f'| 
|Map|{}, { 1: h'FF', 2: 14 },{_ 1: "AA" }|
|Tag|42(1), 10(h'ABCD'),1280([1, 2])|	
	
Mặc dù hầu hết đều khá minh bạch nhưng trường hợp sử dụng `Tag` có thể không gây ấn tượng với nhiều người một cách rõ ràng. Trên thực tế, `Tag` được sử dụng để mã hóa các loại tùy chỉnh trên chuỗi, bắt đầu từ thẻ `121` cho hàm tạo đầu tiên của loại dữ liệu, 122cho loại tiếp theo, v.v. Những gì được gắn thẻ tương ứng với các trường của hàm tạo, dưới dạng danh sách các đối tượng.

Hãy xem thêm một số ví dụ về chẩn đoán từ các giá trị Aiken thực.


```aiken
use aiken/cbor
 
 
// Một Int trở thành int CBOR
cbor.diagnostic(42) == @"42"
 
// Một ByteArray trở thành chuỗi byte CBOR
cbor.diagnostic("foo") == @"h'666F6F'"
 
// Danh sách trở thành mảng CBOR
cbor.diagnostic([1, 2, 3]) == @"[_ 1, 2, 3]"
 
// Tuple trở thành mảng CBOR
cbor.diagnostic((1, 2)) == @"[_ 1, 2]"
 
// Danh sách 2 bộ dữ liệu trở thành bản đồ CBOR
cbor.diagnostic([(1, #"ff")]) == @"{ 1: h'FF' }"
 
// 'Some' là hàm tạo đầu tiên của Tùy chọn → được gắn thẻ là 121
cbor.diagnostic(Some(42)) == @"121([_ 42])"
 
// 'Không' là hàm tạo thứ hai của Tùy chọn → được gắn thẻ là 122
cbor.diagnostic(None) == @"122([])"
```

Chẩn đoán chỉ được sử dụng trong quá trình phát triển hoặc thử nghiệm; kết hợp với `trace` chẳng hạn. Ngẫu nhiên, họ cũng tạo ra một cách thuận tiện để kiểm tra kỹ biểu diễn nhị phân của một số phiên bản dữ liệu hoặc người đổi quà của bạn thông qua các thử nghiệm. Hãy tưởng tượng loại sau:

```aiken
type MyDatum {
  foo: Int,
  bar: ByteArray
}
```

Cuối cùng, bạn sẽ cần xây dựng các giá trị tương thích để xây dựng giao dịch được liên kết. Aiken cung cấp bản thiết kế dưới dạng kết quả đầu ra của bản dựng để trợ giúp việc đó. Tuy nhiên, bạn cũng có thể kiểm soát trực tiếp một số giá trị đã chọn bằng cách sử dụng `cbor.diagnostic` và kiểm tra:

```aiken
use aiken/cbor
 
test my_datum_1() {
  let datum = MyDatum { foo: 42, bar: "Hello, World!" }
  cbor.diagnostic(datum) == @"121([42, h'48656c6c6f2c20576f726c6421'])"
}
```

Bạn có thể biến chẩn đoán này thành CBOR thô bằng cách sử dụng các công cụ như [cbor.me](https://cbor.me/?diag=121(%5B42,%20h%2748656c6c6f2c20576f726c6421%27%5D)).