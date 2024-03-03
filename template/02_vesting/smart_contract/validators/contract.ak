use aiken/hash.{Blake2b_224, Hash}
use aiken/interval.{Finite, Interval, IntervalBound, PositiveInfinity}
use aiken/list
use aiken/transaction.{ScriptContext, Spend, Transaction, ValidityRange}
use aiken/transaction/credential.{VerificationKey}

type POSIXTime =
  Int

type VerificationKeyHash =
  Hash<Blake2b_224, VerificationKey>

type Datum {
  lock_until: POSIXTime,
  owner: VerificationKeyHash,
  beneficiary: VerificationKeyHash,
}

validator {
  fn vesting(datum: Datum, _redeemer: Void, ctx: ScriptContext) {
    let ScriptContext { transaction, .. } = ctx

    when ctx.purpose is {
      Spend(_) -> or {
          must_be_signed_by(transaction, datum.owner),
          and {
            must_be_signed_by(transaction, datum.beneficiary),
            must_start_after(transaction.validity_range, datum.lock_until),
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

test must_start_after_succeed_when_lower_bound_is_after() {
  must_start_after(interval.after(2), 1)
}

test must_start_after_succeed_when_lower_bound_is_equal() {
  must_start_after(interval.after(2), 2)
}

test must_start_after_fail_when_lower_bound_is_before() {
  !must_start_after(interval.after(2), 3)
}
