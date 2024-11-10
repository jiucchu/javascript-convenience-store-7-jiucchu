import { Console } from "@woowacourse/mission-utils";
import ApplyPromotion from "./Module/ApplyPromotion.js";
import InventoryControl from "./Module/InventoryControl.js";
import { InputUtils } from "./Utils/ioUtils.js";

class App {
  async run() {
    const inventory = new InventoryControl();
    inventory.printInventory();

    const purchaseList = await InputUtils.inputPurchaseList(inventory.products);

    const applyPromotion = new ApplyPromotion(inventory.products, purchaseList);
    applyPromotion.checkPromotion();
  }
}

export default App;
