# backend_ts_codding_challenge

X company is starting a computer store. It will have the following products in the catalogue

| SKU  |      Name     |  Price   |
| -----| ------------- |----------|
| ipd  | Super iPad    | $549.99  |
| mbp  | MacBook Pro   | $1399.99 |
| atv  | Apple TV      | $109.50  |
| vga  | VGA adapter   | $30.00   |


The checkout system can scan items in any order. The system will apply discounts according to the rules.

The interface to the checkout looks like this:
```bash
  const co = new Checkout(pricingRules);
  co.scan(item1);
  co.scan(item2);
  co.total();
```

## How to run tests

```bash
git clone https://github.com/arminey/backend_ts_codding_challenge.git
cd backend_ts_codding_challenge
npm install
npm run test
```
