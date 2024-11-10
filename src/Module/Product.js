import ProductValidator from "../Validator/ProductValidator.js";
export default class Product {
    constructor(name, price, quantity, promotion = null) {
        this.name = name;
        this.price = Number(price);
        this.quantity = Number(quantity);
        this.promotion = promotion;
        this.validate();
    }

    validate() {
        ProductValidator.nameValidator(this.name);
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }

    getQuantity() {
        return this.quantity;
    }

    getPromotion() {
        if (this.promotion === 'null') {
            return ''
        }
        return this.promotion;
    }
}