import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGE, OUTPUT_MESSAGE } from './Constnats.js';
import { InputValidator } from '../Validator/IOvalidator.js';

export class InputUtils {
    static async inputPurchaseList(inventoryList) {
        try {
            const purchase = await Console.readLineAsync(INPUT_MESSAGE.PURCHASE_INFORMATION);
            const purchaseList = this.getPurchaseList(purchase);
            InputValidator.validatePurchaseList(purchaseList, inventoryList);
        } catch (error) {
            this.printErrorMessage(error.message);
            return this.inputPurchaseList(inventoryList);
        }
    }

    static getPurchaseList(purchase) {
        const purchaseProducts = purchase.split(',');
        return purchaseProducts.map(purchaseProduct => {
            const match = purchaseProduct.match(/\[(.+)-(\d+)\]/);
            if (match) {
                const [, name, quantity] = match;
                return { name: name, quantity: quantity };
            }
            return null;
        })
    }

    static printErrorMessage(errorMessage) {
        Console.print(errorMessage)
    }

}

export class OutputUtils {
    static printWelcome() {
        Console.print(OUTPUT_MESSAGE.WELCOME_MESSAGE);
    }

    static printInventory(product) {
        Console.print(this.getInventoryString(product));
    }

    static printPurchaseInformation() {
        Console.print(OUTPUT_MESSAGE.PURCHASE_INFORMATION());
    }

    static getInventoryString(product) {
        const [name, price, quantity, promotion] = [product.getName(), product.getPrice(), product.getQuantity(), product.getPromotion()];

        if (product.getQuantity() == '0') {
            return `- ${name}, ${price.toLocaleString()}원 재고 없음`
        }

        return `- ${name}, ${price.toLocaleString()}원 ${quantity} ${promotion}`
    }
}