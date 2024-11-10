import InventoryControl from "./Module/InventoryControl.js";
import { InputUtils } from "./Utils/ioUtils.js";

class App {
  async run() {
    const inventory = new InventoryControl();
    inventory.printInventory();

    const purchaseList = await InputUtils.inputPurchaseList();
  }
}

export default App;
