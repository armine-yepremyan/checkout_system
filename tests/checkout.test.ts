import { Checkout } from '../src/index';

const pricingRules = ['atv', 'ipd'];

describe('testing index file', () => {
  let co: Checkout;

  beforeEach(() => {
    co = new Checkout(pricingRules);
  });

  test('No item checkout, should get 0', () => {
    expect(co.total()).toBe(0);
  });

  test('We should get 100 for buying one Apple TV', () => {
    co.scan('atv');
    expect(co.total()).toBe(100);
  });

  test('We should get 200 for buying 2 Apple TV', () => {
    co.scan('atv').scan('atv');
    expect(co.total()).toBe(200);
  });

  test('We should get 200 for buying 3 Apple TV', () => {
    co.scan('atv').scan('atv').scan('atv');
    expect(co.total()).toBe(200);
  });

  test('We should get 600 for buying 8 Apple TV', () => {
    co.scan('atv').scan('atv')
      .scan('atv').scan('atv')
      .scan('atv').scan('atv')
      .scan('atv').scan('atv');
    expect(co.total()).toBe(600);
  });

  test('No discount for MacBook Pro. We should get 1350', () => {
    co.scan('mbp');
    expect(co.total()).toBe(1350);
  });

  test('We should get 1550 for one MacBook Pro and 3 Apple TV', () => {
    co.scan('mbp').scan('atv').scan('atv').scan('atv');
    expect(co.total()).toBe(1550);
  });

  test('We should get 800 for buying one Super iPad', () => {
    co.scan('ipd');
    expect(co.total()).toBe(800);
  });

  test('We should get 2400 for buying 3 Super iPad', () => {
    co.scan('ipd').scan('ipd').scan('ipd');
    expect(co.total()).toBe(2400);
  });

  test('We should get 2499.95 for buying one 5 Super iPad', () => {
    co.scan('ipd').scan('ipd').scan('ipd').scan('ipd').scan('ipd');
    expect(co.total()).toBe(2499.95);
  });

  test('We should get 1380 for one MacBook Pro and one VGA adapter. No discount', () => {
    co.scan('mbp').scan('vga');
    expect(co.total()).toBe(1380);
  });


  test('We should get 4073.95 for one MacBook Pro, 3 Apple TV, 5 Super iPad, 1 VGA adapter', () => {
    co.scan('mbp').scan('atv')
      .scan('atv').scan('ipd')
      .scan('ipd').scan('ipd')
      .scan('atv').scan('ipd')
      .scan('ipd').scan('vga');
    expect(co.total()).toBe(4079.95);
  });

  test('Item which is not store in price list', () => {
    co.scan('wrongItem')
    expect(() => co.total()).toThrow(Error);
    expect(() => co.total()).toThrow("Wrong item in the list.");
  });

});