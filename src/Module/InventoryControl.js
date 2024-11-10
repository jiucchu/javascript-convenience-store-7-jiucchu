import Product from './Product.js';
import { OutputUtils } from '../Utils/ioUtils.js';
import { Console } from '@woowacourse/mission-utils';

import fs from 'fs';


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
        });
    }
}