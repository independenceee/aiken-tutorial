### Mã ngoài chuỗi

Khi mới bắt đầu, chúng ta cần khóa tiền trong hợp đồng mới tạo của mình. Chúng tôi sẽ sử dụng `Lucid` để xây dựng và gửi giao dịch của chúng tôi thông qua `BlockFrost`.

Đây chỉ là một ví dụ về khả năng thiết lập bằng các công cụ mà chúng tôi yêu thích. Để biết thêm công cụ, hãy nhớ xem Cổng thông tin dành cho nhà phát triển Cardano!

### Cài đặt

Đầu tiên, chúng tôi thiết lập Lucid với Block Frost làm nhà cung cấp. Bạn biết bài tập từ `Hello, World!` ví dụ rồi.

```ts
import {
  Blockfrost,
  C,
  Data,
  Lucid,
  SpendingValidator,
  TxHash,
  fromHex,
  toHex,
} from "https://deno.land/x/lucid@0.8.3/mod.ts";
import * as cbor from "https://deno.land/x/cbor@v1.4.1/index.js";
 
const lucid = await Lucid.new(
  new Blockfrost(
    "https://cardano-preview.blockfrost.io/api/v0",
    Deno.env.get("BLOCKFROST_API_KEY"),
  ),
  "Preview",
);
 
lucid.selectWalletFromPrivateKey(await Deno.readTextFile("./owner.sk"));
 
const validator = await readValidator();
 
// --- Supporting functions
 
async function readValidator(): Promise<SpendingValidator> {
  const validator = JSON.parse(await Deno.readTextFile("plutus.json")).validators[0];
  return {
    type: "PlutusV2",
    script: toHex(cbor.encode(fromHex(validator.compiledCode))),
  };
}
```

Nếu bạn đã cài đặt deno, bạn có thể chạy ngoại trừ ở trên bằng cách thực thi:

```sh
deno run --allow-net --allow-read --allow-env vesting_lock.ts
```


Nó giả định rằng tập tin này (`vesting_lock.ts`) được đặt ở thư mục gốc của `vesting` thư mục của bạn. Ở giai đoạn này, thư mục của bạn sẽ trông gần như thế này:

```
./vesting
│
├── README.md
├── aiken.toml
├── plutus.json
├── vesting_lock.ts
├── owner.addr
├── owner.sk
├── beneficiary.addr
├── beneficiary.sk
├── lib
│   └── ...
└── validators
    └── vesting.ak
```

### Khóa tiền vào hợp đồng

Tại đây, chúng tôi thực hiện giao dịch đầu tiên để khóa tiền vào hợp đồng. Dữ liệu phải khớp với biểu diễn mà tập lệnh mong đợi, hàm tạo là một đối tượng mong đợi 3 trường.

```ts
const ownerPublicKeyHash = lucid.utils.getAddressDetails(
  await lucid.wallet.address()
).paymentCredential.hash;
 
const beneficiaryPublicKeyHash =
  lucid.utils.getAddressDetails(await Deno.readTextFile("beneficiary.addr"))
    .paymentCredential.hash;
 
const Datum = Data.Object({
  lock_until: Data.BigInt,
  owner: Data.String, 
  beneficiary: Data.String, 
});
 
type Datum = Data.Static<typeof Datum>;
 
const datum = Data.to<Datum>(
  {
    lock_until: 1672843961000n, 
    owner: ownerPublicKeyHash, 
    beneficiary: beneficiaryPublicKeyHash,
  },
  Datum
);
 
const txLock = await lock(1000000, { into: validator, datum: datum });
 
await lucid.awaitTx(txLock);
 
console.log(`1 tADA locked into the contract
    Tx ID: ${txLock}
    Datum: ${datum}
`);
 
async function lock(lovelace, { into, datum }): Promise<TxHash> {
  const contractAddress = lucid.utils.validatorToAddress(into);
 
  const tx = await lucid
    .newTx()
    .payToContract(contractAddress, { inline: datum }, { lovelace })
    .complete();
  const signedTx = await tx.sign().complete();
  return signedTx.submit();
}
```

### Mở khóa tiền từ hợp đồng

Bây giờ chúng ta có thể sử dụng một ví khác (người thụ hưởng.sk). Ví này sẽ là ví thụ hưởng đã được thêm vào dữ liệu ở bước trước (khóa).

Cuối cùng, bước cuối cùng: bây giờ chúng tôi muốn chi tiêu UTxO bị khóa bởi `vesting` hợp đồng của chúng tôi.

Để hợp lệ, giao dịch của chúng tôi phải đáp ứng một trong hai điều kiện:
nó phải có chữ ký của chủ sở hữu (được coi là "chủ sở hữu" trong mốc thời gian); hoặc
nó phải được ký bởi người thụ hưởng được tham chiếu là "người thụ hưởng" trong dữ liệu VÀ thời gian phải vượt quá ngưỡng chúng tôi đã ấn định -- nghĩa là nó phải muộn hơn 'Thứ Tư ngày 04 tháng 1 năm 2023 14:52:41 GMT+0000'.
Giống như Hello, World! Ví dụ: chúng tôi cần thêm người ký một cách rõ ràng bằng cách sử dụng .addSignerđể nó được thêm vào `extra_signatories` giao dịch của chúng tôi và có thể truy cập được bằng tập lệnh của chúng tôi.

Ngoài ra, chúng tôi cần chỉ định làm `.validFrom` dấu thời gian `POSIX` từ nơi giao dịch được coi là hợp lệ (phải là vào thời điểm chúng tôi gửi giao dịch). Chúng tôi có thể tùy ý xác định giới hạn hiệu lực trên bằng cách sử dụng .validTodưới dạng TTL (Thời gian tồn tại).

Hãy tạo một tệp mới `vesting_unlock.ts` và sao chép một số bản soạn sẵn từ tệp đầu tiên.

```ts
import {
  Blockfrost,
  C,
  Data,
  Lucid,
  SpendingValidator,
  TxHash,
  fromHex,
  toHex,
} from "https://deno.land/x/lucid@0.8.3/mod.ts";
import * as cbor from "https://deno.land/x/cbor@v1.4.1/index.js";
 
const lucid = await Lucid.new(
  new Blockfrost(
    "https://cardano-preview.blockfrost.io/api/v0",
    Deno.env.get("BLOCKFROST_API_KEY"),
  ),
  "Preview",
);
 
lucid.selectWalletFromPrivateKey(await Deno.readTextFile("./beneficiary.sk"));
 
const beneficiaryPublicKeyHash = lucid.utils.getAddressDetails(
  await lucid.wallet.address()
).paymentCredential.hash;
 
const validator = await readValidator();
 
async function readValidator(): Promise<SpendingValidator> {
  const validator = JSON.parse(await Deno.readTextFile("plutus.json")).validators[0];
  return {
    type: "PlutusV2",
    script: toHex(cbor.encode(fromHex(validator.compiledCode))),
  };
}
```

Bây giờ, hãy thêm các bit để mở khóa số tiền trong hợp đồng. Chúng tôi sẽ cần mã định danh giao dịch thu được khi bạn chạy tập lệnh trước đó (`vesting_lock.ts`)

Mã định danh giao dịch đó và chỉ số đầu ra tương ứng (ở đây, `0`) xác định duy nhất UTxO (Đầu ra giao dịch chưa chi tiêu) trong đó số tiền hiện đang bị khóa. Và đó là thứ chúng ta sắp mở khóa.

Như chúng tôi đã nêu ở trên, chúng tôi cần đảm bảo chỉ gửi giao dịch của mình sau khi thời gian trì hoãn trao quyền đã trôi qua mà không có điều gì mà nút sẽ từ chối giao dịch (không tính bất kỳ khoản phí nào) và vui lòng yêu cầu chúng tôi gửi lại giao dịch sau đó. .


```ts
const scriptAddress = lucid.utils.validatorToAddress(validator);
const scriptUtxos = await lucid.utxosAt(scriptAddress);
 
const Datum = Data.Object({
  lock_until: Data.BigInt, 
  owner: Data.String, 
  beneficiary: Data.String, 
});
 
type Datum = Data.Static<typeof Datum>;
 
const currentTime = new Date().getTime();
 
// we filter out all the UTXOs by beneficiary and lock_until
const utxos = scriptUtxos.filter((utxo) => {
    let datum = Data.from<Datum>(
      utxo.datum,
      Datum,
    );
 
    return datum.beneficiary === beneficiaryPublicKeyHash &&
      datum.lock_until <= currentTime;
});
 
if (utxos.length === 0) {
  console.log("No redeemable utxo found. You need to wait a little longer...");
  Deno.exit(1);
}
 
// we don't have any redeemer in our contract but it needs to be empty
const redeemer = Data.empty();
 
const txUnlock = await unlock(utxos, currentTime, { from: validator, using: redeemer });
 
await lucid.awaitTx(txUnlock);
 
console.log(`1 tADA recovered from the contract
    Tx ID: ${txUnlock}
    Redeemer: ${redeemer}
`);
 
 
async function unlock(utxos, currentTime, { from, using }): Promise<TxHash> {
  const laterTime = new Date(currentTime + 2 * 60 * 60 * 1000).getTime();
 
  const tx = await lucid
    .newTx()
    .collectFrom(utxos, using)
    .addSigner(await lucid.wallet.address()) 
    .validFrom(currentTime)
    .validTo(laterTime)
    .attachSpendingValidator(from)
    .complete();
 
  const signedTx = await tx
    .sign()
    .complete();
 
  return signedTx.submit();
}
```

Như bạn tưởng tượng, chúng ta có thể chạy tập lệnh này với câu thần chú sau:

```
deno run --allow-net --allow-read --allow-env vesting_unlock.ts
```