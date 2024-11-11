import { OutputUtils } from '../Utils/ioUtils.js';
import { Console, DateTimes } from '@woowacourse/mission-utils';
import Promotion from './Promotion.js';
import { InputUtils } from '../Utils/ioUtils.js';
import fs from 'fs';

export default class ApplyPromotion {
    constructor(inventoryList, purchaseList) {
        this.promotions = [];
        this.today = this.getToday();
        this.inventoryList = inventoryList;
        this.purchaseList = purchaseList;
        this.loadProduct();
        this.promotionList = this.getPromotionList();
        this.promotionApplyProducst = [];
    }

    getToday() {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const date = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${date}`
    }

    loadPromotionFile() {
        const promotionFile = fs.readFileSync('./public/promotions.md', 'utf-8');
        const lines = promotionFile.trim().split('\n');

        return lines
    }

    addPromotion(promotion) {
        this.promotions.push(promotion);
    }

    loadProduct() {
        const lines = this.loadPromotionFile();
        lines.slice(1).forEach(line => {
            const [name, buy, get, startDate, endDate] = line.split(',');
            const promotion = new Promotion(name, buy, get, startDate, endDate);

            this.addPromotion(promotion);
        });
    }

    // 프로모션 적용 여부 확인
    getPromotionList() {
        return this.inventoryList.filter(product => (product.getPromotion() !== ''));
    }

    getPromotionStatus(name) {
        const promotionList = this.checkPromotionList(name)
        if (promotionList.length === 0) {
            return false
        }
        const promotion = this.getThisPromotion(promotionList[0].getPromotion())[0];
        return this.checkPromotionDate(promotion)
    }

    checkPromotionList(name) {
        return this.promotionList.filter(product => product.getName() === name)
    }

    checkPromotionDate(promotion) {
        const start = new Date(promotion.getStartDate());
        const end = new Date(promotion.getEndDate());
        const today = new Date(DateTimes.now());

        return today >= start && today <= end
    }


    async checkPromotion() {
        for (const product of this.purchaseList) {
            if (this.getPromotionStatus(product.name)) {
                const promotionInventory = this.checkPromotionList(product.name)[0];
                const promotion = this.getThisPromotion(promotionInventory.getPromotion())[0];
                await this.applyPromotion(product, promotionInventory, promotion);
            }
        }
    }

    getThisPromotion(thisPromotion) {
        return this.promotions.filter(promotion => promotion.getName() == thisPromotion);
    }

    // 프로모션 적용
    async applyPromotion(product, promotionInventory, promotion) {
        if (((product.quantity % (promotion.getBuy() + 1)) === 0 && product.quantity <= promotionInventory.getQuantity()) || product.quantity === promotionInventory.getQuantity()) {
            this.promotionApplyProducst.push({ name: product.name, quantity: Math.trunc(product.quantity / (promotion.getBuy() + 1)) * (promotion.getBuy() + 1), applyQuantity: Math.trunc(product.quantity / (promotion.getBuy() + 1)) });
        }
        if ((product.quantity % (promotion.getBuy() + 1)) === promotion.getBuy() && (product.quantity + 1) <= promotionInventory.getQuantity()) {
            await this.promotionInventoryLack(product.name, product.quantity, promotion.getBuy());
        }
        if ((product.quantity / (promotion.getBuy() + 1)) >= 1 && (product.quantity > promotionInventory.getQuantity())) {
            await this.promotionInventoryExeed(product.name, product.quantity, promotion.getBuy(), promotionInventory.getQuantity());
        }
    }



    async promotionInventoryLack(name, productQuantity, promotionQuantity) {
        const answer = await InputUtils.inputPurchaseMorePromotionProduct(name);
        if (answer === 'y' | answer === 'Y') {
            this.promotionApplyProducst.push({ name: name, quantity: (productQuantity + 1), applyQuantity: Math.trunc((productQuantity + 1) / (promotionQuantity + 1)) });
            this.handleReducedPurchase(name, 1);

        }
        if (answer === 'n' | answer === 'N') {
            this.promotionApplyProducst.push({ name: name, quantity: Math.trunc((productQuantity) / (promotionQuantity + 1)) * (promotionQuantity + 1), applyQuantity: Math.trunc((productQuantity) / (promotionQuantity + 1)) });
        }
    }

    async promotionInventoryExeed(name, productQuantity, promotionQuantity, InventoryQuantity) {
        const exceedQuantity = (productQuantity - Math.trunc(InventoryQuantity / (promotionQuantity + 1)) * (promotionQuantity + 1));
        const answer = await InputUtils.inputPurchasePromotionProductAtFullPrice(name, exceedQuantity);
        if (answer === 'y' | answer === 'Y') {
            this.promotionApplyProducst.push({ name: name, quantity: Math.trunc(InventoryQuantity / (promotionQuantity + 1)) * (promotionQuantity + 1), applyQuantity: Math.trunc(InventoryQuantity / (promotionQuantity + 1)) });
        }
        if (answer === 'n' | answer === 'N') {
            this.promotionApplyProducst.push({ name: name, quantity: Math.trunc(InventoryQuantity / (promotionQuantity + 1)) * (promotionQuantity + 1), applyQuantity: Math.trunc(InventoryQuantity / (promotionQuantity + 1)) });
            this.handleReducedPurchase(name, -exceedQuantity);
        }
    }

    async handleReducedPurchase(name, changedQuantity) {
        await this.updatePurchaseList(name, changedQuantity);
    }

    async updatePurchaseList(name, changedQuantity) {
        this.purchaseList = this.purchaseList.map(product => {
            if (product.name === name) {
                return {
                    name: product.name,
                    quantity: product.quantity + changedQuantity,
                };
            }
            return product;
        });
    }

    // 값 리턴
    getPurchaseList() {
        return this.purchaseList;
    }

    getPromotionApplyList() {
        return this.promotionApplyProducst;
    }

    getPromotionAmount() {
        let totalDiscount = 0;
        this.promotionApplyProducst.forEach(promotionProduct => {
            const matchingInventory = this.findMatchingInventory(promotionProduct.name);

            if (matchingInventory) {
                totalDiscount += matchingInventory.price * promotionProduct.applyQuantity;
            }
        });

        return totalDiscount;
    }

    getTotalPromotionAmount() {
        let totalApplyAmount = 0;
        this.promotionApplyProducst.forEach(promotionProduct => {
            const matchingInventory = this.findMatchingInventory(promotionProduct.name);

            if (matchingInventory) {
                totalApplyAmount += matchingInventory.price * promotionProduct.quantity;
            }
        });

        return totalApplyAmount;
    }

    findMatchingInventory(productName) {
        return this.inventoryList.find(product => product.name === productName);
    }

    findPromotion(promotionName) {
        return this.promotions.find(promotion => promotion.getName() === promotionName);
    }

    calculateDiscountedQuantity(totalQuantity, buyQuantity) {
        const discountedSets = Math.trunc(totalQuantity / (buyQuantity + 1));
        return discountedSets;
    }
}