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

    static async inputPurchasePromotionProductAtFullPrice(name, quantity) {
        try {
            const purchasePromotionProductAtFullPrice = await Console.readLineAsync(`\n현재 ${name} ${quantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`);
            InputValidator.validatePurchasePromotionProductAtFullPrice(purchasePromotionProductAtFullPrice);

            return purchasePromotionProductAtFullPrice
        } catch (error) {
            this.printErrorMessage(error.message);
            return this.inputPurchasePromotionProductAtFullPrice(name, quantity);
        }
    }

    static async InputMemershipApply() {
        try {
            const membershipApply = await Console.readLineAsync(`\n멤버십 할인을 받으시겠습니까? (Y/N)\n`);
            InputValidator.validateMembershipApply(membershipApply);

            return membershipApply
        } catch (error) {
            this.printErrorMessage(error.message);
            return this.InputMemershipApply();
        }
    }

    static async inputMorePurchase() {
        try {
            const morePurchaseApply = await Console.readLineAsync(`\n감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n`);
            InputValidator.validateInputMorePurchase(morePurchaseApply);

            return morePurchaseApply
        } catch (error) {
            this.printErrorMessage(error.message);
            return this.inputMorePurchase();
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
            return `- ${name} ${price.toLocaleString()}원 재고 없음`
        }

        return `- ${name} ${price.toLocaleString()}원 ${quantity}개 ${promotion}`
    }

    static printReceipt(purchaseList, promotionList, totalAmounts) {
        Console.print('==============W 편의점================');
        this.printPurcahseList(purchaseList);
        this.printPromotionList(promotionList);
        this.printDiscountList(totalAmounts);
    }

    static printPurcahseList(purchaseList) {
        Console.print(this.formatLine("상품명", "수량", "금액"));
        purchaseList.forEach(purchase => {
            Console.print(this.formatLine(purchase.name, purchase.quantity, purchase.total.toLocaleString()));
        })

    }

    static printPromotionList(promotionList) {
        Console.print('=============증	    정===============');
        promotionList.forEach(item => {
            Console.print(this.formatLine(item.name, item.applyQuantity));
        });
    }

    static printDiscountList(totalAmounts) {
        Console.print("=====================================");
        Console.print(this.formatLine("총구매액", totalAmounts.totalQuantity, totalAmounts.totalPrice.toLocaleString()));
        Console.print(this.formatLine("행사할인", "", `-${totalAmounts.promotionDiscount.toLocaleString()}`));
        Console.print(this.formatLine("멤버십할인", "", `-${totalAmounts.membershipDiscount.toLocaleString()}`));
        Console.print(this.formatLine("내실돈", "", totalAmounts.finalAmount.toLocaleString()));
        Console.print("=====================================");
    }


    static formatLine(name, quantity = "", price = "") {
        const nameWidth = 10;
        const quantityWidth = 6;
        const priceWidth = 15;

        return (
            name.padEnd(nameWidth) +
            quantity.toString().padStart(quantityWidth) +
            price.toString().padStart(priceWidth)
        );
    }
}