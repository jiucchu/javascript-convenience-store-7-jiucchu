import { Console } from "@woowacourse/mission-utils";
import { INPUT_ERROR_MESSAGE } from "../Utils/Constnats.js";

export class InputValidator {

    static purchaseListValidator(purchaseList) {
        purchaseList.map(purchase => {
            if (purchase === null) {
                throw new Error(INPUT_ERROR_MESSAGE.PURCHASE_LIST_FROM_ERROR);
            }
        })
    }

}
