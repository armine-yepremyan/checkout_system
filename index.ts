import { priceList } from './priceList';

interface Rule {
    total(price: number, count: number): number
}

class ATVRule implements Rule {
    total(price: number, count: number): number {
        return count === 3 ? price * 2 : price * count;
    }
}

class API {
    static getItemRule(item: string) {
        switch(item) {
            case 'atv': return new ATVRule();
            default: return null;
        }
    }
}



interface Items {
    [sku: string]: number;
}

class Checkout {
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
            const rule: Rule = API.getItemRule(item);
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
const co = new Checkout(['atv']);
co.scan('atv').scan('mbp').scan('atv').scan('atv')
console.log(co.total());