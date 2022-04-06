import { Rule } from './ruleInterface';

export class ATVRule implements Rule {
    total(price: number, count: number): number {
        let result = 0;
        if (count < 3) return price * count;

        return (price * (Math.floor(count / 3) * 2)) + (price * (count % 3));

    }
}