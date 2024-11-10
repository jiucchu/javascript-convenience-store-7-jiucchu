import { OutputUtils } from '../Utils/ioUtils.js';
import { Console } from '@woowacourse/mission-utils';
import Promotion from './Promotion.js';
import fs from 'fs';


export default class ApplyPromotion {
    constructor(inventoryList, purcahseList) {
        this.promotion = [];
        this.today = this.getToday();
        this.inventoryList = inventoryList;
        this.purcahseList = purcahseList;
        this.promotionList = this.getPromotionList();
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
        this.promotion.push(promotion);
    }

    loadProduct() {
        const lines = this.loadPromotionFile();
        lines.slice(1).forEach(line => {
            const [name, buy, get, startDate, endDate] = line.split(',');
            const promotion = new Promotion(name, buy, get, startDate, endDate);

            this.addPromotion(promotion);
        });
    }

    getPromotionList() {
        return this.inventoryList.filter(product => (product.getPromotion() !== ''));
    }

    getPromotionStatus(name) {
        if (this.checkPromotionList(name).length === 0) {
            return False
        }

        const promotionProduct = promotionList[0]
        return this.checkPromotionDate(promotionProduct)
    }

    checkPromotionList(name) {
        return this.promotionList.filter(product => product.getName() === name)
    }

    checkPromotionDate(promotionProduct) {
        const start = new Date(promotionProduct.getStartDate());
        const end = new Date(promotionProduct.getEndDate());
        const today = new Date(this.today());

        return today >= start && today <= end
    }

    checkPromotion() {
        this.purcahseList.forEach(product => {
            if (this.getPromotionStatus(product.getName())) {
                applyPromotion();
            }
        });
    }

    applyPromotion() {

    }

}