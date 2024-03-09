# Modules

Trong Aiken, các chương trình được tạo thành từ các nhóm chức năng và loại được gọi là modules. Mỗi module có không gian tên riêng và có thể xuất các loại cũng như giá trị để các module khác trong chương trình sử dụng.

```aiken
fn f1(){
  "Aiken"
}

fn f2(){
  "C2VN"
}

pub fn f1_f2_list(){
  [f1(), f2()]
}
```

Ở đây, chúng ta có một module có tên straw_hats/sunny, tên được xác định bởi tên tệp lib/straw_hats/sunny.ak. Thông thường, tất cả các mô-đun cho một dự án sẽ nằm trong một thư mục có tên của dự án, chẳng hạn như straw_hats trong ví dụ này.

Từ khóa pub khiến cho loại này có thể sử dụng được từ các module khác.

Đối với các hàm count_down và blast_off, chúng tôi đã bỏ qua từ khóa pub, vì vậy các hàm này là các hàm riêng của module. Chúng chỉ có thể được gọi bởi các chức năng khác trong cùng một module.

Tất cả các hàm, biểu thức loại và hằng số đều có thể được xuất từ một module bằng từ khóa pub.

# Import (use)

Để sử dụng các hàm hoặc loại từ một module khác, chúng ta cần nhập chúng bằng từ khóa use.

```aiken
// Bên trong `module` src/straw_hats/laugh_tale.ak
use straw_hats/sunny

pub fn find_the_one_piece() {
  sunny.set_sail()
}
```

Định nghĩa use straw_hats/sunny tạo ra một biến mới có tên sunny và giá trị của module sunny.

Trong hàm find_the_one_piece, chúng ta gọi hàm set_sail công khai của module đã nhập bằng cách sử dụng toán tử `.`. Nếu chúng ta cố gắng gọi count_down nó sẽ dẫn đến lỗi thời gian biên dịch vì hàm này là riêng tư đối với module sunny.

### Named import

Bạn đã hiểu đúng! Khi có nhiều module có cùng tên mặc định được nhập vào cùng một chương trình, việc sử dụng từ khóa as để đặt tên tùy chỉnh cho mỗi module là rất hữu ích để phân biệt chúng.

```aiken
use unix/dog
use animal/dog as kitty
```

`unix/dog` và `animal/dog` có thể là hai module khác nhau trong cùng một chương trình. Việc đặt tên tùy chỉnh kitty cho `animal/dog` giúp tránh sự nhầm lẫn và làm cho mã của bạn dễ đọc hơn. Bây giờ bạn có thể sử dụng kitty để truy cập các phần tử trong module `animal/dog`.

### Unqualified import

Các giá trị và loại cũng có thể được nhập theo cách không đủ tiêu chuẩn.

```aiken
use animal/dog.{Dog, stroke}

pub fn foo() {
  let puppy = Dog { name: "Zeus" }
  stroke(puppy)
}
```

Điều này có thể hữu ích cho các giá trị được sử dụng thường xuyên trong một mô-đun, nhưng thông thường các thao tác nhập đủ tiêu chuẩn sẽ được ưu tiên hơn vì nó làm cho giá trị được xác định rõ ràng hơn.

Bạn cũng có thể kết hợp các mục nhập không đủ tiêu chuẩn với các tên tùy chỉnh như sau:

```aiken
use animal/dog.{Dog, stroke} as kitty
```

### Opaque types

Đôi khi, có thể hữu ích khi tạo một loại và đặt hàm tạo cũng như các trường ở chế độ riêng tư để người dùng thuộc loại này chỉ có thể sử dụng loại đó thông qua các hàm được xuất công khai.

Ví dụ: chúng ta có thể tạo một Counter kiểu chứa int có thể tăng lên. Chúng tôi không muốn người dùng thay đổi `Int` giá trị ngoài việc tăng giá trị đó, vì vậy chúng tôi có thể làm cho loại này mờ đi để ngăn họ có thể thực hiện việc này.

```aiken
// Loại được xác định bằng từ khóa opaque
pub opaque type Counter {
  Counter(value: Int)
}

pub fn new() {
  Counter(0)
}

pub fn increment(counter: Counter) {
  Counter(counter.value + 1)
}
```

Bởi vì Counter loại đã được đánh dấu là `opaque` mã trong các mô-đun khác không thể xây dựng hoặc khớp mẫu trên các giá trị bộ đếm hoặc truy cập vào trường `value`. Thay vào đó, các mô-đun khác phải thao tác loại mờ bằng cách sử dụng các hàm được xuất từ ​​mô-đun, trong trường hợp này `new` và `increment`.

### The prelude module

Có hai mô-đun được tích hợp vào ngôn ngữ, mô-đun đầu tiên là `aiken` mô-đun khúc dạo đầu. Theo mặc định, loại và giá trị của nó được nhập tự động vào mọi mô-đun bạn viết, nhưng bạn vẫn có thể chọn nhập nó theo cách thông thường. Điều này có thể hữu ích nếu bạn đã tạo một loại hoặc giá trị có cùng tên với một mục từ phần mở đầu.

```ak
use aiken

/// Định nghĩa này ghi đè cục bộ loại `Option`
/// và hàm tạo `Some`.
pub type Option {
  Some
}

/// The original `Option` and `Some` can still be used
pub fn go() -> aiken.Option<Int> {
  aiken.Some(1)
}
```

Nội dung của module Prelude được ghi lại trong aiken-lang/prelude

### The builtin module

Mô-đun thứ hai đi kèm với ngôn ngữ này dùng để hiển thị các hàm dựng sẵn hữu ích từ lõi Plutus. Hầu hết các hàm nền tảng cơ bản đều có sẵn ở đây bằng tên "snake_case". Phần lớn cú pháp của Aiken cuối cùng được biên dịch thành sự kết hợp của một số bultin nhất định nhưng nhiều cú pháp không được "trình bày" thông qua cú pháp và cần được sử dụng trực tiếp. Thư viện tiêu chuẩn bao bọc những thứ này trong một giao diện thân thiện với Aiken hơn nên có thể bạn sẽ không bao giờ cần sử dụng chúng trực tiếp trừ khi bạn tạo thư viện tiêu chuẩn của riêng mình.

```aiken
use aiken/builtin

fn eq(a, b) {
    builtin.equals_integer(a, b)
}
// is implicitly used when doing:
a == b
```

### Documentation

Bạn có thể thêm tài liệu hướng tới người dùng ở đầu mô-đun với nhận xét về tài liệu mô-đun `////` (dấu gạch chéo bốn lần!) trên mỗi dòng. Markdown được hỗ trợ và khối văn bản này sẽ được bao gồm trong mục nhập của mô-đun trong tài liệu HTML được tạo.
