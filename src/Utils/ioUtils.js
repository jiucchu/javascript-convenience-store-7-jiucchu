import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGE, OUTPUT_MESSAGE } from './Constnats.js';
import { InputValidator } from '../Validator/IOvalidator.js';

export class InputUtils {
    static async inputPurchaseList(inventoryList) {
        try {
            const purchase = await Console.readLineAsync(INPUT_MESSAGE.PURCHASE_INFORMATION);
            const purchaseList = this.getPurchaseList(purchase);
            InputValidator.validatePurchaseList(purchaseList, inventoryList);

            return purchaseList
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
                return { name: name, quantity: Number(quantity) };
            }
            return null;
        })
    }

    static async inputPurchaseMorePromotionProduct(name) {
        try {
            const purchaseMorePromotionProduct = await Console.readLineAsync(`\n현재 ${name}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)\n`);
            InputValidator.validatePurchaseMorePromotionProduct(purchaseMorePromotionProduct);

            return purchaseMorePromotionProduct
        } catch (error) {
            this.printErrorMessage(error.message);
            return this.inputPurchaseMorePromotionProduct(name);
        }
    }

    static async inputPurchasePromotionProductAtFullPrimce(name, quantity) {
        try {
            const purchasePromotionProductAtFullPrimce = await Console.readLineAsync(`\n현재 ${name} ${quantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`);
            InputValidator.validatePurchasePromotionProductAtFullPrimce(purchasePromotionProductAtFullPrimce);

            return purchasePromotionProductAtFullPrimce
        } catch (error) {
            this.printErrorMessage(error.message);
            return this.inputPurchasePromotionProductAtFullPrimce(name, quantity);
        }
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