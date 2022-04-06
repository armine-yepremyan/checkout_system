import { priceList } from './priceList';
import { Rule, ATVRule, API } from './rules';

interface Items {
    [sku: string]: number;
}

export class Checkout {
    private checkoutItemsQuantity: Items = {};
    pricingRules: Array<string>;
    constructor(rules: Array<string>) {
        this.pricingRules = rules; 
    }

    scan(sku: string): this {
        if (sku in this.checkoutItemsQuantity) {
            ++this.checkoutItemsQuantity[sku];
        } else {
            this.checkoutItemsQuantity[sku] = 1;
        }        
        return this
    }

    total(): number {
        let result = 0;
        Object.keys(this.checkoutItemsQuantity).forEach(item => {
            if (!(item in priceList)) throw new Error("Wrong item in the list.");
            const hasAppliableRule = this.pricingRules.includes(item);
            const rule: Rule | null = API.getItemRule(item);
            if (hasAppliableRule && rule) {
                result += rule.total(priceList[item], this.checkoutItemsQuantity[item]);
            } else {
                result += (priceList[item] * this.checkoutItemsQuantity[item]) 
            }
        });
        return result;
    }
}


// pricingRules is an array of item names which can be discounted
// const co = new Checkout(['atv']);
// co.scan('atv').scan('mbp').scan('atv').scan('atv')
// console.log(co.total());