# Helloworld SmartContract

Khi bạn đã nắm vững các kiến thức cơ bản về Aiken. Còn chờ gì nữa hãy bắt đầu với bài học bằng cách viết một hợp đồng thông minh đầu tiên Hello World đơn giản.

### Nội dung bài học

1. Khởi tạo và cài đặt dự án Aiken Hello world.
2. Viết trình xác nhận aiken cơ bản
3. Thêm dấu vết cho Hợp đồng thông minh
4. Chạy thử nghiệm aiken với một vài các bài kiểm tra.
5. Xây dựng ra `plutus.json` và địa chỉ của hợp đồng

### Điều kiện tiên quyết

1. Hiểu cơ bản các cách hoạt động của hợp đồng `hello world` đọc các tài liệu do nhà phát triển cardano
2. Cần có sự quen thuộc với mã thông báo gốc, ví, địa chỉ và cơ sở hạ tầng ngoài chuỗi (ví dụ: chỉ mục chuỗi).
3. `Deno` + `TypeScript` + `Lucid` + `Aiken`. Môi trường của bạn phải được cấu hình để hỗ trợ điều đó. Bạn có thể tìm thấy mã hỗ trợ hướng dẫn này trên kho lưu trữ chính của Aiken.
4. Khi gặp một cú pháp hoặc khái niệm xa lạ, đừng ngần ngại tham khảo chuyến tham quan ngôn ngữ để biết thêm chi tiết và ví dụ bổ sung.

### 1. Khởi tạo và cài đặt dự án Aiken Hello world.

Chúng tôi sẽ sử dụng Aiken để viết tập lệnh vì vậy hãy cài đặt dòng lệnh hoặc nếu không, hãy xem hướng dẫn cài đặt. Đầu tiên, hãy tạo một dự án Aiken mới:

```sh
aiken new independence/hello-world
cd hello-world
```

Lệnh này tạo ra một dự án Aiken. Đặc biệt, nó tạo ra một `lib` và `validators` các thư mục trong đó bạn có thể đặt các tập tin nguồn Aiken.

```sh
./hello-world
│
├── README.md
├── aiken.toml
├── lib
│   └── hello-world
└── validators
```

Chúng tôi sẽ sử dụng thư viện tiêu chuẩn để viết trình xác nhận của chúng tôi. May mắn thay, aiken `new` đã tự động thêm thư viện tiêu chuẩn vào cho chúng `aiken.toml` tôi. Nó sẽ trông đại khái như thế:

```aiken.toml
aiken.toml
name = "independence/hello-world"
version = "0.0.0"
license  = "Apache-2.0"
description = "Aiken contracts for project 'independence/hello-world'"

[repository]
user = 'independence'
project = 'hello-world'
platform = 'github'

[[dependencies]]
name = "independence/stdlib"
version = "main"
source = "github"
```

Bây giờ, khi chạy `aiken check`, chúng ta sẽ thấy các phần phụ thuộc đang được tải xuống. Điều đó sẽ không mất nhiều thời gian.

```sh
❯ aiken check
    Resolving versions
  Downloading packages
   Downloaded 1 package in 0.91s
    Compiling aiken-lang/stdlib main (/Users/aiken/Documents/aiken-lang/hello-world/build/packages/aiken-lang-stdlib)
    Compiling aiken-lang/hello-world 0.0.0 (/Users/aiken/Documents/aiken-lang/hello-world)
Summary
    0 error, 0 warning(s)
```

### 2. Viết trình xác nhận aiken cơ bản

Như vậy chúng ta đã cài đặt thành công môi trường cho dự án bây giờ hay bắt đầu viết từng dòng code aiken để hoàn thành một hợp đồng thông minh hoàn chỉnh như đã mong muốn.

```aiken
use aiken/hash.{Blake2b_224, Hash}
use aiken/list
use aiken/transaction.{ScriptContext}
use aiken/transaction/credential.{VerificationKey}

type Datum {
  owner: Hash<Blake2b_224, VerificationKey>,
}

type Redeemer {
  msg: ByteArray,
}

validator {
  fn hello_world(datum: Datum, redeemer: Redeemer, context: ScriptContext) -> Bool {
    let must_say_hello =
      redeemer.msg == "Hello, World!"

    let must_be_signed =
      list.has(context.transaction.extra_signatories, datum.owner)

    must_say_hello && must_be_signed
  }
}
```

Trình xác nhận đầu tiên của chúng tôi còn thô sơ nhưng có rất nhiều điều để nói về nó.

1. Hợp đồng thông minh tìm kiếm hàm băm khóa xác minh (owner) trong `datum` và thông báo (msg) trong `redeemer`. Hãy nhớ rằng, trong mô hình `eUTxO`, mốc thời gian được đặt khi khóa tiền trong hợp đồng và do đó có thể được coi là cấu hình. Tại đây, chúng tôi sẽ chỉ ra chủ sở hữu hợp đồng và yêu cầu chữ ký của họ để mở khóa tiền rất giống với việc nó đã hoạt động trên một địa chỉ không có chữ ký thông thường.

2. không có "Xin chào, Thế giới!" không có câu "Xin chào, Thế giới!" hợp đồng nhỏ của chúng tôi cũng yêu cầu chính thông báo này, dưới dạng mảng byte được mã hóa UTF-8, được chuyển làm `redeemer` (tức là khi chi tiêu từ hợp đồng).

Bây giờ là lúc xây dựng hợp đồng đầu tiên của chúng ta!

```sh
aiken build
```

Lệnh này tạo bản thiết kế CIP-0057 `Plutus` như `plutus.json` ở thư mục gốc của dự án của bạn. Kế hoạch chi tiết này mô tả hợp đồng trực tuyến của bạn và giao diện nhị phân của nó. Đặc biệt, nó chứa mã trên chuỗi được tạo sẽ được thực thi bởi sổ cái và hàm băm của (các) trình xác thực của bạn có thể được sử dụng để tạo địa chỉ. Với `aiken address` được sử dụng để tạo địa chỉ

Định dạng này không phụ thuộc vào khung và nhằm tạo điều kiện thuận lợi cho khả năng tương tác giữa các công cụ. Bản thiết kế được tích hợp hoàn toàn vào Aiken, có thể tự động tạo bản thiết kế dựa trên định nghĩa và nhận xét về loại của bạn.

Hãy cùng xem trình xác nhận hoạt động!

### 3. Thêm dấu vết cho Hợp đồng thông minh

Theo một cách nào đó, trình xác thực không gì khác hơn là các vị từ . Vị ngữ là một hàm trả về một `boolean`. Nó cho biết hoạt động có được phép hay không. Ở đây, chúng tôi đang viết một spend trình xác thực để kiểm soát những người được phép chi tiêu số tiền bị khóa bởi nó. Trình xác nhận việc khắc phục sự cố có thể nhanh chóng trở nên khó khăn vì kết quả thực sự duy nhất mà họ đưa ra là có hoặc không . Để giải quyết vấn đề đó, bạn có thể thêm dấu vết vào trình xác nhận. Dấu vết là các lệnh đặc biệt yêu cầu sổ cái hoặc bất kỳ ai đang thực thi `validator` thu thập thông báo khi gặp phải. Khi thất bại, nó sẽ đưa ra các thông báo gặp phải, từ đó đưa ra dấu vết về quá trình thực hiện chương trình.

```aiken
use aiken/hash.{Blake2b_224, Hash}
use aiken/list
use aiken/string
use aiken/transaction.{ScriptContext}
use aiken/transaction/credential.{VerificationKey}

type Datum {
  owner: Hash<Blake2b_224, VerificationKey>,
}

type Redeemer {
  msg: ByteArray,
}

validator {
  fn hello_world(datum: Datum, redeemer: Redeemer, context: ScriptContext) -> Bool {
    trace string.from_bytearray(redeemer.msg)

    let must_say_hello =
      redeemer.msg == "Hello, World!"

    let must_be_signed =
      list.has(context.transaction.extra_signatories, datum.owner)

    must_say_hello? && must_be_signed?
  }
}
```

Ở đây chúng tôi đã thực hiện hai thay đổi:

1. Chúng tôi đã thêm thông báo thủ công bằng cách sử dụng `trace` từ khóa. Tin nhắn là tin nhắn được chuyển đi với tư cách là người chuộc lỗi. Với điều này, chúng ta có thể kiểm tra xem giá trị mà trình xác thực nhìn thấy có phải là giá trị được mong đợi hay không.

2. Hãy chú ý cách chúng tôi thêm dấu chấm hỏi `?` vào cuối mỗi biểu thức `must_say_hello` và `must_be_signed`. Đây là cái mà chúng tôi gọi là `trace-if-false` toán tử và khá tiện lợi để gỡ lỗi mọi thứ. Toán tử này sẽ theo dõi biểu thức mà nó được gắn vào chỉ khi nó ước tính là `False`. Điều này khuyến khích một cách tiếp cận trong đó các trình xác thực được xây dựng dưới dạng kết hợp hoặc tách rời các yêu cầu. Khi thực thi không thành công, tất cả các yêu cầu không hợp lệ sẽ để lại dấu vết!

Để xem được những dấu vết đó, chúng ta cần viết một bài kiểm tra ngắn.

### 3. Chạy thử nghiệm aiken với một vài các bài kiểm tra

Aiken có hỗ trợ tích hợp các bài kiểm tra! Như bạn sẽ thấy ngay sau đây, các bài kiểm tra cũng có thể đóng vai trò là điểm chuẩn vì chúng hiển thị bộ nhớ chính xác và các đơn vị thực thi các bước cần thiết để chạy chúng. Họ cũng thu thập dấu vết cho chúng tôi. Hãy viết một bài kiểm tra đơn giản để chạy trình xác nhận của chúng tôi. Kiểm tra là các hàm không có đối số trả về boolean. Tuy nhiên, không giống như các hàm, chúng được biểu thị bằng từ khóa test. Chúng tôi sẽ cần một mốc thời gian, `redeemer` và `script context` cũng như một số nội dung nhập khác:

```aiken
use aiken/transaction.{OutputReference, ScriptContext, Spend, TransactionId}

test hello_world_example() {
  let datum = Datum { owner: #"00000000000000000000000000000000000000000000000000000000" }

  let redeemer = Redeemer { msg: "Aiken Rocks!" }

  let placeholder_utxo = OutputReference { transaction_id: TransactionId(""), output_index: 0 }

  let context = ScriptContext { purpose: Spend(placeholder_utxo),transaction: transaction.placeholder() }

hello_world(datum, redeemer, context)
}

```

Ở đây chúng ta có một bài kiểm tra. Một bài kiểm tra thất bại, nhưng chúng ta sẽ vượt qua, đừng lo lắng. Nhưng trước tiên, hãy thực hiện nó. Đơn giản chỉ cần chạy `aiken check`:

```sh
❯ aiken check

┍━ hello_world ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│ FAIL [mem: 22531, cpu: 8042312] hello_world_example
│ ↳ Aiken Rocks!
│ ↳ must_say_hello ? False
┕━━━━━━━━━━━━━━━━━━━━━━ 1 tests | 0 passed | 1 failed
```

Đầu ra này đã khá hữu ích. Chúng tôi có thể thấy những `trace` gì chúng tôi đã thêm vào trong trình xác nhận của mình sẽ trả lại `msg` phần đổi quà. Sau đó, chúng ta thấy `?` người điều hành đang chơi. Nó hiển thị dấu vết kể từ khi vị ngữ `must_say_hello` được trả về `False`. Lưu ý rằng vị từ khác `must_be_signed` không được hiển thị ở đây vì `Aiken` đảm bảo rằng các điều kiện được kiểm tra lần lượt. Vì lần đầu tiên đã thất bại nên toàn bộ biểu thức sẽ chuyển thành `False`. Hãy khắc phục điều này và đảm bảo rằng chúng tôi nói `Hello, World!` thay thế.

```aiken
test hello_world_example() {
  let datum = Datum { owner: #"00000000000000000000000000000000000000000000000000000000" }

  let redeemer = Redeemer { msg: "Hello, World!" }

  let placeholder_utxo = OutputReference { transaction_id: TransactionId(""), output_index: 0 }

let context = ScriptContext { purpose: Spend(placeholder_utxo), transaction: transaction.placeholder()}

hello_world(datum, redeemer, context)
}

```

Bây giờ, chúng ta có thể chạy `aiken check` lại:

```sh
❯ aiken check

┍━ hello_world ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│ FAIL [mem: 23332, cpu: 8306868] hello_world_example
│ ↳ Hello, World!
│ ↳ must_be_signed ? False
┕━━━━━━━━━━━━━━━━━━━━━━ 1 tests | 0 passed | 1 failed
```

Nó lại thất bại như mong đợi, nhưng chúng tôi đã tiến xa hơn. Lưu ý rằng đơn vị thực thi `mem` và `cpu` cao hơn một chút so với lần thực hiện đầu tiên. Bây giờ, chúng tôi đã chuyển sang đánh giá phần thứ hai của các yêu cầu đối với trình xác thực: `must_be_signed`. Để đáp ứng yêu cầu thứ hai này, chúng tôi sẽ cần thêm chủ sở hữu thử nghiệm của mình vào những người ký bổ sung của giao dịch. Như vậy:

```aiken
use aiken/transaction.{OutputReference, ScriptContext, Spend, Transaction, TransactionId}

test hello_world_example() {
  let datum = Datum { owner: #"00000000000000000000000000000000000000000000000000000000" }
  let redeemer = Redeemer { msg: "Hello, World!" }
  let placeholder_utxo = OutputReference { transaction_id: TransactionId(""), output_index: 0 }
  let context =ScriptContext {
    purpose: Spend(placeholder_utxo),
    transaction: transaction.placeholder()
                  |> fn(transaction) {
    Transaction {
      ..transaction,
      extra_signatories: [datum.owner]
    }
  }
}
hello_world(datum, redeemer, context)
}

```

Cái này cần phải dùng mẹo. Lưu ý rằng tại thời điểm này, chúng tôi không cung cấp bất kỳ chữ ký nào. Điều này là do chúng tôi không thực hiện bất kỳ xác nhận giai đoạn 1 nào của sổ cái. Tuy nhiên, trước khi thực hiện hợp đồng thông minh, sổ cái sẽ xác minh rằng nội dung giao dịch là hợp lệ. Đặc biệt, nó sẽ xác minh rằng bất kỳ chữ ký nào extra_signatoriescũng có chữ ký hợp lệ tương ứng trong giao dịch. Ở đây, chúng ta chỉ cần sử dụng khóa xác minh giữ chỗ của mình!

```sh
❯ aiken check

> ┍━ hello_world ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> │ PASS [mem: 37686, cpu: 13337425] hello_world_example
> │ ↳ Hello, World!
> ┕━━━━━━━━━━━━━━━━━━━━━━━ 1 tests | 1 passed | 0 failed
```

Và nó hoạt động! Chúng tôi để lại `Hello, World!` dấu vết của mình và không thất bại. Tất nhiên, bài kiểm tra cụ thể này không thực sự thú vị. Tuy nhiên, trong thực tế, trình xác nhận phức tạp và nhiều lớp hơn. Chúng tôi khuyến khích bạn chia trình xác thực thành các hàm nhỏ hơn để thực hiện từng việc một và kiểm tra các hàm đó một cách độc lập.

Dấu vết có thể thêm một số chi phí vào quá trình thực thi của trình xác thực. Đây là lý do tại sao Aiken mặc định xóa tất cả dấu vết khi bạn xây dựng trình xác thực. Để giữ chúng trong trình xác thực cuối cùng, hãy sử dụng `--keep-traces` khi xây dựng. Ngược lại, checklệnh này sẽ giữ nguyên dấu vết theo mặc định vì hầu hết thời gian, đây là điều bạn muốn. Nếu cần đánh giá quá trình thực thi không có dấu vết, bạn luôn có thể chuyển cờ `--no-traces` khi chạy thử nghiệm để xóa tất cả dấu vết.

Bây giờ bạn đã sẵn sàng chuyển sang các bước tiếp theo và xem xét việc thực hiện toàn bộ hoạt động này bằng một giao dịch thực sự!
