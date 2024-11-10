export default class ProductValidator {
    static nameValidator(name) {
        if (name === '') {
            throw new Error(ERROR_MESSAGE.NAME_IS_NULL);
        }

        if (!(typeof name == "string")) {
            throw new Error(ERROR_MESSAGE.NAME_IS_NOT_STRING);
        }
    }

    static priceValidator(price) {
        if (Number.isNaN(price)) {
            throw new Error(ERROR_MESSAGE.PRICE_IS_NOT_NUMBER);
        }
    }

    static quantityValidator(quantity) {
        if (Number.isNaN(quantity)) {
            throw new Error(ERROR_MESSAGE.QUANTITY_IS_NOT_NUMBER);
        }
    }

    static promotionValidator(promotion) {
        if (!typeof promotion == "string") {
            throw new Error(ERROR_MESSAGE.PROMOTION_IS_NOT_STRING);
        }
    }
}