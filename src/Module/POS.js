import { Console } from "@woowacourse/mission-utils";
import ApplyPromotion from "./ApplyPromotion.js";
import Membership from "./Membership.js";
import Purchase from "./Purchase.js";
import { InputUtils, OutputUtils } from "../Utils/ioUtils.js";

export default class POS {
    constructor(inventory) {
        this.inventory = inventory;
        this.purchaseList = [];
        this.promotionList = [];
        this.totalAmounts = { totalQuantity: 0, totalPrice: 0, promotionDiscount: 0, membershipDiscount: 0, finalAmount: 0 }
    }

    async run() {
        await this.setPos();

        const promotionApplyProducst = await this.applyPromotion();
        this.purchaseProducts();
        await this.applyMembership();

        this.inventory.updateInventory(this.purchaseList, promotionApplyProducst);
        this.printReceipt(this.purchaseList, this.promotionList, this.totalAmounts);
        this.checkMorePurchase();
    }

    async setPos() {
        this.inventory.printInventory();
        this.reset();
        this.purchaseList = await InputUtils.inputPurchaseList(this.inventory.products);
    }

    reset() {
        this.purchaseList = [];
        this.totalAmounts = { totalQuantity: 0, totalPrice: 0, promotionDiscount: 0, membershipDiscount: 0, finalAmount: 0 }
    }

    async checkMorePurchase() {
        const answer = await InputUtils.inputMorePurchase();

        if (answer === 'y' | answer === 'Y') {
            return this.run();
        }
    }

    printReceipt(purchaseList, promotionList, totalAmounts) {
        this.getPayment();
        OutputUtils.printReceipt(purchaseList, promotionList, totalAmounts);
    }

    async applyPromotion() {
        const applyPromotion = new ApplyPromotion(this.inventory.products, this.purchaseList);
        await applyPromotion.checkPromotion();

        this.purchaseList = applyPromotion.getPurchaseList();
        this.totalAmounts.promotionDiscount = applyPromotion.getPromotionAmount();
        this.promotionList = applyPromotion.getPromotionApplyList();

        return applyPromotion.getPromotionApplyList();
    }

    purchaseProducts() {
        const purchase = new Purchase(this.inventory.products, this.purchaseList);
        this.purchaseList = purchase.getUnitPurchaseList();

        this.totalAmounts.totalPrice = purchase.getTotalPurchaseAmount();
        this.totalAmounts.totalQuantity = purchase.getTotalpurchaseQuantity();
    }

    async applyMembership() {
        const membership = new Membership(this.totalAmounts.totalPrice, this.totalAmounts.promotionDiscount);

        this.totalAmounts.membershipDiscount = await membership.checkMembership();
    }

    getPayment() {
        this.totalAmounts.finalAmount = this.totalAmounts.totalPrice - this.totalAmounts.promotionDiscount - this.totalAmounts.membershipDiscount
    }

} 