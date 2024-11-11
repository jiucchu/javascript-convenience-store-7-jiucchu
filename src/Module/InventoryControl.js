import Product from './Product.js';
import { OutputUtils } from '../Utils/ioUtils.js';
import { Console } from '@woowacourse/mission-utils';

import fs from 'fs';
import Purchase from './Purchase.js';


export default class InventoryControl {
    constructor() {
        this.products = [];
        this.loadInventoryFile();
        this.loadProduct();
    }

    loadInventoryFile() {
        const inventoryFile = fs.readFileSync('./public/products.md', 'utf-8');
        const lines = inventoryFile.trim().split('\n');

        return lines
    }

    addProduct(product) {
        this.products.push(product);
    }

    loadProduct() {
        const lines = this.loadInventoryFile();
        lines.slice(1).forEach(line => {
            const [name, price, quantity, promotion] = line.split(',');
            const product = new Product(name, price, quantity, promotion);

            this.addProduct(product);
        });
    }

    printInventory() {
        OutputUtils.printWelcome();
        this.products.forEach(product => {
            OutputUtils.printInventory(product);
            if (product.getPromotion() !== '' && !this.hasNonPromotionProduct(product.getName())) {
                OutputUtils.printInventory(new Product(product.getName(), product.getPrice(), 0, 'null'));
            }
        });
    }

    hasNonPromotionProduct(productName) {
        return this.products.some(product =>
            product.getName() === productName &&
            product.getPromotion() === ''
        );
    }

    updatePromotionInventory(promotionList) {
        promotionList.forEach(purchase => {
            const matchingProduct = this.products.find(product => product.getName() === purchase.name && (product.getPromotion() != ''));
            const remainingQuantity = matchingProduct.getQuantity() - purchase.quantity;

            matchingProduct.updateQuantity(remainingQuantity);
        });
    }

    updateNonPromotionInventory(purchaseList) {
        purchaseList.forEach(purchase => {
            const matchingProduct = this.products.find(product => product.getName() === purchase.name && (product.getPromotion() == ''));
            const remainingQuantity = matchingProduct.getQuantity() - purchase.quantity;

            matchingProduct.updateQuantity(remainingQuantity)
        });
    }

    getNonPromotionList(purchaseList, promotionList) {
        return purchaseList.map(purchase => {
            const promotionItem = promotionList.find(promo => (promo.name === purchase.name));
            if (promotionItem) {
                return {
                    name: purchase.name,
                    quantity: purchase.quantity - promotionItem.quantity
                };
            }
            return purchase;
        }).filter(item => item.quantity > 0);
    }

    updateInventory(purchaseList, promotionList) {
        if (promotionList.length !== 0) {
            this.updatePromotionInventory(promotionList);
        }
        const nonPromotionList = this.getNonPromotionList(purchaseList, promotionList);

        if (nonPromotionList.length !== 0) {
            this.updateNonPromotionInventory(nonPromotionList);
        }

    }

    findMatchingInventory(productName) {
        return this.inventoryList.find(product => product.name === productName);
    }



}