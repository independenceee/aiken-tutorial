# Gift card - Smart contract

Bạn có thể tìm thấy mã hỗ trợ hướng dẫn này trên kho lưu trữ chính của `Aiken`. Được đề cập trong hướng dẫn này viết các trình xác nhận và `Aiken` phụ thuộc lẫn nhau `.mint spend`. Trình xác nhận tham số hóa. Chúng tôi sẽ một lần nữa sử dụng `Blockfrost` làm nhà cung cấp. Vì vậy, hãy chuẩn bị sẵn khóa `API Block Frost` của bạn. Khi gặp một cú pháp hoặc khái niệm xa lạ, đừng ngần ngại tham khảo chuyến tham quan ngôn ngữ để biết thêm chi tiết và ví dụ bổ sung.

### Nội dung bài học

1. Khởi tạo và cài đặt dự án Aiken `Giftcard`
2. Viết trình xác nhận aiken cơ bản
3. Xây dựng ra `plutus.json` và địa chỉ của hợp đồng

### Điều kiện tiên quyết

1. Hiểu cơ bản các cách hoạt động của hợp đồng đọc các tài liệu do nhà phát triển cardano
2. Cần có sự quen thuộc với mã thông báo gốc, ví, địa chỉ và cơ sở hạ tầng ngoài chuỗi (ví dụ: chỉ mục chuỗi).
3. `Deno` + `TypeScript` + `Lucid` + `Aiken`. Môi trường của bạn phải được cấu hình để hỗ trợ điều đó. Bạn có thể tìm thấy mã hỗ trợ hướng dẫn này trên kho lưu trữ chính của Aiken.
4. Khi gặp một cú pháp hoặc khái niệm xa lạ, đừng ngần ngại tham khảo chuyến tham quan ngôn ngữ để biết thêm chi tiết và ví dụ bổ sung.

### 1. Khởi tạo và cài đặt dự án Aiken `Giftcard`

Trong hướng dẫn này, thẻ quà tặng sẽ liên quan đến việc khóa một số tài sản trong hợp đồng thông minh. Trong khi một số tài sản đang bị khóa, chúng tôi sẽ đúc NFT trong cùng một giao dịch. NFT này có thể được gửi đi bất cứ đâu và chủ sở hữu NFT có thể đốt nó để mở khóa những tài sản đã bị khóa trước đó. Chúng ta có thể coi NFT như một thẻ quà tặng. Aiken là phần dễ dàng. Hãy tiếp tục và tạo một `Aiken` dự án mới:

```sh
aiken new independence/gift-card
cd gift-card
```

Lệnh này tạo ra một dự án Aiken. Đặc biệt, nó tạo ra một `lib` và `validators` các thư mục trong đó bạn có thể đặt các tập tin nguồn Aiken.

```sh
./gift-card
│
├── README.md
├── aiken.toml
├── lib
│   └── gift-card
└── validators
```

Chúng tôi sẽ sử dụng thư viện tiêu chuẩn để viết trình xác nhận của chúng tôi. May mắn thay, aiken `new` đã tự động thêm thư viện tiêu chuẩn vào cho chúng `aiken.toml` tôi. Nó sẽ trông đại khái như thế:

```aiken.toml
aiken.toml
name = "independence/gift-card"
version = "0.0.0"
license  = "Apache-2.0"
description = "Aiken contracts for project 'independence/gift-card'"
[repository]
user = 'independence'
project = 'gift-card'
platform = 'github'

[[dependencies]]
name = "independence/stdlib"
version = "main"
source = "github"
```

`independence` ở trên có thể được thay thế bằng bất kỳ tên nào. Chúng tôi khuyên bạn nên sử dụng tên của tổ chức Github hoặc tên người dùng của riêng bạn. Chúng ta đã đề cập đến những gì `aiken new` tạo ra trong hướng dẫn trước, vì vậy hãy chuyển ngay sang một số mã. Hãy tiếp tục và xóa `lib/` thư mục đó, chúng tôi sẽ không cần thư mục đó cho hướng dẫn này.

```sh
rm -rf lib
```

Bây giờ, khi chạy `aiken check`, chúng ta sẽ thấy các phần phụ thuộc đang được tải xuống. Điều đó sẽ không mất nhiều thời gian.

```sh
❯ aiken check
    Resolving versions
  Downloading packages
   Downloaded 1 package in 0.91s
    Compiling aiken-lang/stdlib main (/Users/aiken/Documents/aiken-lang/gift-card/build/packages/aiken-lang-stdlib)
    Compiling aiken-lang/gift-card 0.0.0 (/Users/aiken/Documents/aiken-lang/gift-card)
Summary
    0 error, 0 warning(s)
```

### 2. Viết trình xác nhận aiken cơ bản

Bây giờ hãy tạo một tệp mới trong `validators/`thư mục có tên contract.ak.

```sh
touch validators/contract.ak
```

`contract.ak` có thể được đặt tên bất cứ điều gì bất kỳ tệp nào trong đó `validators/` đều được phép xuất bao nhiêu trình xác thực tùy thích. Bây giờ, hãy mở thư mục dự án trong trình soạn thảo yêu thích của chúng tôi và xác định hai hàm xác thực trống.

```aiken
use aiken/transaction.{ScriptContext}

validator {
  fn gift_card(rdmr, ctx: ScriptContext) -> Bool {
    todo @"mint and burn"
  }
}

validator {
  fn redeem(_d: Data, _r: Data, ctx: ScriptContext) -> Bool {
    todo @"redeem"
  }
}
```

Trình `gift_card` xác thực sẽ được sử dụng để đúc và đốt thẻ quà tặng NFT. Trình `redeem` xác nhận sẽ được sử dụng `gift_card` để đổi thẻ quà tặng và mở khóa tài sản. Vòng đời của thẻ quà tặng này sẽ bao gồm hai giao dịch. Giao dịch đầu tiên sẽ đúc thẻ quà tặng dưới dạng NFT và nó sẽ gửi một số tài sản đến `redeem` địa chỉ của người xác thực. Thẻ quà tặng có thể được gửi đến bất cứ đâu trong giao dịch đầu tiên. Giao dịch thứ hai sẽ ghi NFT và gửi tài sản bị khóa đến địa chỉ đã giữ NFT bị đốt.

#### Đúc thẻ quà tặng

Vì ví dụ này dành cho hợp đồng đúc tiền một lần, hãy thêm một số tham số vào trình xác thực mà chúng tôi có thể sử dụng để đảm bảo tính duy nhất.

```aiken
use aiken/transaction.{OutputReference, ScriptContext}
validator(token_name: ByteArray, utxo_ref: OutputReference) {
  fn gift_card(rdmr, ctx: ScriptContext) -> Bool {
    todo @"mint and burn"
  }
}
```

Chúng tôi sẽ sử dụng `utxo_ref` tham số để đảm bảo trình xác thực này sẽ chỉ cho phép đúc tiền một lần. Vì sổ cái Cardano đảm bảo rằng utxos chỉ có thể được sử dụng một lần nên chúng tôi có thể tận dụng chúng để kế thừa những đảm bảo tương tự trong trình xác thực của mình.

Tiếp theo hãy xác định loại cho `rdmr`. Chúng tôi có hai hành động mà trình xác nhận này sẽ thực hiện. Trình xác thực này có thể được sử dụng để đúc và sau đó ghi NFT.

```aiken
use aiken/transaction.{OutputReference, ScriptContext}

type Action {
  Mint
  Burn
}

validator(token_name: ByteArray, utxo_ref: OutputReference) {
  fn gift_card(rdmr: Action, ctx: ScriptContext) -> Bool {
    when rdmr is {
      Mint ->
        todo @"mint"
      Burn ->
        todo @"burn"
    }
  }
}
```

Tiếp theo, chúng ta sẽ thực hiện những việc này theo thứ tự để có mọi thứ cần thiết để thực hiện bước kiểm tra cuối cùng.

-   Khớp mẫu trên ngữ cảnh tập lệnh để nhận `transaction` và `purpose`
-   `expect` sẽ `purpose` là `tx.Mint(policy_id)`
-   Khớp mẫu để `transaction` lấy nó `inputs` và `mint` giữ tài sản được đúc
-   `expect` tài sản được đúc ( mint) chỉ có một mặt hàng có `asset_name` và `amount`

```aiken
use aiken/dict
use aiken/transaction.{OutputReference, ScriptContext, Transaction} as tx
use aiken/transaction/value

type Action {
  Mint
  Burn
}

validator(token_name: ByteArray, utxo_ref: OutputReference) {
  fn gift_card(rdmr: Action, ctx: ScriptContext) -> Bool {
    let ScriptContext { transaction, purpose } = ctx

    expect tx.Mint(policy_id) = purpose

    let Transaction { inputs, mint, .. } = transaction

    expect [(asset_name, amount)] =
      mint
        |> value.from_minted_value
        |> value.tokens(policy_id)
        |> dict.to_list()

    when rdmr is {
      Mint ->
        todo @"mint"
      Burn ->
        todo @"burn"
    }
  }
}
```

Tại thời điểm này, chúng tôi có tất cả dữ liệu cần thiết để thực hiện kiểm tra cuối cùng cho hành `Mint` động. Để trình xác thực này thành công, chúng ta cần đảm bảo rằng `utxo_reft` ham số bằng một trong các tham số `inputs` trong giao dịch. Ngoài ra, chúng tôi cần đảm bảo `amount` bằng 1 vì chúng tôi đang đúc NFT. Để giải trí, chúng ta sẽ kiểm tra xem nó `asset_name` có bằng `token_name` với các tham số hay không.

```aiken
use aiken/dict
use aiken/list
use aiken/transaction.{OutputReference, ScriptContext, Transaction} as tx
use aiken/transaction/value

type Action {
  Mint
  Burn
}

validator(token_name: ByteArray, utxo_ref: OutputReference) {
  fn gift_card(rdmr: Action, ctx: ScriptContext) -> Bool {
    let ScriptContext { transaction, purpose } = ctx

    expect tx.Mint(policy_id) = purpose

    let Transaction { inputs, mint, .. } = transaction

    expect [(asset_name, amount)] =
      mint
        |> value.from_minted_value
        |> value.tokens(policy_id)
        |> dict.to_list()

    when rdmr is {
      Mint -> {
        expect True =
          list.any(inputs, fn(input) { input.output_reference == utxo_ref })
        amount == 1 && asset_name == token_name
      }
      Burn ->
        todo @"burn"
    }
  }
}
```

Chúng tôi có mọi thứ chúng tôi cần trong trình xác thực này để đúc Thẻ quà tặng. Tuy nhiên, trước khi bắt đầu thực hiện giao dịch, chúng tôi cần phải hoàn thành `Burn` hành động và hành động đó cũng sẽ được ghép nối với `redeem` trình xác thực.

#### Đổi thẻ quà tặng

Để đổi thẻ quà tặng, chúng tôi cần một giao dịch sử dụng hai trình xác nhận. Chúng tôi sẽ sử dụng `gift_card` trình xác nhận với `Burn` hành động ghi NFT. Chúng tôi cũng sẽ sử dụng `redeem` trình xác thực để mở khóa nội dung tại địa chỉ đó.

Hãy kết thúc Burnhành động của `gift_card` người xác nhận. Chúng ta chỉ cần kiểm tra xem cái nào `amount` bằng số âm và cái `asset_name` nào bằng `token_name`.

```
use aiken/dict
use aiken/list
use aiken/transaction.{OutputReference, ScriptContext, Transaction} as tx
use aiken/transaction/value

type Action {
  Mint
  Burn
}

validator(token_name: ByteArray, utxo_ref: OutputReference) {
  fn gift_card(rdmr: Action, ctx: ScriptContext) -> Bool {
    let ScriptContext { transaction, purpose } = ctx

    expect tx.Mint(policy_id) = purpose

    let Transaction { inputs, mint, .. } = transaction

    expect [(asset_name, amount)] =
      mint
        |> value.from_minted_value
        |> value.tokens(policy_id)
        |> dict.to_list()

    when rdmr is {
      Mint -> {
        expect Some(_input) =
          list.find(inputs, fn(input) { input.output_reference == utxo_ref })
        amount == 1 && asset_name == token_name
      }
      Burn ->
        amount == -1 && asset_name == token_name
    }
  }
}
```

Bây giờ chúng ta có thể bắt đầu làm việc với `redeem` trình xác thực. Chúng tôi sẽ muốn tham số hóa trình xác thực này bằng `token_name` và đó `policy_id` là hàm băm của `gift_card` trình xác thực sau khi áp dụng các thông số của nó. Chúng tôi tham số hóa `redeem` bằng `gift_card`'s `policy_id` để chỉ có thể sử dụng `redeem` riêng với `gift_card`.

```aiken
use aiken/dict
use aiken/list
use aiken/transaction.{OutputReference, ScriptContext, Transaction} as tx
use aiken/transaction/value

// ... gift card validator ...

validator(token_name: ByteArray, policy_id: ByteArray) {
  fn redeem(_d: Data, _r: Data, ctx: ScriptContext) -> Bool {
    todo @"redeem"
  }
}
```

Hãy thêm một số bản soạn sẵn vào trình xác thực này để chúng ta có thể thực hiện `asset_name` và `amount` thoát khỏi giao dịch của ngữ cảnh tập lệnh.

```aiken
use aiken/dict
use aiken/list
use aiken/transaction.{OutputReference, ScriptContext, Transaction} as tx
use aiken/transaction/value


validator(token_name: ByteArray, policy_id: ByteArray) {
  fn redeem(_d: Data, _r: Data, ctx: ScriptContext) -> Bool {
    let ScriptContext { transaction, .. } = ctx

    let Transaction { mint, .. } = transaction

    expect [(asset_name, amount)] =
      mint
        |> value.from_minted_value
        |> value.tokens(policy_id)
        |> dict.to_list()

    todo @"redeem"
  }
}
```

Cuối cùng, chúng ta cần xác nhận rằng cái `asset_name` đó bằng `token_name` và cái đó `amount` bằng âm.

```aiken
use aiken/dict
use aiken/list
use aiken/transaction.{OutputReference, ScriptContext, Transaction} as tx
use aiken/transaction/value

// ... gift card validator ...

validator(token_name: ByteArray, policy_id: ByteArray) {
  fn redeem(_d: Data, _r: Data, ctx: ScriptContext) -> Bool {
    let ScriptContext { transaction, .. } = ctx

    let Transaction { mint, .. } = transaction

    expect [(asset_name, amount)] =
      mint
        |> value.from_minted_value
        |> value.tokens(policy_id)
        |> dict.to_list()

    amount == -1 && asset_name == token_name
  }
}
```

### 3. Xây dựng ra `plutus.json` và địa chỉ của hợp đồng

Chúng ta nên đảm bảo điều này được xây dựng. Bạn đã chạy `aiken check` dọc đường phải không?!?

`Bỏ chuyện đùa sang một bên, có thể bạn đang sử dụng tính năng tích hợp trình chỉnh sửa. Nếu tích hợp trình chỉnh sửa không cung cấp cho bạn nguồn cấp dữ liệu phù hợp hoặc gây khó khăn cho bạn, vui lòng liên hệ với chúng tôi để chúng tôi có thể cải thiện mọi thứ.`

```sh
aiken build
    Compiling aiken-lang/stdlib 1.7.0 (D:\Workspace\aiken-tutorial\project\03_gift_card\smart_contract\build\packages\aiken-lang-stdlib)
    Compiling independence/smart_contract 0.0.0 (D:\Workspace\aiken-tutorial\project\03_gift_card\smart_contract)
   Generating project's blueprint (D:\Workspace\aiken-tutorial\project\03_gift_card\smart_contract\plutus.json)

Summary
    0 errors, 0 warnings
```

Như vậy khi file plutus.json được sinh ra quá trình tạo hợp đồng thông minh của mình đã thành công.
