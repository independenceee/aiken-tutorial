# Vesting Smartcontract

Chúng ta đã thực hiện thành công với hợp đồng thông minh và nó khá dễ dàng. Vì vậy hãy đến với một bản hợp đồng thông minh khó hơn là `Vesting`
`Vesting` là một loại hợp đồng phổ biến cho phép khóa tiền trong một khoảng thời gian, chỉ để mở khóa chúng sau đó khi một thời gian nhất định đã trôi qua. Thông thường, hợp đồng trao quyền xác định người thụ hưởng có thể khác với chủ sở hữu ban đầu.

### Nội dung bài học

1. Khởi tạo mội dự án aiken `vesting`.
2. Viết trình xác thực `aiken` với các cấu trúc dữ liệu phức tạp hơn.
3. Viết bài kiểm tra bằng cách sử dụng khung kiểm tra tích hợp của Aiken
4. Quản lý thời gian trên chuỗi thông qua phạm vi hiệu lực của giao dịch

Khi gặp một vài các khái niệm xa lạ chúng ta hay đọc các tài liệu mở rộng của Aiken để tìm ra giải pháp khắc phục.

### Điều kiện tiên quyết

Theo cách tương tự như những gì chúng tôi đã làm cho Hello, World! hợp đồng, chúng tôi sẽ cần một số thông tin xác thực (và tiền) để sử dụng. Ở đây, chúng tôi xác định một khóa bổ sung cho người thụ hưởng. Một lần nữa, hãy sử dụng vòi `Cardano` để nhận kinh phí xét nghiệm. Tham khảo Hello World. Nhận tiền trong trường hợp bạn có bất kỳ nghi ngờ nào về thủ tục.

### 1. Khởi tạo mội dự án aiken `vesting`.

Chúng tôi sẽ sử dụng Aiken để viết tập lệnh vì vậy hãy cài đặt dòng lệnh hoặc nếu không, hãy xem hướng dẫn cài đặt. Đầu tiên, hãy tạo một dự án Aiken mới:

```sh
aiken new independence/vesting
cd vestinf
```

Lệnh này tạo ra một dự án Aiken. Đặc biệt, nó tạo ra một `lib` và `validators` các thư mục trong đó bạn có thể đặt các tập tin nguồn Aiken.

```sh
./vesting
│
├── README.md
├── aiken.toml
├── lib
│   └── vesting
└── validators
```

Chúng tôi sẽ sử dụng thư viện tiêu chuẩn để viết trình xác nhận của chúng tôi. May mắn thay, aiken `new` đã tự động thêm thư viện tiêu chuẩn vào cho chúng `aiken.toml` tôi. Nó sẽ trông đại khái như thế:

```aiken.toml
aiken.toml
name = "independence/vesting"
version = "0.0.0"
license  = "Apache-2.0"
description = "Aiken contracts for project 'independence/vesting'"

[repository]
user = 'independence'
project = 'vesting'
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
    Compiling aiken-lang/stdlib main (/Users/aiken/Documents/aiken-lang/vesting/build/packages/aiken-lang-stdlib)
    Compiling aiken-lang/vesting 0.0.0 (/Users/aiken/Documents/aiken-lang/vesting)
Summary
    0 error, 0 warning(s)
```

### 2. Viết trình xác thực `aiken` với các cấu trúc dữ liệu phức tạp hơn.

Hãy viết trình xác thực khóa thời gian của chúng ta dưới dạng `validators/contract.ak`, bắt đầu bằng định nghĩa về giao diện của nó (tức là hình dạng chuẩn của nó).

```aiken
use aiken/hash.{Blake2b_224, Hash}
use aiken/transaction/credential.{VerificationKey}

type Datum {
  lock_until: POSIXTime,
  owner: VerificationKeyHash,
  beneficiary: VerificationKeyHash,
}

type VerificationKeyHash =
  Hash<Blake2b_224, VerificationKey>

type POSIXTime =
  Int
```

Như chúng ta có thể thấy, dữ liệu của tập lệnh đóng vai trò là cấu hình và chứa các tham số khác nhau cho hoạt động trao quyền của chúng ta. Hãy nhớ rằng những yếu tố này được thiết lập khi khóa tiền trong hợp đồng; kết hợp với kịch bản, chúng xác định các điều kiện để có thể giải ngân tiền.

Từ đó, hãy xác định `spend` chính `validator`.

```aiken
use aiken/interval.{Finite}
use aiken/list
use aiken/transaction.{Transaction, ScriptContext, Spend, ValidityRange}

validator {
  fn vesting(datum: Datum, _redeemer: Void, ctx: ScriptContext) {
    when ctx.purpose is {
      Spend(_) ->
        or {
          must_be_signed_by(ctx.transaction, datum.owner),
          and {
            must_be_signed_by(ctx.transaction, datum.beneficiary),
            must_start_after(ctx.transaction.validity_range, datum.lock_until),
          },
        }
      _ -> False
    }
  }
}

fn must_be_signed_by(transaction: Transaction, vk: VerificationKeyHash) {
  list.has(transaction.extra_signatories, vk)
}

fn must_start_after(range: ValidityRange, lock_expiration_time: POSIXTime) {
  when range.lower_bound.bound_type is {
    Finite(tx_earliest_time) -> lock_expiration_time <= tx_earliest_time
    _ -> False
  }
}
```

Điểm mới lạ ở đây chủ yếu nằm ở việc kiểm tra một khoảng thời gian. Trên thực tế, các giao dịch có thể có khoảng thời gian hiệu lực xác định từ khi nào và cho đến khi giao dịch được coi là hợp lệ. Giới hạn hiệu lực được sổ cái kiểm tra trước khi thực thi tập lệnh và chỉ làm như vậy nếu giới hạn là hợp pháp.

Điều này nhằm mang lại cho các tập lệnh một khái niệm về thời gian, đồng thời bảo tồn tính tất định trong `script context`. Ví dụ: trong trường hợp này, với giới hạn dưới `A` của giao dịch, chúng ta có thể suy ra rằng thời gian hiện tại ít nhất `A` là .

Lưu ý rằng vì chúng tôi không kiểm soát giới hạn trên nên rất có thể giao dịch này được thực hiện sau 30 năm kể từ thời điểm trì hoãn trao quyền. Tuy nhiên, từ góc độ của kịch bản trao quyền, điều này hoàn toàn ổn.

Xem thêm cách chúng tôi chú thích người đổi quà `Void` để cho biết rằng nó không được sử dụng. Chúng tôi cũng có thể để nó không được chú thích nhưng nhìn chung tốt hơn là bạn nên báo hiệu ý định của mình một cách rõ ràng. `Void` nắm bắt điều đó khá tốt.

### 3. Viết bài kiểm tra bằng cách sử dụng khung kiểm tra tích hợp của Aiken

Được rồi, bây giờ trước khi triển khai hợp đồng của chúng ta một cách tự nhiên và có nguy cơ làm sụp đổ nền kinh tế với một số lỗi không lường trước được, hãy viết một vài bài kiểm tra. `Aiken` có hỗ trợ dựng sẵn cho các bài kiểm tra, rất giống các hàm không có đối số và phải trả về a `Bool`.

Các thử nghiệm có thể sử dụng bất kỳ hàm, hằng hoặc loại nào được xác định trong `mô-đun` của chúng tôi nhưng hãy cẩn thận, chúng không thể tham chiếu các thử nghiệm khác!

```aiken
use aiken/interval.{Finite, Interval, IntervalBound, PositiveInfinity}

test must_start_after_succeed_when_lower_bound_is_after() {
  must_start_after(interval.after(2), 1)
}

test must_start_after_succeed_when_lower_bound_is_equal() {
  must_start_after(interval.after(2), 2)
}

test must_start_after_fail_when_lower_bound_is_before() {
  !must_start_after(interval.after(2), 3)
}
```

Bạn có thể chạy thử nghiệm với aiken check. Aiken sẽ thu thập và chạy tất cả các bài kiểm tra có trong mô-đun của bạn, đồng thời cung cấp cho bạn một số thống kê về các đơn vị thực thi (CPU và bộ nhớ) mà bài kiểm tra yêu cầu.

```sh
 Downloading packages
   Downloaded 1 package in 1.46s
    Compiling aiken-lang/stdlib 1.7.0 (D:\Workspace\aiken-tutorial\project\02_vesting\smart_contract\build\packages\aiken-lang-stdlib)
    Compiling independence/smart_contract 0.0.0 (D:\Workspace\aiken-tutorial\project\02_vesting\smart_contract)
      Testing ...

    ┍━ contract ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    │ PASS [mem: 18648, cpu: 6508525] must_start_after_succeed_when_lower_bound_is_after
    │ PASS [mem: 18648, cpu: 6508525] must_start_after_succeed_when_lower_bound_is_equal
    │ PASS [mem: 19249, cpu: 6727081] must_start_after_fail_when_lower_bound_is_before
    ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 3 tests | 3 passed | 0 failed

aiken::check::unused::type

  ⚠ While trying to make sense of your code...
  ╰─▶ I discovered an unused type: 'IntervalBound'.

   ╭─[D:\Workspace\aiken-tutorial\project\02_vesting\smart_contract\validators\contract.ak:1:1]
 1 │ use aiken/hash.{Blake2b_224, Hash}
 2 │ use aiken/interval.{Finite, Interval, IntervalBound, PositiveInfinity}
   ·                                       ─────────────
 3 │ use aiken/list
   ╰────

aiken::check::unused::constructor

  ⚠ While trying to make sense of your code...
  ╰─▶ I discovered an unused constructor: 'PositiveInfinity'.

   ╭─[D:\Workspace\aiken-tutorial\project\02_vesting\smart_contract\validators\contract.ak:1:1]
 1 │ use aiken/hash.{Blake2b_224, Hash}
 2 │ use aiken/interval.{Finite, Interval, IntervalBound, PositiveInfinity}
   ·                                                      ────────────────
 3 │ use aiken/list
   ╰────
  help: No big deal, but you might want to remove it to get rid of that warning.

aiken::check::unused::type

  ⚠ While trying to make sense of your code...
  ╰─▶ I discovered an unused type: 'Interval'.

   ╭─[D:\Workspace\aiken-tutorial\project\02_vesting\smart_contract\validators\contract.ak:1:1]
 1 │ use aiken/hash.{Blake2b_224, Hash}
 2 │ use aiken/interval.{Finite, Interval, IntervalBound, PositiveInfinity}
   ·                             ────────
 3 │ use aiken/list
   ╰────


Summary
    0 errors, 3 warnings

```

### 5. Xây dựng ra `plutus.json` và địa chỉ của hợp đồng

Để xây dựng ra hợp đồng thông minh cần sử dụng `aiken build` khi đó dự án sẽ thực hiện sinh ra file plutus.json. Đây là nguồn mã quan trong được biên dịch giúp tương tác với mạng lưới onchain

```sh
aiken build
    Compiling aiken-lang/stdlib 1.7.0 (D:\Workspace\aiken-tutorial\project\02_vesting\smart_contract\build\packages\aiken-lang-stdlib)
    Compiling independence/smart_contract 0.0.0 (D:\Workspace\aiken-tutorial\project\02_vesting\smart_contract)
   Generating project's blueprint (D:\Workspace\aiken-tutorial\project\02_vesting\smart_contract\plutus.json)

Summary
    0 errors, 0 warnings
```

Sau đó muốn xem được địa chỉ của hợp đông thông minh cần sử dụng `aiken address`

```sh
 aiken address
addr_test1wq4608wn0fcnxg6wu3mcvv00qz2yfgq3fscy42a4dwwexrcqw4csv

Summary
    0 errors, 0 warnings
```

Điều này tạo ra bản thiết kế `CIP-0057` `Plutus` như `plutus.json` ở thư mục gốc của dự án của bạn. Kế hoạch chi tiết này mô tả hợp đồng trực tuyến của bạn và giao diện nhị phân của nó. Đặc biệt, nó chứa mã trên chuỗi được tạo sẽ được thực thi bởi sổ cái và hàm băm của (các) trình xác thực của bạn có thể được sử dụng để tạo địa chỉ.

Hy vọng điều này mang lại cho bạn ý tưởng về những gì bạn có thể xây dựng trên Cardano. Ví dụ này cũng sẽ minh họa cách hầu hết mã trong dapp của bạn thậm chí không phải là trình xác thực. Khi thiết kế các ứng dụng tận dụng Cardano, tốt hơn hết bạn nên suy nghĩ về loại giao dịch nào bạn sẽ cần xây dựng và sau đó viết trình xác thực để thực thi chúng. Một tài liệu tham khảo đầy đủ về ví dụ này có thể được tìm thấy ở đây.
