import { Rule } from './ruleInterface';

const discountedPrice = 499.99;

export class IPDRule implements Rule {
    total(price: number, count: number): number {
        return count > 4 ? discountedPrice * count : price * count;
    }
}