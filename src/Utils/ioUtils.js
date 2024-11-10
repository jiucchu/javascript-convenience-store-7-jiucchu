import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGE } from './Constnats.js';

export class InputUtils {
}

export class OutputUtils {
    static printWelcome() {
        Console.print(OUTPUT_MESSAGE.WELCOME_MESSAGE);
    }

    static printInventory(product) {
        let [name, price, quantity, promotion] = [product.getName(), product.getPrice(), product.getQuantity(), product.getPromotion()];

        if (product.getQuantity() != '재고 없음') {
            quantity = `${quantity}개`;
        }

        Console.print(`- ${name}, ${price.toLocaleString()}원 ${quantity} ${promotion}`);
    }
}