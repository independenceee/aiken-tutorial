# Troubleshooting

Lập trình trên On-Chain có thể có nhiều điểm tương đồng với lập trình nhúng trong thực tế vì cả hai đều hoạt động trong một môi trường thực thi hạn chế và cần phải tối ưu hóa để hoạt động hiệu quả. Môi trường thực thi trên chuỗi blockchain thường có các hạn chế về tài nguyên, bao gồm bộ nhớ và thời gian thực thi, do đó các chương trình trên chuỗi cần được tối ưu hóa để tiết kiệm tài nguyên và đảm bảo hoạt động ổn định.

Aiken cố gắng cung cấp cho các nhà phát triển các công cụ bổ sung và khả năng sửa lỗi để hỗ trợ quá trình phát triển và triển khai các ứng dụng trên chuỗi. Các tính năng và công cụ này có thể bao gồm:

1. Các công cụ phát triển tích hợp để phân tích mã, gỡ lỗi và kiểm tra mã trước khi triển khai lên chuỗi.

2. Các thư viện chuẩn để thực hiện các chức năng phổ biến và giảm bớt công việc lập trình lặp đi lặp lại.

3. Các hướng dẫn và tài liệu phong phú để hỗ trợ các nhà phát triển hiểu rõ hơn về cách phát triển ứng dụng trên chuỗi và xử lý các vấn đề phát sinh.

Như vậy, `Aiken` cố gắng cung cấp một môi trường phát triển tổng thể và tối ưu để giúp các nhà phát triển xây dựng và triển khai các ứng dụng `blockchain` một cách hiệu quả và ổn định trên chuỗi.

### Traces

Trong Aiken, dấu vết (traces) được coi như một loại thông điệp tường trình, là các thông tin ghi lại vào thời điểm cụ thể trong quá trình thực thi của chương trình. Bạn có thể thêm dấu vết vào biểu thức cấp cao nhất trong Aiken bằng từ khóa trace. Dưới đây là một ví dụ minh họa về cách sử dụng dấu vết trong Aiken. Trace được ghi lại máy ảo tại chính thời điểm đó:

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

Trong ví dụ này, khi hàm `is_even` hoặc `is_odd` được gọi, một dấu vết được ghi lại với thông điệp tương ứng "is_even" hoặc "is_odd". Để thu thập dấu vết, bạn có thể chạy thử nghiệm thông qua `aiken check` hoặc mô phỏng giao dịch bằng aiken tx simulate. Trong cả hai trường hợp, các dấu vết thu được trong quá trình thực thi sẽ được hiển thị trên màn hình.

```sh
aiken check
    Compiling aiken-lang/stdlib 1.7.0 (D:\Workspace\aiken-tutorial\project\00_aiken_blog\build\packages\aiken-lang-stdlib)
    Compiling independence/00_aiken_blog 0.0.0 (D:\Workspace\aiken-tutorial\project\00_aiken_blog)
      Testing ...

    ┍━ aiken_blog ━━━━━━━━━━━━━━━━━━━━━━━
    │ PASS [mem: 3235, cpu: 1668391] init
    │ ↳ is_event
    ┕━━━━━━ 1 tests | 1 passed | 0 failed
```

Ban đầu có thể hơi khó nắm bắt các dấu vết vì `Plutus` và do đó là `Aiken` là một công cụ thực thi chức năng thuần túy. Do đó không có câu lệnh nào trong một chương trình được biên dịch. Chỉ có biểu thức . Dấu vết sẽ được thu thập nếu nó được máy ảo đánh giá. Có hai cách phổ biến để ghi lại dấu vết trong Aiken: khi chạy thử nghiệm qua `aiken check` hoặc khi mô phỏng giao dịch bằng `aiken tx simulate`. Trong cả hai trường hợp, dấu vết thu được trong quá trình đánh giá sẽ được in trên màn hình.

Ví dụ: trong chương trình sau:

```aiken
let n = 10
is_even(n) || is_odd(n)
```

Chỉ dấu vết của is_even sẽ được ghi lại, vì is_odd không được đánh giá (không cần thiết vì phía bên trái của toán tử \|| đã trả về True).

##### Lưu ý rằng dấu vết là:

Lưu ý rằng dấu vết trong Aiken có những đặc điểm sau:

-   Mặc định sẽ bị xóa khi bạn xây dựng dự án bằng lệnh aiken build. Bạn có thể giữ chúng bằng cách sử dụng tùy chọn `--keep-traces`.
-   Mặc định sẽ được giữ lại khi bạn kiểm tra dự án bằng lệnh aiken check. Bạn có thể loại bỏ chúng bằng cách sử dụng tùy chọn `--no-traces`.

Lý do cho điều này là việc theo dõi dấu vết làm tăng kích thước của mã được biên dịch và có thể tăng thêm chi phí tính toán không mong muốn đối với các trình xác thực sẵn sàng cho sản xuất cuối cùng. Tuy nhiên, chúng rất hữu ích cho quá trình phát triển và thử nghiệm. Do đó, các tùy chọn dòng lệnh này hướng đến những trường hợp sử dụng đó. Xin lưu ý rằng việc bật hoặc tắt dấu vết không ảnh hưởng đến ý nghĩa chương trình của bạn, nhưng nó sẽ thay đổi một cách hiệu quả giá trị băm và do đó các địa chỉ liên quan.

### ? operator

Các chương trình trên chuỗi trong Aiken thường được biểu diễn dưới dạng các biểu thức boolean, có thể trả về True hoặc False. Trong thực tế, chúng là các biểu thức logic được xử lý để đưa ra quyết định.

Tuy nhiên, điều quan trọng cần lưu ý là các biểu thức boolean trong các chương trình trên chuỗi thường không có thông tin về ngữ cảnh ban đầu. Điều này có nghĩa là khi đánh giá các biểu thức boolean phức tạp, bạn có thể mất đi sự hiểu biết về ngữ cảnh mà các biểu thức đó được sử dụng.

Ví dụ, nếu bạn có một biểu thức boolean phức tạp như sau:

```aiken
(is_even(n) && is_prime(n)) || is_odd(n)
```

Bạn không thể biết chính xác ngữ cảnh nào đã gây ra việc biểu thức này trở thành `True` hoặc `False` mà không có thông tin bổ sung về giá trị cụ thể của `n` và các hàm `is_even`, `is_prime`, và `is_odd`.

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

Việc kiểm tra về toán tử ? sẽ được hiển thị như sau:

```sh
 aiken check
    Compiling aiken-lang/stdlib 1.7.0 (D:\Workspace\aiken-tutorial\project\00_aiken_blog\build\packages\aiken-lang-stdlib)
    Compiling independence/00_aiken_blog 0.0.0 (D:\Workspace\aiken-tutorial\project\00_aiken_blog)
      Testing ...

    ┍━ aiken_blog ━━━━━━━━━━━━━━━━━━━━━━━
    │ FAIL [mem: 4035, cpu: 1351110] init
    │ ↳ must_be_before ? False
    ┕━━━━━━ 1 tests | 0 passed | 1 failed

D:\Workspace\aiken-tutorial\project\00_aiken_blog\validators\aiken_blog.ak

  × init failed
  help: ┍━ left ━━━━━━━━━━┑
        │ (con bool True) │
        ┕━━━━━━━━━━━━━━━━━┙

        and

        ┍━ right ━━━━━━━━━━┑
        │ (con bool False) │
        ┕━━━━━━━━━━━━━━━━━━┙

        should both be true.


Summary
    1 error, 0 warnings
```

### CBOR diagnostic

Điều này thật tuyệt vời nhưng đôi khi, bạn cần nhiều hơn thế. Đôi khi, bạn cần kiểm tra giá trị của một số đối tượng cụ thể khi chạy . Điều này khó hơn tưởng tượng vì một chương trình Aiken được biên soạn đã xóa mọi bối cảnh và mọi khái niệm về loại. Ngay cả các hàm và tên biến cũng được thay thế bằng các chỉ mục nhỏ gọn khiến việc kiểm tra các chương trình và giá trị trong thời gian chạy tương đối khó khăn và phức tạp. Ví dụ: đây là giao diện của một hàm được biên dịch trong UPLC:

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

Note: nó khá là khó đọc. Thư viện chuẩn của Aiken cung cấp một phương pháp thuận tiện để kiểm tra bất kỳ giá trị nào trong thời gian chạy và thu được `String` biểu diễn của chúng. Cú pháp được sử dụng cho biểu diễn này được gọi là chẩn đoán CBOR. Hãy coi nó như một cú pháp cấp cao giống với JSON và có thể biểu thị dữ liệu nhị phân.

```aiken
aiken/cbor
pub fn diagnostic(data: Data) -> String
```

Tại sao bạn có thể hỏi tại sao nên sử dụng chẩn đoán CBOR?

Vâng, bởi vì đó là thứ nắm bắt một cách trung thực nhất sự thể hiện của các đối tượng có trong thời gian chạy và trong giao diện của trình xác thực trên chuỗi. Làm quen với chẩn đoán CBOR đòi hỏi phải thực hành một chút nhưng có thể là một kỹ năng hữu ích cần thành thạo khi làm việc với Cardano nói chung. CBOR có mặt ở khắp mọi nơi trong Cardano, kể cả trong các trình xác thực trên chuỗi. Ví dụ: Số liệu và người đổi quà được sổ cái cung cấp dưới dạng đối tượng CBOR cho người xác thực. Các giao dịch cũng được mã hóa dưới dạng CBOR khi được tuần tự hóa và truyền bá lên mạng.

Chẩn đoán CBOR chỉ đơn thuần là một cách thân thiện hơn với con người để hình dung một đối tượng nhị phân. Ví dụ: một danh sách các số nguyên được tuần tự hóa như `83010203` được biểu diễn `[1, 2, 3]` dưới dạng ký hiệu chẩn đoán.

Ngoài ra, hầu hết các công cụ và thư viện xử lý CBOR đều giúp việc chuyển đổi qua lại giữa mã hóa thô và ký hiệu chẩn đoán trở nên dễ dàng. Đây là trường hợp của cbor.mehoặc cbor-diag ví dụ.

Đây là một bảng tóm tắt nhỏ để giúp bạn giải mã chẩn đoán CBOR:

| Kiểu      | Ví dụ                                 |
| :-------- | :------------------------------------ |
| Int       | 1, -14,42                             |
| List      | [], [1, 2, 3],[_ 1, 2, 3]             |
| ByteArray | h'FF00',h'666f6f'                     |
| Map       | {}, { 1: h'FF', 2: 14 },{\_ 1: "AA" } |
| Tag       | 42(1), 10(h'ABCD'),1280([1, 2])       |

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

Bạn có thể biến chẩn đoán này thành CBOR thô bằng cách sử dụng các công cụ như [cbor.me](<https://cbor.me/?diag=121(%5B42,%20h%2748656c6c6f2c20576f726c6421%27%5D)>).
