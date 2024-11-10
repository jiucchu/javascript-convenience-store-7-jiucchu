
export default class Purchase {
    constructor(inventoryList, purchaseList) {
        this.inventoryList = inventoryList;
        this.purchaseList = purchaseList;
    }


    getUnitPurchaseList() {
        return this.purchaseList.map(purchase => {
            const matchingInventory = this.inventoryList.find(item => item.name === purchase.name);

            const itemTotal = matchingInventory.price * purchase.quantity;
            return {
                name: purchase.name,
                quantity: purchase.quantity,
                unitPrice: matchingInventory.price,
                total: itemTotal,
            };
        })
    }

    getTotalPurchaseAmount() {
        let totalAmount = 0;
        const purchaseList = this.getUnitPurchaseList();
        purchaseList.forEach(product => {
            totalAmount += product.total;
        });

        return totalAmount;
    }

}