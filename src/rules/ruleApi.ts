import { ATVRule } from './atvRule';
import { IPDRule } from './ipdRule';

export class API {
    static getItemRule(item: string) {
        switch(item) {
            case 'atv': return new ATVRule();
            case 'ipd': return new IPDRule();
            default: return null;
        }
    }
}