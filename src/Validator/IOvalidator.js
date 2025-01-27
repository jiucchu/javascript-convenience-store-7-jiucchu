import { Console } from "@woowacourse/mission-utils";
import { INPUT_ERROR_MESSAGE } from "../Utils/Constnats.js";

export class InputValidator {

    static validatePurchaseList(purchaseList, inventoryList) {
        purchaseList.forEach(purchase => {
            this.validateSinglePurchase(purchase, inventoryList);
        });

    }

    static validateSinglePurchase(purchase, inventoryList) {
        if (purchase === null) {
            throw new Error(INPUT_ERROR_MESSAGE.PURCHASE_LIST_FORMAT_ERROR);
        }
        const matchingProducts = this.getMatchingProducts(purchase.name, inventoryList);
        this.validateProductExists(matchingProducts);
        this.validateStockAvailability(matchingProducts, purchase.quantity);
    }

    static validatePurchaseFormat(purchase) {
        const { name, quantity } = purchase;
        if (typeof name !== "string" || typeof quantity !== "number" || quantity <= 0) {
            throw new Error(INPUT_ERROR_MESSAGE.PURCHASE_LIST_FORMAT_ERROR);
        }
    }
    static getMatchingProducts(name, inventoryList) {
        return inventoryList.filter(product => product.getName() === name);
    }

    static validateProductExists(matchingProducts) {
        if (matchingProducts.length === 0) {
            throw new Error(INPUT_ERROR_MESSAGE.NON_EXISTENT_PRODUCT);
        }
    }

    static validateStockAvailability(matchingProducts, quantity) {
        const totalStock = matchingProducts.reduce((sum, product) => sum + product.quantity, 0);
        if (totalStock < quantity) {
            throw new Error(INPUT_ERROR_MESSAGE.EXCEED_STOCK);
        }
    }

    static validatePurchaseMorePromotionProduct(purchaseMorePromotionProduct) {
        const answer = ['y', 'Y', 'n', 'N'];
        if (!(answer.includes(purchaseMorePromotionProduct))) {
            throw new Error(INPUT_ERROR_MESSAGE.PROMOTION_PRODUCT_ADD_ERROR);
        }
    }

    static validatePurchasePromotionProductAtFullPrice(purchasePromotionProductAtFullPrice) {
        const answer = ['y', 'Y', 'n', 'N'];
        if (!(answer.includes(purchasePromotionProductAtFullPrice))) {
            throw new Error(INPUT_ERROR_MESSAGE.PROMOTION_PRODUCT_PULL_PRICE_ERROR);
        }
    }

    static validateMembershipApply(membershipApply) {
        const answer = ['y', 'Y', 'n', 'N'];
        if (!(answer.includes(membershipApply))) {
            throw new Error(INPUT_ERROR_MESSAGE.MEMBERSHIP_APPLY);
        }
    }
    static validateInputMorePurchase(morePurchase) {
        const answer = ['y', 'Y', 'n', 'N'];
        if (!(answer.includes(morePurchase))) {
            throw new Error(INPUT_ERROR_MESSAGE.MORE_PURCHASE);
        }
    }


}

