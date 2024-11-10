import { OutputUtils } from '../Utils/ioUtils.js';
import { Console } from '@woowacourse/mission-utils';
import Promotion from './Promotion.js';
import { InputUtils } from '../Utils/ioUtils.js';
import fs from 'fs';

export default class ApplyPromotion {
    constructor(inventoryList, purcahseList) {
        this.promotions = [];
        this.today = this.getToday();
        this.inventoryList = inventoryList;
        this.purcahseList = purcahseList;
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

    // 프로덕션 파일 로드
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
            return False
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
        const today = new Date(this.today);

        return today >= start && today <= end
    }


    checkPromotion() {
        this.purcahseList.forEach(product => {
            if (this.getPromotionStatus(product.name)) {
                const promotionInventory = this.checkPromotionList(product.name)[0];
                const promotion = this.getThisPromotion(promotionInventory.getPromotion())[0];
                this.applyPromotion(product, promotionInventory, promotion);
            }
        });
    }

    getThisPromotion(thisPromotion) {
        return this.promotions.filter(promotion => promotion.getName() == thisPromotion);
    }

    // 프로모션 적용
    applyPromotion(product, promotionInventory, promotion) {
        if ((product.quantity % promotion.getBuy()) === (promotion.getBuy() - 1) && (product.quantity + 1) <= promotionInventory.getQuantity()) {
            this.promotionInventoryLack(product.name, product.quantity, promotion.getBuy());
        }
    }

    async promotionInventoryLack(name, productQuantity, promotionQuantity) {
        const answer = await InputUtils.inputPurchaseMorePromotionProduct(name);
        if (answer === 'y' | answer === 'Y') {
            this.promotionApplyProducst.push({ name: name, quantity: (productQuantity + 1) / (promotionQuantity + 1) });
        }
        if (answer === 'n' | answer === 'N') {
            this.promotionApplyProducst.push({ name: name, quantity: Math.trunc((productQuantity) / (promotionQuantity + 1)) });
        }
    }

    promotionInventoryExeed() {

    }

}