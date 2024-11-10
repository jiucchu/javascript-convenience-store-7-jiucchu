import InventoryControl from "./Module/InventoryControl.js";

class App {
  async run() {
    const inventory = new InventoryControl();
    inventory.printInventory();

  }
}

export default App;
