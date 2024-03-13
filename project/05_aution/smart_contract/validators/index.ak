fn add_one(n: Int) -> Int {
  n + 1
}

test add_one_1() {
  add_one(0) == 1
}

test add_one_2() {
  add_one(-42) == -41
}
