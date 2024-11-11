import { OutputUtils } from '../Utils/ioUtils.js';
import { Console, DateTimes } from '@woowacourse/mission-utils';
import { InputUtils } from '../Utils/ioUtils.js';

export default class Membership {

    constructor(totalPurcahseAmount, totalPromotionAmount) {
        this.totalPurcahseAmount = totalPurcahseAmount;
        this.totalPromotionAmount = totalPromotionAmount;
    }

    async checkMembership() {
        const answer = await InputUtils.InputMemershipApply();
        if (answer === 'y' | answer === 'Y') {
            return this.getMembershipDiscount();

        }

        return 0
    }

    getMembershipDiscount() {
        const discountAmount = Math.trunc((this.totalPurcahseAmount - this.totalPromotionAmount) * 0.3);
        if (discountAmount > 8000) {
            return 8000
        }

        return discountAmount
    }

}