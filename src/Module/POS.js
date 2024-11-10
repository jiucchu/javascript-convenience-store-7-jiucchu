import { Console } from "@woowacourse/mission-utils";
import ApplyPromotion from "./ApplyPromotion.js";
import Membership from "./Membership.js";
import Purchase from "./Purchase.js";
import { InputUtils } from "../Utils/ioUtils.js";

export default class POS {
    constructor(inventory) {
        this.inventory = inventory;
        this.purchaseList = [];
    }

    async run() {
        this.inventory.printInventory();

        this.purchaseList = await InputUtils.inputPurchaseList(this.inventory.products);

        const applyPromotion = new ApplyPromotion(this.inventory.products, this.purchaseList);
        await applyPromotion.checkPromotion();

        this.purchaseList = applyPromotion.getPurchaseList();
        const promotionApplyProducst = applyPromotion.getPromotionApplyList();

        const purchase = new Purchase(this.inventory.products, this.purchaseList);
        this.purchaseList = purchase.getUnitPurchaseList();
        const totalPurcahseAmount = purchase.getTotalPurchaseAmount();

        let discountedAmount = totalPurcahseAmount - applyPromotion.getTotalPromotionAmount();
        const membership = new Membership(discountedAmount);

        this.inventory.updateInventory(this.purchaseList);


    }

} 