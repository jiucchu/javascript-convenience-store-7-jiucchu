import { Console } from "@woowacourse/mission-utils";
import ApplyPromotion from "./Module/ApplyPromotion.js";
import InventoryControl from "./Module/InventoryControl.js";
import { InputUtils } from "./Utils/ioUtils.js";

class App {

  async run() {
    const inventory = new InventoryControl();
    inventory.printInventory();

    let purchaseList = await InputUtils.inputPurchaseList(inventory.products);

    const applyPromotion = new ApplyPromotion(inventory.products, purchaseList);
    await applyPromotion.checkPromotion();

    purchaseList = applyPromotion.getPurchaseList();
    const promotionApplyProducst = applyPromotion.getPromotionApplyList()

  }
}

export default App;
